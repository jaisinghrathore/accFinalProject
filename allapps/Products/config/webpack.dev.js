const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
    mode: "development",
    devServer: {
        port: 8083,
        historyApiFallback: {
            index: "index.html",
        },
    },
    plugins: [
        new moduleFederationPlugin({
            name: "products",
            filename: "remoteEntry.js",
            exposes: {
                "./products": "./src/asyncIndex",
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
