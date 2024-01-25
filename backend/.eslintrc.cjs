module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['unused-imports'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    quotes: ['error', 'single'],
    // we want to force semicolons
    semi: ['error', 'always'],
    // we use 2 spaces to indent our code
    indent: ['error', 3],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
    'no-mixed-spaces-and-tabs': 0,
    // "unused-imports/no-unused-imports": "warn",
    // "unused-imports/no-unused-vars": [
    // 	"warn",{fix:false}
    // ]
  },
};
