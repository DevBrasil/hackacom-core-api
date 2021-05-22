module.exports = {
  env: {
    es6: true,
    node: true,
    "jest": true
  },
  extends: ["standard", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "no-console": "off"
  },
};
