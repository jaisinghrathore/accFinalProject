const { merge } = require("webpack-merge");
const moduleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/container/latest/",
    },
    plugins: [
        new moduleFederationPlugin({
            name: "container",
            remotes: {
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                admin: `admin@${domain}/admin/latest/remoteEntry.js`,
                products: `products@${domain}/products/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
