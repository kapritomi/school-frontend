/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E6544",
        lightBorder: "#C7C7C7",
        delete: "#FF575A",
        secondaryFont: "#5B5B5B",
        gray: "#818181"
      },
      fontSize: {
        TaskTitle: '30px',
        TaskDesc: '20px'
      }
    },
    
  },
  plugins: [],
}
