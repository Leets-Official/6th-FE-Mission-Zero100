import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['dist'], // dist 폴더 무시
  },
  {
    files: ['**/*.{js,jsx}'], // 검사할 파일 확장자
    languageOptions: {
      ecmaVersion: 2020, // 최신 JS 문법 지원
      globals: globals.browser, // 브라우저 환경 전역 변수 허용
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // JSX 지원
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' }, // React 버전 감지
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'react/jsx-no-target-blank': 'off', // target="_blank" 보안 경고 끄기
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Prettier 규칙 위반 시 ESLint 에러 처리
    },
  },
]
