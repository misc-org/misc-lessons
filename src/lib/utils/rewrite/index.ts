import { load } from 'cheerio';

interface Term {
	title: string;
	description: string;
}

const rewrote = (lesson: string, term: Term) => {
	return `<a href="/terms/${lesson}#${term.title}"
        class="term-link"
        data-term-title="${term.title}"
        data-term-description="${term.description}"
        onmouseenter="
            requestAnimationFrame(() => {
                this.dispatchEvent(new CustomEvent('termHover', {
                    bubbles: true,
                    detail: {
                        title: '${term.title}',
                        description: '${term.description}',
                        rect: this.getBoundingClientRect()
                    }
                }));
            });"
        >${term.title}</a>`
};

export const rewriteTags = (
	html: string,
	lesson: string,
	tags: Term[]
) => {
	const $ = load(html);
	const $tags = $('h1, p, li, tr');

	$tags.each((_index, tag) => {
		const $tag = $(tag);
		let text = $tag.html() || '';

		tags.forEach(({ title, description }) => {
			const regex = new RegExp(`${title}`, 'g');
			text = text.replace(regex, rewrote(lesson, { title, description }));
		});

		$tag.html(text);
	});

	return $.html();
};
