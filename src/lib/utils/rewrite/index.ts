import { load } from 'cheerio';
import { base } from '$app/paths';

export const rewriteTags = (
	html: string,
	tags: { title: string; description: string }[],
	lesson: string
) => {
	const $ = load(html);
	const $tags = $('h1, p, li, tr');

	$tags.each((index, tag) => {
		const $tag = $(tag);
		let text = $tag.html() || '';

		tags.forEach(({ title, description }) => {
			const regex = new RegExp(`${title}`, 'g');
			text = text.replace(regex, `<a href="${base}/terms/${lesson}#${title}">${title}</a>`);
		});

		$tag.html(text);
	});

	return $.html();
};
