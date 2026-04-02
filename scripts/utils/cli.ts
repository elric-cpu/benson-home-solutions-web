import process from 'process';
import { execSync as nativeExecSync } from 'child_process';

/**
 * Access raw arguments passed to the script.
 * Excludes 'node' and the script path.
 */
export const rawArgs: string[] = process.argv.slice(2);

/**
 * Retrieves a required environment variable. Throws an error if not set.
 * @param key The name of the environment variable.
 * @returns The value of the environment variable.
 */
export const getRequiredEnv = (key: string): string => {
    const value = process.env[key];
    if (value === undefined || value === '') {
        throw new Error(`Required environment variable "${key}" is not set.`);
    }
    return value;
};

/**
 * Executes a shell command synchronously and returns its stdout.
 * Captures stderr for error reporting. Throws an error on non-zero exit codes.
 * @param command The command to execute.
 * @returns The stdout of the command.
 */
export const execSync = (command: string): string => {
    try {
        const result = nativeExecSync(command, {
            stdio: ['ignore', 'pipe', 'pipe'], // Capture stdout and stderr, ignore stdin
            encoding: 'utf-8',
        }) as string;
        return result.trim();
    } catch (error: unknown) {
        // Type guard to safely access error properties
        if (error instanceof Error && (error as any).stderr) {
            const stderr = (error as any).stderr as string;
            const exitCode = (error as any).status ?? -1; // Default to -1 if status is not available
            const cmdName = command.split(' ')[0];

            // Provide more specific guidance for common missing executables
            const commonExecutables = ['node', 'tsx', 'python', 'bash', 'sh', 'powershell', 'kubectl', 'aws'];
            if (commonExecutables.includes(cmdName)) {
                throw new Error(`Command failed: "${command}"\nExit Code: ${exitCode}\nStderr: ${stderr}`, { cause: error });
            } else {
                throw new Error(`Failed to execute command "${command}". Ensure the executable is in PATH.\nExit Code: ${exitCode}\nStderr: ${stderr}`, { cause: error });
            }
        } else if (error instanceof Error) {
            throw new Error(`Failed to execute command "${command}". Error: ${error.message}`, { cause: error });
        } else {
            // Fallback for non-Error types
            throw new Error(`An unknown error occurred while executing command "${command}".`, { cause: error });
        }
    }
};

/**
 * Parses command-line arguments based on definitions.
 * Handles simple flags and key-value pairs.
 * Automatically supports '-h' and '--help'.
 * @param argv Arguments array (process.argv.slice(2)).
 * @param definitions Array of [argumentName, requiresValue: boolean, defaultValue?: string | boolean].
 * @param scriptName The name of the script for help messages.
 * @returns Parsed arguments object.
 */
export const parseArgs = (
    argv: string[],
    definitions: Array<[string, boolean, string | boolean | undefined]>,
    scriptName: string
): { [key: string]: string | boolean } => {
    const parsed: { [key: string]: string | boolean } = {};
    const argMap = new Map<string, { name: string; needsValue: boolean }>();
    const helpLines: string[] = [];

    // Initialize parsed with defaults and build argument map/help lines
    definitions.forEach(([name, needsValue, defaultValue]) => {
        parsed[name] = defaultValue !== undefined ? defaultValue : false;
        argMap.set(`--${name}`, { name, needsValue });
        // Simple convention for single-character flags
        if (name.length === 1) {
            argMap.set(`-${name}`, { name, needsValue });
        }
        const argType = needsValue ? '<value>' : '';
        // Pad for alignment in help message
        helpLines.push(`  --${name.padEnd(15)} ${argType.padEnd(10)} ${name}`);
    });

    // Add default help flag
    argMap.set('--help', { name: 'help', needsValue: false });
    argMap.set('-h', { name: 'help', needsValue: false });
    helpLines.push(`  -h, --help${''.padEnd(15)} Show this help message`);

    let i = 0;
    while (i < argv.length) {
        const arg = argv[i];
        const definition = argMap.get(arg);

        if (definition?.name === 'help') {
            console.log(`\nUsage: ${scriptName} [options]`);
            console.log('Options:');
            // Sort help lines alphabetically for consistency
            helpLines.sort((a, b) => {
                const nameA = a.trim().split(/\s+/)[0];
                const nameB = b.trim().split(/\s+/)[0];
                return nameA.localeCompare(nameB);
            });
            helpLines.forEach(line => console.log(line));
            process.exit(0);
        }

        if (definition) {
            if (definition.needsValue) {
                // Ensure the next argument is not another flag
                if (i + 1 < argv.length && !argv[i + 1].startsWith('-')) {
                    parsed[definition.name] = argv[++i];
                } else {
                    throw new Error(`Argument "${arg}" requires a value for "${scriptName}".`);
                }
            } else {
                parsed[definition.name] = true;
            }
        } else {
            console.warn(`[${scriptName}] Unknown argument: ${arg}`);
        }
        i++;
    }
    return parsed;
};