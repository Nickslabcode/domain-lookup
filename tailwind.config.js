/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        serikadark: {
          primary: '#e2b714',

          'primary-content': '#120c00',

          secondary: '#646669',

          'secondary-content': '#dededf',

          accent: '#e2b714',

          'accent-content': '#120c00',

          neutral: '#2c2e31',

          'neutral-content': '#d0d1d2',

          'base-100': '#323437',

          'base-200': '#2a2c2e',

          'base-300': '#222426',

          'base-content': '#d2d2d3',

          info: '#8aa3b1',

          'info-content': '#070a0c',

          success: '#6a9f6b',

          'success-content': '#040904',

          warning: '#e2b714',

          'warning-content': '#120c00',

          error: '#ca4754',

          'error-content': '#f9dbdb',
        },
      },
    ],
  },
  plugins: [typography, daisyui],
};
