#!/usr/bin/env node

import fs from 'fs-extra';
import prompt from './src/question.js';
import { preCheck } from './src/environment.js';

let tempFolder;

async function run() {
    try {
        const answers = await prompt();

        preCheck(answers.useDB);

        tempFolder = await gitClone('https://github.com/nnxi/backend-forge-template');

        await rendering(tempFolder, answers);

        console.log('\nProject generation completed successfully!');

    } catch (err) {
        console.error(`\nError: ${err.message}`);
    } finally {
        if (tempFolder && fs.existsSync(tempFolder)) {
            await fs.remove(tempFolder);
        }
    }
}

run();