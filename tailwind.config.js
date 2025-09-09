/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'irctc-blue': '#1E40AF',
        'irctc-dark-blue': '#1E3A8A',
        'irctc-light-blue': '#3B82F6',
      }
    },
  },
  plugins: [],
}

