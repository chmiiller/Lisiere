import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort
    }
  },
  {
    rules: {
      "capitalized-comments": ["error", "always"],
      'no-console': "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "object-curly-spacing": ["error", "always"],
      "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "arrow-parens": ["error", "as-needed"],
      "arrow-body-style": ["error", "as-needed"]
    }
  },
  eslintConfigPrettier,
];

export default eslintConfig;
