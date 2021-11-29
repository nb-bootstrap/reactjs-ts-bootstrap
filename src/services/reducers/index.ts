export default (): any => {
    const files = require.context('./', false, /\.ts$/);
    const reducers: any = {};
    files.keys().forEach((key) => {
        if (key.startsWith('./index')) {
            return;
        }
        const df = files(key);
        const name = df.REDUCER_NAME;
        reducers[name] = df.default;
    });
    return reducers;
};
