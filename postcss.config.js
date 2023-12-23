module.exports = {
    plugins: [
        [
            require('autoprefixer'),
            require('cssnano'),
            require('postcss-pxtorem')({ rootValue: 10, propList: ['*']}) 
        ],
    ],
};
