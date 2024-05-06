/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        vsm: "500px",
        xmd: "850px",
      },
    },
  },
  plugins: [],
};
