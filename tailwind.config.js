/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          light: "#ffaa96",
          DEFAULT: "#f05523",
          dark: "#af2d1e",
        },
        secondary: {
          light: "#82a5e6",
          DEFAULT: "#2369d7",
          dark: "#0041b9",
        },
        accent: {
          light: "#ffd278",
          DEFAULT: "#ffaf00",
          dark: "#c38700",
        },
      },
    },
  },
  plugins: [],
};
