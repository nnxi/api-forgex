import { execSync } from 'child_process';

// Check environment variables and required tools
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

// Execute post-generation tasks
const postProcess = async (targetPath, answers) => {
    try {
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