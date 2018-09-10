const path = require('path');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "",
        library: "MyLibrary", // string,
        // the name of the exported library

        libraryTarget: "umd", // universal module definition
        // the type of the exported library

        /* Advanced output configuration (click to show) */
    },

    module: {
        // configuration regarding modules

        rules: [
            // rules for modules (configure loaders, parser options, etc.)

            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, '..', 'node_modules')],
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 1 version', 'ie >= 11']
                                })
                            ]
                        }
                    }
                   
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ],

        /* Advanced module configuration (click to show) */
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        // directories where to look for modules

        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used
    },

    performance: {
        hints: "warning", // enum
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
        assetFilter: function (assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    devtool: "source-map",
    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory

    target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules

    externals: ["React"],
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: "errors-only",
    // lets you precisely control what bundle information gets displayed

    devServer: {
        host: 'localhost',
        inline: true,
        port: 3002,
        historyApiFallback: true,
        // proxy: { // proxy URLs to backend development server
        //   '/api': 'http://localhost:3000'
        // },
        // contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        // compress: true, // enable gzip compression
      // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        // https: false, // true for self-signed, object for cert authority
        // noInfo: true, // only errors & warns on hot reload
        
        // ...
    },

    plugins: [
        new htmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],

}
