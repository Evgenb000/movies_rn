/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*",
    "./shared/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
