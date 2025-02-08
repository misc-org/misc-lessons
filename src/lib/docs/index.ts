import gitGitHub from './git-github';
import htmlCss from './html-css-js';
import unity from './unity';

type Lesson = {
	title: string;
	id: string;
	img: string;
	terms: Term[];
};

interface Term {
	title: string;
	description: string;
}

const lessons: Lesson[] = [gitGitHub, htmlCss, unity];

export { lessons, type Lesson };
