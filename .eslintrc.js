module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    es2021: true,
  },
};
