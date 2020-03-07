const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const assetsPath = path.join(__dirname, "assets");
const assetsJSPath = path.join(assetsPath, "js");

module.exports = {
    mode: "development",
    entry: {
        "common.init.bundle": path.join(
            assetsJSPath,
            "common",
            "common.init.js"
        ),
        "common.styles.bundle": path.join(
            assetsJSPath,
            "common",
            "common.styles.js"
        ),
        "pages.index.bundle": path.join(
            assetsJSPath,
            "pages",
            "pages.index.js"
        ),
    },
    output: {
        path: path.join(__dirname, "public", "dist"),
        publicPath: "/dist/",
        filename: "js/[name]-[contenthash].js",
        chunkFilename: "js/[id]-[contenthash].js",
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: [path.resolve(__dirname, "assets")],
                exclude: [path.resolve(__dirname, "node_modules")],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer"),
                                require("tailwindcss"),
                            ],
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jp(e*)g)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash].[ext]",
                            outputPath: "fonts",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".json", ".js", ".jsx"],
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash].css",
            chunkFilename: "css/[id]-[contenthash].css",
        }),
        new ManifestPlugin(),
    ],
};
