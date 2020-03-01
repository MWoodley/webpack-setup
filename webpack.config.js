const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        publicPath: "/public/",
        filename: "js/[name].js",
        chunkFilename: "js/[id].js",
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
        ],
    },
    resolve: {
        extensions: [".json", ".js", ".jsx"],
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        }),
    ],
};
