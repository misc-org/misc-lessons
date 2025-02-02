import terms from './index.json';

const getTerms = () => terms;
const getTerm = (id: string) => terms.find(term => term.title === id);

export { getTerms, getTerm };
