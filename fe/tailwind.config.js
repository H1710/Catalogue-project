/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{html,jsx}",
    "./src/pages/**/*.{html,jsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "background-button": "linear-gradient(90deg, #8a2387, #e94057)",
        "background-button-hover": "linear-gradient(90deg, #9f1f9b, #ec374f)",
      }),
    },
  },
  plugins: [],
};
