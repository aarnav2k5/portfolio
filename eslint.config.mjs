import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import eslintPluginImport from "eslint-plugin-import";

// Next 16 + ESLint 9 flat config. eslint-config-next now ships native flat
// configs, so we import them directly instead of going through FlatCompat.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Built-in types are first
            "external", // External libraries
            "internal", // Internal modules
            ["parent", "sibling"], // Parent and sibling types can be mingled together
            "index", // Then the index file
            "object", // Object imports
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {},
  },
  // Tailwind class linting (v4-compatible). Focused on real issues — conflicts,
  // shorthands, duplicates, stray whitespace, deprecated classes — and skips
  // the opinionated class-ordering / line-wrapping rules.
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      "better-tailwindcss/no-conflicting-classes": "warn",
      "better-tailwindcss/no-duplicate-classes": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      "better-tailwindcss/enforce-shorthand-classes": "warn",
      "better-tailwindcss/enforce-canonical-classes": "warn",
      "better-tailwindcss/no-deprecated-classes": "warn",
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/globals.css",
      },
    },
  },
  // Keep prettier last so it disables any formatting-related rules above.
  eslintConfigPrettier,
  {
    ignores: [".next/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
];

export default eslintConfig;
