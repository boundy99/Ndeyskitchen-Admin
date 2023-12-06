/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#371821',
        secondary: '#DC952F',
        noir: '#333',
      },

      colors: {
        primary: '#371821',
        secondary: '#DC952F',
        noir: '#333',
      },
      fontFamily: {
        rubik: 'Rubik',
        satisfy: 'Satisfy',
      },

      borderRadius: {
        rd: '3px',
      },
    },
  },
  plugins: [],
};
