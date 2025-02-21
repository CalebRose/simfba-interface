const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) =>
    crypto_orig_createHash(algorithm == 'md4' ? 'sha256' : algorithm);

module.exports = {
    entry: [path.resolve(__dirname, './src/index.js')],
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public'),
        clean: true,
        publicPath: '/' // set to /simsn-interface/ when in debug
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        historyApiFallback: true, // Fixes routing issues with React Router
        compress: true,
        port: 3000,
        hot: true // Enable Hot Module Replacement (HMR)
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource'
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()] // Minify JS
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.css']
    },
    watch: false
};
