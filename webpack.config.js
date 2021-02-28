const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";

const config = {
    entry: {
        distortomata: './src/main/ts/distortomata.tsx',
        tictactoe: './src/main/ts/tictactoe.tsx'
    },
    devtool: isProd ? false : 'source-map',
    cache: true,
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.join(__dirname, 'src', 'main', 'resources', 'static', 'built'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: [
                    /node_modules/,
                    /node/
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ],
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }]
            }
        ]
    }
};

if (isProd) {
    config.optimization = {
        minimizer: [new TerserWebpackPlugin()]
    };
} else {
    config.devServer = {
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        stats: "errors-only",
        overlay: true
    };
}

module.exports = config;