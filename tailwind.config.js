/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#39BCC0",
        gray: "#C4C4C4",
        dark: "#3E3E3E",
        success: "#61BC5D",
        green: "#39BCC0",
        bodybg: "#e5e5e5",
      },
      boxShadow: {
        primary: "0px 4px 39px rgba(0, 0, 0, 0.01)",
      },
    },
  },
  plugins: [],
};
