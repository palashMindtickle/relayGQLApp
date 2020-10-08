module.exports = {
  extends: ['react-app'],
  // plugins: ['prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-unused-expressions': 'off',
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    complexity: ['error', 2],
    'max-depth': ['error', { max: 2 }],
    'max-params': ['error', 3],
    'max-statements': ['error', 6],
    // 'no-unused-vars': 'error',
    'no-unused-labels': 'error',
    //https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    'import/extensions': [
      0
    ],
    'prettier/prettier': 0,
    'prettier': 0,
    'import/first': 0
  },
};
