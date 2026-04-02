import fs from 'fs';
import { parseArgs, getRequiredEnv, execSync, rawArgs } from './utils/cli';

const scriptName = 'export_hostinger_env';

const argDefinitions: Array<[string, boolean, string | boolean | undefined]> = [
    ['namespace', true, process.env.K8S_NAMESPACE || 'default'],
    ['awsProfile', true, process.env.AWS_PROFILE || 'default'],
    ['ciFormat', true, process.env.CI_OUTPUT_FORMAT || 'stdout'], // 'github' or 'stdout'
];

const main = async () => {
    const args = parseArgs(rawArgs, argDefinitions, scriptName);

    const namespace = args['namespace'] as string;
    const awsProfile = args['awsProfile'] as string;
    const ciFormat = args['ciFormat'] as string;

    if (ciFormat !== 'github' && ciFormat !== 'stdout') {
        throw new Error(`Invalid --ciFormat value "${ciFormat}". Must be "github" or "stdout".`);
    }

    const clusterName = getRequiredEnv('CLUSTER_NAME');
    console.log(`Exporting Hostinger environment variables for cluster: ${clusterName}`);

    // Use execSync for kubectl and aws commands
    const secretJson = execSync(`kubectl get secret hostinger-creds -n ${namespace} -o json`);

    let secretData: { data?: { [key: string]: string } };
    try {
        secretData = JSON.parse(secretJson);
        if (!secretData.data || !secretData.data.apiToken) {
            throw new Error('Kubernetes secret data or "apiToken" field is missing.');
        }
    } catch (error: unknown) {
        throw new Error(`Failed to parse Kubernetes secret JSON. Error: ${(error as Error).message}`, { cause: error });
    }

    const decodeBase64 = (val: string): string => Buffer.from(val, 'base64').toString('utf-8');
    const apiToken = decodeBase64(secretData.data.apiToken);

    const apiKey = execSync(`aws --profile ${awsProfile} ssm get-parameter --name /hostinger/api-key --query Parameter.Value --output text`);
    if (!apiKey) {
        throw new Error('Retrieved AWS API key is empty.');
    }

    if (ciFormat === 'github') {
        const githubEnvFile = process.env.GITHUB_ENV;
        if (!githubEnvFile) {
            throw new Error('CI output format is "github" but GITHUB_ENV environment variable is not set.');
        }
        fs.appendFileSync(githubEnvFile, `HOSTINGER_API_TOKEN=${apiToken}\n`);
        fs.appendFileSync(githubEnvFile, `HOSTINGER_API_KEY=${apiKey}\n`);
        console.log('Appended variables to $GITHUB_ENV for GitHub Actions.');
    } else { // 'stdout'
        console.log('--- EXPORTED_VARS_START ---');
        console.log(JSON.stringify({
            HOSTINGER_API_TOKEN: apiToken,
            HOSTINGER_API_KEY: apiKey
        }));
        console.log('--- EXPORTED_VARS_END ---');
    }

    console.log('Hostinger environment variables processed successfully.');
};

main().catch((error: Error) => {
    console.error(`\nERROR: Hostinger environment export failed.`);
    console.error(`Reason: ${error.message}`);
    process.exit(1);
});