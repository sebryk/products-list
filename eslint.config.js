import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import twBracketPx from './eslint/rules/tw-bracket-px.js'

export default defineConfig([
   globalIgnores(['dist', 'node_modules']),
   {
      files: ['**/*.{ts,tsx,js,jsx}'],
      plugins: {
         local: {
            rules: {
               'tw-bracket-px': twBracketPx,
            },
         },
      },
      extends: [
         js.configs.recommended,
         tseslint.configs.recommended,
         reactHooks.configs.flat.recommended,
         reactRefresh.configs.vite,
         eslintConfigPrettier,
         eslintPluginBetterTailwindcss.configs.recommended,
      ],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
      },
      settings: {
         'better-tailwindcss': {
            entryPoint: 'src/index.css',
            rootFontSize: 16,
         },
      },
      rules: {
         'local/tw-bracket-px': 'warn',
         'better-tailwindcss/enforce-canonical-classes': 'warn',
         'better-tailwindcss/enforce-consistent-line-wrapping': [
            'warn',
            {
               printWidth: 120,
               classesPerLine: 0,
               group: 'never',
               preferSingleLine: true,
            },
         ],
      },
   },
])
