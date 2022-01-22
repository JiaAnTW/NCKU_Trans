const path = require('path');

module.exports = {
    mode: 'development',
    entry: './resources/assets/js/app.js',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: false,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['svg-url-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'resources/assets/js/'),
            '@': path.resolve(__dirname, 'resources/assets/js/'),
        },
        extensions: ['.js'],
    },
};
