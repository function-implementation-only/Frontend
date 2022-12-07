module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:storybook/recommended',
    ],
    plugins: ['import'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
            // https://github.com/jsx-eslint/eslint-plugin-react/issues/2282
            1,
            {
                extensions: ['.tsx', '.ts'],
            },
        ],
        // https://bobbyhadz.com/blog/react-jsx-props-no-spreading
        'react/jsx-props-no-spreading': 'off',
        'import/no-extraneous-dependencies': [
            // https://github.com/airbnb/javascript/issues/2376
            'error',
            {
                devDependencies: [
                    '**/*stories.tsx', // stories files
                    '**/vite.config.ts', // vite config
                    '**/.eslintrc.cjs', // eslint config
                    '**/tsconfig.json', // tsconfig config
                ],
                optionalDependencies: false,
            },
        ],
        'react/function-component-definition': [
            'error',
            {
                namedComponents: ['function-declaration', 'arrow-function'],
                unnamedComponents: 'arrow-function',
            },
        ],
    },
}
