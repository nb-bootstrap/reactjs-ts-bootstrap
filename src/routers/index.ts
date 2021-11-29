import _ from 'lodash';

/**
 * 合并 route
 * @param routes
 * @returns
 */
const __mergeRoutes = (routes: ReactRoute[]): ReactRoute[] => {
    const __list = [] as ReactRoute[];
    // 开始便利
    routes.forEach((o) => {
        __list.push(o);
        if (_.isArray(o.children)) {
            const __children: ReactRoute[] = __mergeRoutes(o.children);
            __children.forEach((m) => {
                __list.push({
                    ...m,
                    path: `${o.path}${m.path}`,
                });
            });
        }
    });
    return __list;
};

let routers = [] as ReactRoute[];
const files = require.context('./', false, /\.tsx$/);
files.keys().forEach((key) => {
    const __default = __mergeRoutes(files(key).default);
    if (!_.isArray(__default)) {
        throw new Error(`router file ${key} is not array`);
    }
    routers = [...__default, ...routers];
});

export default routers;
