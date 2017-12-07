// Using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // import our plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
    entry: path.join(paths.JS, 'app.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js',
    },
    // Tell webpack to use html plugin
    // index.html is used as template in which it will inject bundled app.
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'), // css will be extracted to this bundle
    ],
    // Enable importing JS files without specifying extention
    // import MyComponent from './my-component'; 
    // instead of importing MyComponent from './my-component.jsx';
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            // CSS loader to CSS files
            // files will get handled by css loader and then passed to extract text and write to file defined above
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            }
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

