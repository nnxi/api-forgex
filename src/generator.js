import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

const renderDirectory = async (tempDir, targetDir, answers) => {
    try {
        const queue = [{ src: tempDir, dest: targetDir }];

        while (queue.length > 0) {
            const { src, dest } = queue.shift();

            //파일이 없으면 만들고, 있으면 추가
            await fs.ensureDir(dest);

            const items = await fs.readdir(src);

            for (const item of items) {
                const srcPath = path.join(src, item);
                const stats = await fs.stat(srcPath);

                if (stats.isDirectory()) {
                    queue.push({
                        src: srcPath,
                        dest: path.join(dest, item)
                    });
                } else {
                    let targetItemName = item.endsWith('.ejs') ? item.replace('.ejs', '') : item;
                    let content = await fs.readFile(srcPath, 'utf8');

                    if (item.endsWith('.ejs') || content.includes('<%')) {
                        content = ejs.render(content, answers);
                    }

                    await fs.writeFile(path.join(dest, targetItemName), content);
                }
            }
        }
    } catch (err) {
        throw new Error(`directory redering failed (${tempDir}): ${err.message}`);
    }
};

const rendering = async (tempPath, answers) => {
    try {
        tempPath = path.join(tempPath, 'template');
        
        const targetPath = path.join(process.cwd(), answers.projectName);

        await fs.ensureDir(targetPath);

        const baseDir = path.join(tempPath, 'base');

        if (fs.existsSync(baseDir)) {
            await renderDirectory(baseDir, targetPath, answers);
        }

        if (answers.useDB) {
            const dbDir = path.join(tempPath, 'addons', 'db');

            if (fs.existsSync(dbDir)) {
                await renderDirectory(dbDir, targetPath, answers);
            }
        }

        if (answers.useJWT) {
            const jwtDir = path.join(tempPath, 'addons', 'jwt');

            if (fs.existsSync(jwtDir)) {
                await renderDirectory(jwtDir, targetPath, answers);
            }
        }

        return targetPath;
    } catch (err) {
        throw err;
    }
};

export default rendering;