import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      "no-console": "warn",
      "no-restricted-imports": [
        "error",
        {
          name: "next/image",
          message: "Please import from `@/components/ui/Img` instead.",
          importNames: ["default"],
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
    },
  },
]);

export default eslintConfig;
