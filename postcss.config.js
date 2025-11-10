module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default {
  plugins: [
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
    require("postcss-preset-env"),
  ],
};
