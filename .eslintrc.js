module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2020: true,
        jest: true,
    },
    extends: ['airbnb-base', 'eslint-config-prettier'],
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            impliedStrict: true,
        },
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': 'warn', // 1
        'default-case': 'error', // 2
        'no-empty-function': 2,
        'no-magic-numbers': 1,
        'global-require': 2,
        'camelcase': 2,
    },
    ignorePatterns: ['node_modules/'],
};
