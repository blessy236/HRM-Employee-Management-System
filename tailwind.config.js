/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff4ff",
          100: "#dbe6fe",
          200: "#bfd4fe",
          500: "#3b6cf0",
          600: "#2f5be0",
          700: "#2547b8",
        },
      },
    },
  },
  plugins: [],
}

