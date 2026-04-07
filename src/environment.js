import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

// 환경 변수 및 필수 도구 설치 여부 검사
const preProcess = (answers) => {
    const missingTools = [];

    try {
        execSync('git --version', { stdio: 'ignore' });
    } catch {
        missingTools.push('Git');
    }

    if (answers.useDB) {
        try {
            execSync('docker --version', { stdio: 'ignore' });
        } catch {
            missingTools.push('Docker');
        }
    }

    if (missingTools.length > 0) {
        const toolList = missingTools.join(' and ');
        
        throw new Error(
            `Missing required tools: ${toolList}.\n` +
            `Please install ${toolList} to proceed with your current configuration.`
        );
    }

    return true;
};

const postProcess = async (targetPath) => {
    try {
        const envExaplePath = path.join(targetPath, '.env.example.ejs');
        const envPath = path.join(targetPath, '.env');

        if (fs.existsSync(envExaplePath) && !fs.existsSync(envPath)) {
            await fs.copy(envExaplePath, envPath);
        }

        console.log('\nPackage installing...');
        execSync('npm install', {
            cwd: targetPath,
            stdio: 'inherit'
        }); 

    } catch (err) {
        throw err;
    }
}

export { preProcess, postProcess };