import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default defineConfig([
   globalIgnores(['dist', 'node_modules']),
   {
      files: ['**/*.{ts,tsx}'],
      extends: [
         js.configs.recommended,
         tseslint.configs.recommended,
         reactHooks.configs.flat.recommended,
         reactRefresh.configs.vite,
         eslintConfigPrettier,
         // eslintPluginBetterTailwindcss.configs.recommended,
      ],
      languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
      },

      settings: {
         'better-tailwindcss': {
            entryPoint: 'src/index.css',
         },
      },
   },
])
