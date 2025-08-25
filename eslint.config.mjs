// @ts-check
import simpleImportSort from "eslint-plugin-simple-import-sort";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "vue/html-self-closing": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "error",
    "simple-import-sort/exports": "warn",
    "vue/no-multiple-template-root": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [["^vue"], ["^#*"], ["^~?\\w"], ["~/(.*)"], ["^[./]"]],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["../"],
            message: "Relative imports are not allowed.",
          },
        ],
      },
    ],
  },
});
