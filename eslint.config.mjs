import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import gasPlugin from 'eslint-plugin-googleappsscript';
import globals from 'globals';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const gasGlobals = Object.fromEntries(
  Object.keys(gasPlugin.environments.googleappsscript.globals).map(
    (key) => [key, 'readonly'],
  ),
);

export default [
  { ignores: ['**/*.js', '**/*.mjs', '**/*.d.ts', 'src/appsscript.json'] },

  ...compat.extends(
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ),

  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      globals: {
        ...globals.es2015,
        ...globals.node,
        ...gasGlobals,
        GoogleAppsScript: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'] },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'memberLike', modifiers: ['private'], format: ['camelCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'function', format: ['camelCase'], trailingUnderscore: 'allow' },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-use-before-define': ['error'],
      camelcase: 'off',
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'never' }],
      'import/prefer-default-export': 'off',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
    },
  },
];