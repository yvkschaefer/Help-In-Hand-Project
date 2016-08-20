//webpack, path, and envFile are needed for Firebase
var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile(path.join(__dirname, process.env.NODE_ENV + '.env'));
} catch (e) {
    console.log(e);
}

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: './public/js/app-bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    // this plugin contains the information for Firebase
    plugin: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'sourcemap'
}