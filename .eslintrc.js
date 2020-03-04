module.exports = {
    // globals: {
    //     __PATH_PREFIX__: true,
    // },
    extends: ['universe/node', 'universe/web', 'plugin:jsx-a11y/recommended'],
    plugins: ['jsx-a11y'],
    rules: {
        'react/prop-types': 1,
    },
};
