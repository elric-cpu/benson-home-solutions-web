import fs from 'fs';
import path from 'path';

const scriptsDir = path.resolve('./scripts');
const packageJsonPath = path.resolve('./package.json');

const main = () => {
    if (!fs.existsSync(scriptsDir)) {
        console.error('scripts directory not found!');
        return;
    }

    // Find all .ts files in the scripts directory (excluding setup scripts themselves)
    const tsFiles = fs.readdirSync(scriptsDir)
        .filter(file => file.endsWith('.ts') && !file.startsWith('setup/'));

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.scripts = packageJson.scripts || {};

    const migrationScriptCommands: string[] = [];

    tsFiles.forEach(file => {
        // Derive the npm script name from the filename.
        // Examples:
        // expand_areas.ts -> expand-areas
        // export_hostinger_env.ts -> export-hostinger-env
        const npmScriptName = file.replace(/\.ts$/, '').replace(/_/g, '-');

        // Define the tsx command for this specific script
        const tsxCommand = `tsx scripts/${file}`;
        packageJson.scripts[`script:${npmScriptName}`] = tsxCommand; // Prefix with 'script:' for clarity
        migrationScriptCommands.push(`npm run script:${npmScriptName}`);
    });

    // Master migration command: Run all individual scripts sequentially.
    packageJson.scripts.migrate = migrationScriptCommands.join(' && ');

    // Remove the old 'migrate-all' if it exists and was pointing to the old logic
    delete packageJson.scripts['migrate-all'];
    // Add the new 'migrate-all' as the setup command
    packageJson.scripts['migrate-all'] = 'tsx scripts/setup/migrate-all.ts';


    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Successfully updated package.json with new script commands.');
    console.log(`\nTo run all migrated scripts:`);
    console.log(`  npm run migrate`);
    console.log(`\nTo set up script commands in package.json (run once):`);
    console.log(`  npm run migrate-all`);
};

main();