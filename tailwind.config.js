module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "charcoal-gray": "#333333",
        "black-russian": "#1D1D1F",
        "text-1": "#E0DFDC",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
