import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,              
      react.configs.recommended,           
      react.configs['jsx-runtime'],        // JSX 런타임 규칙
      reactHooks.configs['recommended-latest'], // 최신 React Hooks 규칙
      reactRefresh.configs.vite,           // Vite + React Refresh 규칙
      eslintConfigPrettier                 // ★ Prettier와 충돌나는 ESLint 규칙 끄기
    ],
    plugins: {
      react,             
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin             
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/jsx-no-target-blank': 'off',   // 보안 경고 비활성화
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'prettier/prettier': 'error'          // Prettier 규칙 위반 → ESLint 에러
    }
  }
])

