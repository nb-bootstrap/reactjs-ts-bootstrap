import PageLoading from '@/components/page-loading';
import loadable from '@loadable/component';
export default [
    {
        path: '/home/:type?',
        component: loadable(() => import(/* webpackChunkName: "home" */ `@/views/home`), { fallback: <PageLoading /> }),
    },
] as ReactRoute[];
