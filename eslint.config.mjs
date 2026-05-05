import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import gasPlugin from 'eslint-plugin-googleappsscript';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

const gasGlobals = Object.fromEntries(
  Object.keys(gasPlugin.environments.googleappsscript.globals).map(
    (key) => [key, 'readonly'],
  ),
);

export default [
  { ignores: ['**/*.js', '**/*.mjs', '**/*.d.ts', 'src/appsscript.json'] },

  js.configs.recommended,
  importPlugin.flatConfigs.errors,
  importPlugin.flatConfigs.warnings,
  importPlugin.flatConfigs.typescript,

  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
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
      'no-undef': 'off',
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
    },
  },
];