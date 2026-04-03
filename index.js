#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import prompt from './src/question.js';
import { preProcess, postProcess } from './src/environment.js';
import gitClone from './src/template.js';
import rendering from './src/generator.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = fs.readJsonSync(path.join(__dirname, 'package.json'));

const TEMPLATE_REPO = 'https://github.com/nnxi/api-forgex-template';
let tempPath;

const args = process.argv.slice(2);

if (args.includes('-v') || args.includes('--version')) {
    console.log(`api-forgex version ${pkg.version}`);
    process.exit(0);
}

if (args.includes('-h') || args.includes('--help')) {
    console.log(`
Usage: npx api-forgex [options]

A CLI tool for generating Node.js  API boilerplates using Express.

Options:
  -v, --version    Output the current version
  -h, --help       Display help for command
    `);
    process.exit(0);
}

async function run() {
    try {
        const answers = await prompt();

        preProcess(answers);

        tempPath = await gitClone(TEMPLATE_REPO);

        const targetPath = await rendering(tempPath, answers);

        console.log('\nProject generation completed successfully!');

        await postProcess(targetPath);

        console.log('\nProject setup completed successfully.');
        console.log('You can now start the server with the following commands:\n');
        console.log(`  cd ${answers.projectName}`);
        if (answers.useDB) {
            console.log('  docker-compose up -d');
        }
        console.log('  npm start\n');

    } catch (err) {
        console.error(`\nError: ${err.message}`);
    } finally {
        if (tempPath && fs.existsSync(tempPath)) {
            await fs.remove(tempPath);
        }
    }
}

run();