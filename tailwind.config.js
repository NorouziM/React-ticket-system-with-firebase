const windmill = require("@windmill/react-ui/config");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1736px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      transitionDuration: {
        0: "0ms",
        6000: "6000ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
