module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:eslint-plugin-import/recommended',
    'plugin:eslint-plugin-import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['import', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};
