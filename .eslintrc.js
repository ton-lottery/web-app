const extensions = ['.js', '.jsx'];

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'react',
  ],
  rules: {
    'max-len': ['error', {code: 120}],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions,
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
