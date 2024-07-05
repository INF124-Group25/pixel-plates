/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors:{
        'dark-yellow': 'var(--dark-yellow)',
        'light-yellow': 'var(--light-yellow)',
      },
      backgroundImage: {
        'nav-yellow-gradient': 'var(--nav-yellow-gradient)',
      },
      fontSize: {
        'h1': '48px',
        'h2': '36px',
        'h3': '30px',
        'h4': '24px',
        'h5': '20px',
        'h6': '16px',
      },
    },
  },
  plugins: [],
}

