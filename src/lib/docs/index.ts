import gitGitHub from './git-github';
import htmlCss from './html-css';

type Lesson = {
    title: string;
    id: string;
    img: string;
    terms: Term[];
}

interface Term {
    title: string;
    description: string;
}

const lessons: Lesson[] = [
    gitGitHub,
    htmlCss,
]

export { lessons, type Lesson };