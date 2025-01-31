import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex} from "mdsvex";
import { createHighlighter } from 'shiki';

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['shell']
});


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: {
		...vitePreprocess(),
		...mdsvex({
			rehypePlugins: [],
			remarkPlugins: [],
			smartypants: true,
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
					return `{@html \`${html}\` }`;
				}
			},
			extension: '.svx'
		})
	},
	extensions: ['.svelte', '.svx', '.md'],

	kit: {
		adapter: adapter()
	}
};

export default config;
