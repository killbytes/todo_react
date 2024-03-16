module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: ["node_modules", "dist", "build"],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs,ts,cts}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      "jsx": true
    }
  },
plugins: [
    'react',
    'prettier',
    'import',
    'jsx-a11y'
  ],
parser: '@typescript-eslint/parser',
ecmaFeatures: {
  jsx: true
},
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    "react/destructuring-assignment": 'off',
      "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/no-unresolved": 'off',
    "no-shadow": 'off',
    "jsx-a11y/label-has-associated-control": 'off',
    "jsx-a11y/control-has-associated-label": 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
