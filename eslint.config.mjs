import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: root });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      ".vinext/**",
      ".wrangler/**",
      "build/**",
      "dist/**",
      "work/**",
      "components/ui/**",
      "db/**",
      "drizzle/**",
      "examples/**",
      "hooks/**",
      "scripts/**",
      "next-env.d.ts",
    ],
  },
];
