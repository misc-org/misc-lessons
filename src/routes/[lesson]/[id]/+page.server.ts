import type { EntryGenerator, PageServerLoad } from './$types';
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
	const pages = import.meta.glob<PageModule>('/src/lib/docs/**/lessons/**/index.svx', {
		eager: true,
	});

	const pagePath = `/src/lib/docs/${lesson}/lessons/${id}/index.svx`;
	const pageModule: PageModule = pages[pagePath] as PageModule;

	if (!pageModule) {
		throw new Error(`Page not found: ${pagePath}`);
	}

	let renderHtml = render(pageModule.default as unknown as Component, {});

	const terms = await import(`\$lib/docs/${lesson}/terms/index.json`);

	renderHtml.body = rewriteTags(renderHtml.body, lesson, terms.default);

	return {
		html: renderHtml,
		title: pageModule.metadata?.title || ''
	};
};

export const load: PageServerLoad = async ({ params }) => {
	const { lesson, id } = params;

	const { html, title } = await loadPage(lesson, id);

	return {
		props: {
			lesson,
			id,
			html,
			title
		}
	};
};

export const entries: EntryGenerator = async (): Promise<Array<{ lesson: string; id: string }>> => {
	const pagesAll = import.meta.glob('/src/lib/docs/*/lessons/*/index.svx', { eager: true });

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

	return Object.keys(uniqueKeys).map((key) => {
		const [lesson, id] = key.split('/');
		return { lesson, id };
	});
};
