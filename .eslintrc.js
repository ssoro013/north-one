module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        'jest/globals': true
    },
    plugins: ['jest'],
    extends: [
        'standard',
        'plugin:jest/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        camelcase: 'off'
    }
}
