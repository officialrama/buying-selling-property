const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/flowbite/**/*.js",
    "./safelist.txt",
  ],
  theme: {
    screens: {
      mobile: { min: "280px", max: "639px" },
      tab: { min: "640px", max: "769px" },
      smallPc: { min: "770px", max: "1025px" },
      largePc: { min: "1026px", max: "2560px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      small: "1400px",
      miniPc: "1680px",
      xxl: "1920px"
    },
    extend: {
      boxShadow: {
        custom_shadow_card: "box-shadow: 0px 4px 20px rgba(2, 5, 14, 0.02)",
      },
      colors: {
        white: colors.white,
        red: colors.red,
        green: colors.green,
        indigo: colors.indigo,
        teal: colors.teal,
        blue: colors.blue,
      },
      transitionProperty: {
        "max-height": "max-height",
      },
      backgroundImage: {
        "split-timeline-color":
          "linear-gradient(to right, #E53D35 50% , #DBDEE5 50%);",
      },
      dropShadow: {
        footer: "0 35px 35px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "610px",
          },
          "@screen md": {
            maxWidth: "738px",
          },
          "@screen lg": {
            maxWidth: "1230px",
          },
          "@screen xl": {
            maxWidth: "1350px",
          },
        },
        ".container-xl": {
          maxWidth: "84%",
        },
        ".container-lg": {
          maxWidth: "77%",
        },
      });
    },
    require("precss"),
    require("autoprefixer"),
    require("flowbite/plugin"),
  ],
};
