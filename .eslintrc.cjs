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
        'react/jsx-props-no-spreading': 'off',
        // 가독성을 높이는 rule로 storybook의 원활한 사용을 위해 제거
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: ['function-declaration', 'arrow-function'],
                unnamedComponents: 'arrow-function',
            },
        ],
    },
}
