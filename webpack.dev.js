const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = merge(common, {
    mode: 'development',
    
    devtool: 'inline-source-map',
    
    devServer: {
        static: './dist',
    },

    plugins: [new ESLintPlugin()],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    
    optimization: {
        runtimeChunk: 'single',
    },
});
