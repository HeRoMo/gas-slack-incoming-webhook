module.exports = {
  "extends": [
    "airbnb-base",
  ],
  "plugins": [
    "@typescript-eslint",
    "googleappsscript",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "googleappsscript/googleappsscript": true,
  },
  "settings": {
    "node": {
      "tryExtensions": [".ts", ".js", ".json"],
    },
    "import/resolver": {
      "node": {
        "paths": ["src", "__tests__"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  "rules": {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false,
    }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    'import/prefer-default-export': 'off',
  }
};
