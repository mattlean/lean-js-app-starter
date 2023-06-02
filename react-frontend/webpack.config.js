const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.js',

    output: {
        clean: true,
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'),
    },

    plugins: [new HtmlWebpackPlugin({ title: 'LJAS: React Frontend' })],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            [
                                '@babel/preset-react',
                                {
                                    development:
                                        process.env.BABEL_ENV === 'development',
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
}
