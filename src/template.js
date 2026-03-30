import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const gitClone = async (repoUrl) => {
    const tempPath = path.join(os.tmpdir(), `api-forgex-${Date.now()}`);

    try {
        console.log('Fetching templates from GitHub...');

        execSync(`git clone --depth 1 ${repoUrl} "${tempPath}"`, {stdio: 'ignore'});

        const gitConfigPath = path.join(tempPath, '.git');

        if (fs.existsSync(gitConfigPath)) {
            await fs.remove(gitConfigPath);
        }

        return tempPath;

    } catch (err) {
        if (fs.existsSync(tempPath)) {
            await fs.remove(tempPath);
        }

        throw err;
    }
};

export default gitClone;