import path from 'path';

export default {
    entry: './src/blocks/app/app.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|\.fest\.js$/,
                loader: 'babel-loader'
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
