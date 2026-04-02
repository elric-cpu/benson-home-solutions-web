import fs from 'fs';
import path from 'path';
import { parseArgs, rawArgs } from './utils/cli';

const scriptName = 'expand_areas';

// Argument definitions: [name, requiresValue, defaultValue]
const argDefinitions: Array<[string, boolean, string | boolean | undefined]> = [
    ['outputDir', true, process.env.EXPAND_AREAS_OUTPUT_DIR || './expanded_areas'],
    ['configPath', true, process.env.EXPAND_AREAS_CONFIG || './config/areas.json'],
    ['verbose', false, process.env.EXPAND_AREAS_VERBOSE === 'true'],
];

const main = async () => {
    const args = parseArgs(rawArgs, argDefinitions, scriptName);
    const outputDir = args['outputDir'] as string;
    const configPath = args['configPath'] as string;
    const verbose = args['verbose'] as boolean;

    const log = verbose ? console.log : (_message: string) => {}; // Conditional logging

    const resolvedOutputDir = path.resolve(outputDir);
    const resolvedConfigPath = path.resolve(configPath);

    log(`Starting area expansion process...`);
    log(`Output Directory: ${resolvedOutputDir}`);
    log(`Config Path: ${resolvedConfigPath}`);

    if (!fs.existsSync(resolvedConfigPath)) {
        throw new Error(`Config file not found at: ${resolvedConfigPath}`);
    }
    if (!fs.existsSync(resolvedOutputDir)) {
        fs.mkdirSync(resolvedOutputDir, { recursive: true });
        log(`Created output directory: ${resolvedOutputDir}`);
    }

    const configData = fs.readFileSync(resolvedConfigPath, 'utf-8');
    let areasConfig: Array<{ name: string; templatePath: string }>;
    try {
        areasConfig = JSON.parse(configData);
    } catch (error: unknown) {
        throw new Error(`Failed to parse JSON from config file "${resolvedConfigPath}": ${(error as Error).message}`, { cause: error });
    }

    for (const area of areasConfig) {
        const templateFilePath = path.resolve(area.templatePath);
        if (!fs.existsSync(templateFilePath)) {
            console.warn(`Template file not found for area "${area.name}": ${templateFilePath}. Skipping.`);
            continue;
        }
        const newFilePath = path.join(resolvedOutputDir, `${area.name}.txt`);
        const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
        fs.writeFileSync(newFilePath, templateContent.replace(/\{\{AREA_NAME\}\}/g, area.name));
        log(`Created: ${newFilePath}`);
    }

    log('Area expansion completed successfully.');
};

main().catch((error: Error) => {
    console.error(`\nERROR: Area expansion failed.`);
    console.error(`Reason: ${error.message}`);
    process.exit(1);
});