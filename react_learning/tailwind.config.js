module.exports = {
  content: 
  [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
],
  theme: {
    extend: {
      colors: {
        teal: {
          300: "#5eead4",
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".button": {
          position: "relative",
          "@apply px-4 py-2 bg-transparent": {},
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "3px",
            left: "50%",
            width: "0%",
            height: "2px",
            backgroundColor: "currentColor",
            transition: "all 0.3s",
            transform: "translateX(-50%)"
          },
          "&:hover::after": {
            width: "100%"
          }
        }
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
