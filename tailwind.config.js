/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // jika pakai React (folder src)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#393E46',
        secondary: '#948979',
        light: '#DFD0B8',
        dark: '#222831',
      },
    },
  },
  plugins: [],
}

