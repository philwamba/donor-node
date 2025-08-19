module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // customize your lint rules here
  },
};