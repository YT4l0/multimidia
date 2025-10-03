/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1db954',
        'spotify-dark': '#121212',
        'spotify-gray': '#282828',
        'spotify-light-gray': '#b3b3b3',
      },
    },
  },
  plugins: [],
}
