import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const gitClone = async (repoUrl) => {
    const tempPath = path.join(os.tmpdir(), `api-forgex-cli-${Date.now()}`);

    try {
        console.log('Fetching templates from GitHub...');

        execSync(`git clone --depth 1 ${repoUrl} "${tempPath}"`, {stdio: 'ignore'});

        const gitConfigPath = path.join(tempPath, '.git');

        if (await fs.pathExists(gitConfigPath)) {
            await fs.remove(gitConfigPath);
        }

        return tempPath;

    } catch (err) {
        if (await fs.pathExists(tempPath)) {
            await fs.remove(tempPath);
        }

        throw err;
    }
};

export default gitClone;