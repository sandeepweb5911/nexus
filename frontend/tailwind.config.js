/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#10131a',
        surface: '#1d2026',
        'surface-elevated': '#272a31',
        primary: '#8083ff',
        secondary: '#7bd0ff',
        tertiary: '#ddb7ff',
      },
      fontFamily: {
        headline: ['Inter', 'system-ui', 'sans-serif'],
        'mono-code': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
