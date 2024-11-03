/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ejs,html,js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            li: {
              marginBottom: 0,
              marginTop: 0,
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
