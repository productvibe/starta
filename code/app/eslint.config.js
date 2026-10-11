// ESLint here holds guard rails, not a style guide (formatting is prettier's).
import reactHooks from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default [
  { ignores: ["build/**", ".react-router/**", "node_modules/**"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser },
    // react-hooks is registered, not enabled: existing code names its rules
    // in disable comments, which must resolve.
    plugins: { "react-hooks": reactHooks },
    linterOptions: { reportUnusedDisableDirectives: "off" },
  },
]
