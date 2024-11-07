import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [daisyui],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        serikaDark: {
          primary: '#e2b714',
          'primary-content': '#323437',

          secondary: '#646669',
          'secondary-content': '#dededf',

          accent: '#e2b714',
          'accent-content': '#323437',

          neutral: '#2c2e31',
          'neutral-content': '#d0d1d2',

          'base-100': '#323437',
          'base-200': '#2a2c2e',
          'base-300': '#222426',
          'base-content': '#d2d2d3',

          info: '#8aa3b1',
          'info-content': '#323437',

          success: '#6a9f6b',
          'success-content': '#323437',

          warning: '#e2b714',
          'warning-content': '#323437',

          error: '#ca4754',
          'error-content': '#f9dbdb',
        },
      },
      {
        serikaLight: {
          primary: '#e2b714',
          'primary-content': '#323437',

          secondary: '#aaaeb3',
          'secondary-content': '#323437',

          accent: '#e2b714',
          'accent-content': '#323437',

          neutral: '#d1d3d8',
          'neutral-content': '#323437',

          'base-100': '#e1e1e3',
          'base-200': '#c4c4c5',
          'base-300': '#a7a7a8',
          'base-content': '#323437',

          info: '#8aa3b1',
          'info-content': '#323437',

          success: '#6a9f6b',
          'success-content': '#323437',

          warning: '#e2b714',
          'warning-content': '#323437',

          error: '#da3333',
          'error-content': '#f9dbdb',
        },
      },
      {
        solarizedDark: {
          primary: '#859900',
          'primary-content': '#002b36',

          secondary: '#2aa198',
          'secondary-content': '#002b36',

          accent: '#dc322f',
          'accent-content': '#002b36',

          neutral: '#00222b',
          'neutral-content': '#268bd2',

          'base-100': '#002b36',
          'base-200': '#00222b',
          'base-300': '#002b36',
          'base-content': '#268bd2',

          info: '#268bd2',
          'info-content': '#002b36',

          success: '#859900',
          'success-content': '#002b36',

          warning: '#e2b714',
          'warning-content': '#002b36',

          error: '#da3333',
          'error-content': '#fedad5',
        },
      },
      {
        solarizedLight: {
          primary: '#859900',
          'primary-content': '#181819',

          secondary: '#2aa198',
          'secondary-content': '#181819',

          accent: '#dc322f',
          'accent-content': '#181819',

          neutral: '#e2d8be',
          'neutral-content': '#181819',

          'base-100': '#fdf6e3',
          'base-200': '#e2d8be',
          'base-300': '#2aa198',
          'base-content': '#181819',

          info: '#268bd2',
          'info-content': '#fdf6e3',

          success: '#859900',
          'success-content': '#fdf6e3',

          warning: '#dc322f',
          'warning-content': '#fdf6e3',

          error: '#d33682',
          'error-content': '#9b225c',
        },
      },
    ],
  },
  screens: {
    sm: '640px',
    // => @media (min-width: 640px) { ... }

    md: '768px',
    // => @media (min-width: 768px) { ... }

    lg: '1024px',
    // => @media (min-width: 1024px) { ... }

    xl: '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  },
};
