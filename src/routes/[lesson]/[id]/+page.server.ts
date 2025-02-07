import type { PageServerLoad } from "./$types";
import { render } from 'svelte/server';
import { rewriteTags } from "$lib/utils/rewrite";

const loadPage = async (lesson: string, id: string) => {
	const pages = import.meta.glob('/src/lib/docs/**/lessons/**/index.svx', {
		eager: true,
		import: 'default'
	});

	const pagePath = `/src/lib/docs/${lesson}/lessons/${id}/index.svx`;
	const pageModule: { default: any, metadata: any, render: any } = pages[pagePath] as any;

	if (!pageModule) {
		throw new Error(`Page not found: ${pagePath}`);
	}

	let renderHtml = render(pageModule, {});

	const terms = await import(`\$lib/docs/${lesson}/terms/index.json`)

	renderHtml.body = rewriteTags(renderHtml.body, terms.default)

	return {
		component: pageModule.default,
		html: renderHtml,
		title: pageModule.metadata?.title || '',
	};
};

export const load: PageServerLoad = async ({ params }) => {
	const { lesson, id } = params;

	const lessonHtml = await loadPage(lesson, id);

	return {
		props: {
			lesson,
			id,
			lessonHtml,
		}
	};
};