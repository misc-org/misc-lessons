import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

const DOCS_PATH = path.resolve(__dirname, '../src/lib/docs');

function toCamelCase(input: string): string {
    return input
        .split('-')
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join('');
}

async function main() {
    try {
        if (!fs.existsSync(DOCS_PATH)) {
            throw new Error(`"${DOCS_PATH}" ディレクトリが存在しません。正しいパスでコマンドが実行されているか確認してください。`);
        }

        const { docId, title, logoFileName, lessonCount } = await inquirer.prompt([
            {
                type: 'input',
                name: 'docId',
                message: 'ドキュメントの ID を入力してください：',
                validate: (input) => /^[a-z0-9-]+$/.test(input) || 'ドキュメントの ID は小文字の英数字とハイフンのみを使用してください。',
            },
            {
                type: 'input',
                name: 'title',
                message: 'ドキュメントのタイトルを入力してください：',
                validate: (input) => input.trim() !== '' || 'タイトルは空にできません。'
            },
            {
                type: 'input',
                name: 'logoFileName',
                message: 'ロゴ画像のファイル名を入力してください (e.g., logo.svg)：',
                validate: (input) => input.trim() !== '' || 'ファイル名は空にできません。',
            },
            {
                type: 'number',
                name: 'lessonCount',
                message: 'レッスンの数を入力してください：',
                validate: (input) => input !== undefined && input > 0 || 'レッスンの数は 1 以上でなければなりません。',
            }
        ]);

        const docPath = path.join(DOCS_PATH, docId);
        const imgPath = path.join(docPath, 'img');
        const lessonsPath = path.join(docPath, 'lessons');
        const termsPath = path.join(docPath, 'terms');

    	fs.mkdirSync(imgPath, { recursive: true });
        fs.mkdirSync(lessonsPath, { recursive: true });
        fs.mkdirSync(termsPath, { recursive: true });

        for (let i = 1; i <= lessonCount; i++) {
            const lessonDir = path.join(lessonsPath, `lesson-${String(i).padStart(2, '0')}`);
            fs.mkdirSync(lessonDir, { recursive: true });

            const lessonFilePath = path.join(lessonDir, 'index.svx');
            fs.writeFileSync(lessonFilePath, `---\ntitle: \n---\n\n # { title }`);
        }

        const termsFilePath = path.join(termsPath, 'index.json');
        fs.writeFileSync(termsFilePath, JSON.stringify([{ title: '', description: '' }], null, 2));

        const indexFilePath = path.join(docPath, 'index.ts');
        const indexContent = `
import { type Lesson } from '$lib/docs';
import img from './img/${logoFileName}';
import terms from './terms/index.json';

const lesson: Lesson = {
    title: '${title}',
    id: '${docId}',
    img,
    terms
};

export default lesson;
        `.trim();
        fs.writeFileSync(indexFilePath, indexContent);

        const docsIndexPath = path.join(DOCS_PATH, 'index.ts');
        const docsIndexContent = fs.readFileSync(docsIndexPath, 'utf-8');
        const importName = toCamelCase(docId); // キャメルケースに変換
        const importStatement = `import ${importName} from './${docId}';`;
        const updatedDocsIndexContent = docsIndexContent
            .replace(/(const lessons: Lesson\[] = \[)/, `$1\n\t${importName},`)
            .replace(/(import .* from .*;)/, `$1\n${importStatement}`);
        fs.writeFileSync(docsIndexPath, updatedDocsIndexContent);

        console.log(`"${docId}" のレッスンテンプレートを作成しました！`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();