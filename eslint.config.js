/**
 * ESLint Configuration for hua.nz Portfolio
 *
 * This configuration provides:
 * - Code quality checks (syntax errors, best practices)
 * - React-specific linting rules
 * - Integration with Prettier (formatting handled separately)
 * - Modern JavaScript/ES2020+ support
 */

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
    // Ignore build output directory
    { ignores: ['dist'] },

    {
        // Target all JavaScript and JSX files
        files: ['**/*.{js,jsx}'],

        // Language configuration for modern JavaScript
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },

        // React version for react plugin
        settings: { react: { version: '18.3' } },

        // ESLint plugins for React development
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },

        // Linting rules configuration
        rules: {
            // Base JavaScript recommended rules
            ...js.configs.recommended.rules,

            // React recommended rules
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,

            // React Hooks rules for proper hook usage
            ...reactHooks.configs.recommended.rules,

            // Custom rule overrides
            'react/jsx-no-target-blank': 'off', // Allow target="_blank" without rel
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // Code quality rules (formatting handled by Prettier)
            'no-trailing-spaces': 'error', // No trailing whitespace
            'eol-last': 'error', // File must end with newline
        },
    },

    // Disable ESLint rules that conflict with Prettier
    // This prevents the endless ESLint ↔ Prettier conflict we experienced
    prettier,
];
