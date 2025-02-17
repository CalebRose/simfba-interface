var path = require('path');
const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) =>
    crypto_orig_createHash(algorithm == 'md4' ? 'sha256' : algorithm);
// var PPCP = require("@babel/core");

module.exports = [
    {
        entry: [path.resolve(__dirname, './src/index.js')],
        mode: 'development',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './public'),
            publicPath: '/'
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
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: 'app/images/[name].[ext]' // ✅ Corrected loader syntax
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.css']
        },
        // externals: {
        //     "react": "React",
        //     "react-dom": "ReactDOM"
        // },
        // devtool: "source-map",
        watch: false
    }
];
