const { merge } = require("webpack-merge");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/auth/latest/",
    },
    plugins: [
        new moduleFederationPlugin({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                "./userAuth": "./src/asyncIndex",
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
