const files = require.context('./locales/', true, /\.json$/);
const i18nConfig = {};
const __lans = new Set();
const __namespaces = new Set();
files.keys().forEach((key) => {
    const config = parseLocale(key);
    const df = files(key);
    if (i18nConfig[config.lan] === undefined) {
        i18nConfig[config.lan] = {};
    }
    i18nConfig[config.lan][config.name] = df;
    __lans.add(config.lan);
    __namespaces.add(config.name);
});
function parseLocale(key) {
    const config = {},
        splits = key.split('/');
    if (splits.length < 3) {
        throw new Error(`{key} url path format error!`);
    }
    config.name = splits[1];
    config.lan = splits[2].substring(0, splits[2].lastIndexOf('.'));
    return config;
}

const namespaces = [];
const lans = [];
__namespaces.forEach((o) => namespaces.push(o));
__lans.forEach((o) => lans.push(o));
module.exports = {
    lans,
    resources: i18nConfig,
    namespaces: __namespaces,
};
