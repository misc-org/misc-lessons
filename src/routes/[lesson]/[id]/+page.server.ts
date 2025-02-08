import type { EntryGenerator, PageServerLoad, RouteParams } from './$types';
import type { Component } from 'svelte';
import { render } from 'svelte/server';
import { rewriteTags } from '$lib/utils/rewrite';

interface PageModule {
	default: unknown;
	metadata?: {
		title?: string;
	};
}

const loadPage = async (lesson: string, id: string) => {
	const pages = import.meta.glob('/src/lib/docs/**/lessons/**/index.svx', {
		eager: true,
		import: 'default'
	});

	const pagePath = `/src/lib/docs/${lesson}/lessons/${id}/index.svx`;
	const pageModule: PageModule = pages[pagePath] as PageModule;

	if (!pageModule) {
		throw new Error(`Page not found: ${pagePath}`);
	}

	let renderHtml = render(pageModule as unknown as Component, {});

	const terms = await import(`\$lib/docs/${lesson}/terms/index.json`);

	renderHtml.body = rewriteTags(renderHtml.body, terms.default, lesson);

	return {
		component: pageModule.default,
		html: renderHtml,
		title: pageModule.metadata?.title || ''
	};
};

export const load: PageServerLoad = async ({ params }) => {
	const { lesson, id } = params;

	const lessonHtml = await loadPage(lesson, id);

	return {
		props: {
			lesson,
			id,
			lessonHtml
		}
	};
};

export const entries: EntryGenerator = async (): Promise<Array<{ lesson: string; id: string }>> => {
	const pagesAll = import.meta.glob('/src/lib/docs/*/lessons/*/index.svx', { eager: true });

	// 重複しないキー（"lesson/id" 形式）を作成
	const uniqueKeys: Record<string, true> = Object.keys(pagesAll).reduce(
		(acc, filePath) => {
			const parts = filePath.split('/');
			const lesson = parts[4];
			const id = parts[6];
			const key = `${lesson}/${id}`;
			acc[key] = true;
			return acc;
		},
		{} as Record<string, true>
	);

	// キーを分割してパラメーターオブジェクトを生成
	return Object.keys(uniqueKeys).map((key) => {
		const [lesson, id] = key.split('/');
		return { lesson, id };
	});
};
