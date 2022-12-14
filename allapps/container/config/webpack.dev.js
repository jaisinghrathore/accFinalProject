const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
    mode: "development",
    devServer: {
        port: 8080,
    },
    plugins: [
        new moduleFederationPlugin({
            name: "container",
            remotes: {
                auth: "auth@http://localhost:8081/remoteEntry.js",
                admin: "admin@http://localhost:8082/remoteEntry.js",
                products: "products@http://localhost:8083/remoteEntry.js",
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
