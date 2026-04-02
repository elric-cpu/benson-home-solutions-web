import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'clsx', message: 'clsx is removed. Use static Tailwind CSS classes or simple conditional logic.' },
            { name: 'twMerge', message: 'twMerge is removed. Use static Tailwind CSS classes or simple conditional logic.' },
            { name: 'tailwind-merge', message: 'tailwind-merge is removed. Use static Tailwind CSS classes or simple conditional logic.' }
          ]
        }
      ],
    },
  },
  {
    files: [
      'scripts/**/*.js',
      'scripts/**/*.ts',
      'src/app/api/**/*.ts',
      'src/lib/notion/**/*.ts',
      'src/lib/ai/vector-service.ts',
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      '.next/**',
      '.vercel/**',
      'benson-genkit-backend/functions/lib/**',
      'node_modules/**',
      'playwright-report/**',
      'public/**',
      'test-results/**',
      'eslint.config.mjs',
      'next-env.d.ts',
      'next-starter/**',
      'website/**',
      'genai_agents_temp/**',
    ],
  },
  eslintConfigPrettier,
];

export default eslintConfig;
