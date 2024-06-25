const eslintPluginAstro = require("eslint-plugin-astro");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...eslintPluginAstro.configs["flat/recommended"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:drizzle/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["drizzle"]
};
