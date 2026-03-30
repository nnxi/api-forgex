import { execSync } from 'child_process';

// 환경 변수 및 필수 도구 설치 여부 검사
const preCheck = (useDB) => {
    const missingTools = [];

    try {
        execSync('git --version', { stdio: 'ignore' });
    } catch {
        missingTools.push('Git');
    }

    if (useDB) {
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

export { preCheck };