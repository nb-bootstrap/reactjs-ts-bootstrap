let routers = [] as any[];
const files = require.context('./', false, /\.ts$/);
files.keys().forEach(key => {
    if (key.startsWith('./index')) {
        return;
    }
    routers = [...files(key).default, ...routers];
});
export default routers;