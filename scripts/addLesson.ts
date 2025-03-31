import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

const DOCS_PATH = path.resolve(__dirname, '../src/lib/docs');

async function main() {
    try {
        if (!fs.existsSync(DOCS_PATH)) {
            throw new Error(`"${DOCS_PATH}" ディレクトリが存在しません。正しいパスでコマンドが実行されているか確認してください。`);
        }

        const { docId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'docId',
                message: 'レッスンを追加するプロジェクトの ID を入力してください：',
                validate: (input) => {
                    const projectPath = path.join(DOCS_PATH, input);
                    return fs.existsSync(projectPath) || `プロジェクト "${input}" が存在しません。`;
                }
            }
        ]);

        const projectPath = path.join(DOCS_PATH, docId);
        const lessonsPath = path.join(projectPath, 'lessons');

        const existingLessons = fs.readdirSync(lessonsPath).filter((dir) => dir.startsWith('lesson-'));
        const nextLessonNumber = existingLessons.length + 1;

        const { lessonTitle } = await inquirer.prompt([
            {
                type: 'input',
                name: 'lessonTitle',
                message: '新しいレッスンのタイトルを入力してください：',
                validate: (input) => input.trim() !== '' || 'タイトルは空にできません。'
            }
        ]);

        const newLessonDir = path.join(lessonsPath, `lesson-${String(nextLessonNumber).padStart(2, '0')}`);
        fs.mkdirSync(newLessonDir, { recursive: true });

        const lessonFilePath = path.join(newLessonDir, 'index.svx');
        fs.writeFileSync(lessonFilePath, `---\ntitle: ${lessonTitle}\n---\n\n# ${lessonTitle}`);

        console.log(`"${docId}" プロジェクトに新しいレッスン "lesson-${String(nextLessonNumber).padStart(2, '0')}" を追加しました！`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();