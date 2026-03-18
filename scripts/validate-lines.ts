/**
 * Agent 12 - Gideon Shaw's Line Count Validator
 * "Every file must strive to be under 400-450 lines."
 */

import fs from 'fs';
import path from 'path';

const MAX_LINES = 450;
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist'];

function countLines(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').length;
}

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (IGNORE_DIRS.includes(f)) return;
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const failures: string[] = [];

walkDir('src', (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    const lines = countLines(filePath);
    if (lines > MAX_LINES) {
      failures.push(`${filePath}: ${lines} lines`);
    }
  }
});

if (failures.length > 0) {
  console.error('[GIDEON - FAIL] Bloat detected! Refactor these files:');
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.info('[GIDEON - PASS] All files within maintenance limits.');
}

