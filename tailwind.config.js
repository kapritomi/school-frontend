/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        TaskTitle: '30px',
        TaskDesc: '20px'
      }
    },
    
  },
  plugins: [],
}
