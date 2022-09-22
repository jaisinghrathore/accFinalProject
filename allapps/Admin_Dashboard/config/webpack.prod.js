const { merge } = require("webpack-merge");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/admin/latest/",
    },
    plugins: [
        new moduleFederationPlugin({
            name: "admin",
            filename: "remoteEntry.js",
            exposes: {
                "./admin": "./src/asyncIndex",
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
