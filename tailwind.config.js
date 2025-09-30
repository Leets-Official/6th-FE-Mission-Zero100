/** @type {import('tailwindcss').Config} */
export default {
  // 이 부분이 가장 중요합니다. src 폴더 내의 모든 js, jsx 파일을 감시하도록 설정합니다.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}