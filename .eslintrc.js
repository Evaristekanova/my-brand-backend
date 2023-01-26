export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    quotes: 'off',
    'template-curly-spacing': 2,
    'template-literals': 2,
  },
  plugins: ['prettier'],
};
