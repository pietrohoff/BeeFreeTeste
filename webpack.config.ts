import path from 'path'
import webpack from 'webpack'
import dotenv from 'dotenv'
process.env.NODE_ENV = 'development'
dotenv.config({ path: './.env' })


const DEFAULT_PORT = process.env.PORT||'8081';
console.log('listening on port: ', DEFAULT_PORT)

export default {
    entry: './example/integration.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/dist',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        bonjour: true,
        open: true,
        static: './example/',
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
    plugins:[
        new webpack.DefinePlugin({"process.env": JSON.stringify(process.env)}),
    ]
};