import gitGitHub from './git-github';
import htmlCss from './html-css';

type Lesson = {
    title: string;
    id: string;
    img: string;
}

const lessons: Lesson[] = [
    gitGitHub,
    htmlCss,
]

export { lessons, type Lesson };