/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        backgroundLight: '#f3f4f6',     // light gray
        backgroundDark: '#000000',      // black
        textLight: '#1f2937',           // dark gray text
        textDark: '#f4f4f5',            // light text
        primaryLight: '#ea580c',        // dark orange for light mode
        primaryDark: '#c2410c',         // slightly dark orange for dark mode
      },
    },
  },
  plugins: [],
}