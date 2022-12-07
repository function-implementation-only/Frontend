module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:storybook/recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
    },
}
