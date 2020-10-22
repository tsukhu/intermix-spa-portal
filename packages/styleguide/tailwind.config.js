const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: [
    "../**/src/**/*.html",
    "../**/src/**/*.ejs",
    "../**/src/**/*.vue",
    "../**/src/**/*.tsx",
    "../**/src/**/*.ts",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ocean: {
          light: "#7baccd",
          lighter: "#95cdf0",
          default: "#3d68ff",
          dark: "#1947ee",
        },
        "new-gray": {
          dark: "#111824",
          default: "#111824",
          light: "#202336",
          darker: "#0d141e",
        },
      },
    },
  },
  variants: {
    accessibility: ["responsive", "focus", "active"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
    textColor: ["responsive", "hover", "focus", "active"],
    opacity: ["responsive", "hover", "focus", "disabled", "active"],
    tableLayout: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
