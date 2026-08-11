import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
    { files: ["**/*.{js,mjs,cjs,jsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    { rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "indent": ["error", 4],
        "react/prop-types": "off",
        "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "eol-last": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "no-console": "warn"
    } }
];
