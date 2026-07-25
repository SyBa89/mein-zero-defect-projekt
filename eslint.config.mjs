import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";

export default [
  ...nextCoreWebVitals,
  prettierConfig,
  {
    rules: {
      // Deaktiviere die hyper-strikte Regel, die valide Hydration/Fetching-Patterns fälschlich flaggt
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    ignores: ["node_modules/", ".next/", "out/", "public/", "next-env.d.ts"],
  },
];