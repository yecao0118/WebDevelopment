const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 8000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }
            },
        ],
    },
};