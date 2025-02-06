import { load } from 'cheerio';

export const rewriteTags = (html: string, tags: { title: string, description: string }[]) => {
    const $ = load(html);
    const $tags = $('p', 'li', 'tr');

    $tags.each((index, tag) => {
        const $tag = $(tag);
        let text = $tag.html() || '';

        tags.forEach(({ title, description }) => {
            const regex = new RegExp(title, 'g');
            text = text.replace(regex, '<a href="">' + title + '</a>')
        })

        $tag.html(text);
    })

    return $.html();
}