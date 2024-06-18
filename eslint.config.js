import jsPlugin from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist/configs/recommended-natural';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';

export default tsPlugin.config(
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  unicornPlugin.configs['flat/all'],
  perfectionistPlugin,
  prettierPlugin,
  {
    ignores: ['dist/'],
  },
  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      'import-x': importPlugin,
    },
  },
  {
    rules: {
      'unicorn/no-array-for-each': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Dir: true,
            Env: true,
            dir: true,
            env: true,
          },
        },
      ],
    },
  },
);
