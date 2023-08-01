var path = require('path');
const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) =>
    crypto_orig_createHash(algorithm == 'md4' ? 'sha256' : algorithm);
// var PPCP = require("@babel/core");

module.exports = [
    {
        entry: [path.resolve(__dirname, './src/index.js')],
        mode: 'production',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './public')
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
                    loader: 'url-loader?name=app/images/[name].[ext]'
                }
                // {
                //     test: /\.jsx?$/,
                //     // loader: "ts-loader?{configFile: \"tsconfig.json\"}",
                //     include: [path.resolve(__dirname, "./src")],
                //     options: { allowTsInNodeModules: true }
                // }
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
