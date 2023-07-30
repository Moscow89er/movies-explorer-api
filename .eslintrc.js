module.exports = {
  env: {
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 'off',
    'no-console': ['error', {
      allow: ['log', 'error'],
    }],
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
    }],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^next$',
    }],
  },
};
