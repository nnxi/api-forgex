#!/usr/bin/env node

import fs from 'fs-extra';
import prompt from './src/question.js';
import { preCheck } from './src/environment.js';
import gitClone from './src/template.js';
import rendering from './src/generator.js';

const TEMPLATE_REPO = 'https://github.com/nnxi/api-forgex-template';
let tempPath;

async function run() {
    try {
        const answers = await prompt();

        preCheck(answers.useDB);

        tempPath = await gitClone(TEMPLATE_REPO);

        await rendering(tempPath, answers);

        console.log('\nProject generation completed successfully!');

    } catch (err) {
        console.error(`\nError: ${err.message}`);
    } finally {
        if (tempPath && fs.existsSync(tempPath)) {
            await fs.remove(tempPath);
        }
    }
}

run();