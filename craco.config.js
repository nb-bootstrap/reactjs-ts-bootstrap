/* eslint-disable no-param-reassign */
// craco.config.js
const path = require("path");
const CracoLessPlugin = require('craco-less');
const { loaderByName } = require("@craco/craco");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');
const PRODUCTION = 'production';

const webpackPlugins = [new WebpackBar()];
if (process.env.REACT_APP_ANY === 'true') {
    webpackPlugins.push(new BundleAnalyzerPlugin());
}


module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // modifyVars: AND_LESS_VARIABLES,
                        javascriptEnabled: true,
                    },
                    additionalData: async (content, loaderContext) => {
                        // More information about available properties https://webpack.js.org/api/loaders/
                        // const { resourcePath, rootContext } = loaderContext;
                        // const relativePath = path.relative(rootContext, resourcePath);

                        // if (relativePath === "styles/foo.less") {
                        //     return "@spacing: 100px;" + content;
                        // }
                        // return fs.readFileSync('./src/styles/variables.less') + content;
                        return content;
                    }
                },
                modifyLessRule(lessRule, context) {
                    // You have to exclude these file suffixes first,
                    // if you want to modify the less module's suffix
                    lessRule.exclude = /\.m\.less$/;
                    return lessRule;
                },
                modifyLessModuleRule(lessModuleRule, context) {
                    // Configure the file suffix
                    lessModuleRule.test = /\.m\.less$/;

                    // Configure the generated local ident name.
                    const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
                    cssLoader.options.modules = {
                        localIdentName: context.env == PRODUCTION ? "[hash:base64]" : "[path][name]__[local]",
                    };

                    return lessModuleRule;
                },
            }
        }
    ],
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            if (env === PRODUCTION) {
                webpackConfig.devtool = false;
                const TerserPlugin = webpackConfig.optimization.minimizer.find((i) => i.constructor.name === 'TerserPlugin');
                if (TerserPlugin) {
                    TerserPlugin.options.terserOptions.compress['drop_console'] = true;
                    // TerserPlugin.options.terserOptions.compress['remove']
                }
            }
            return webpackConfig;
        },
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@hooks": path.resolve(__dirname, "./src/services/hooks"),
            "@reducers": path.resolve(__dirname, "./src/services/reducers"),
            "@declaration": path.resolve(__dirname, "./src/declaration/index"),
            "@utils": path.resolve(__dirname, "./src/utils/index"),
            "@apis": path.resolve(__dirname, "./src/services/apis/index"),
            "@config": path.resolve(__dirname, "./src/config/index")
        },
        plugins: webpackPlugins
    }
};