import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import combineReducers from './reducers';
import { AnyAction } from 'redux';
import { useEffect, useLayoutEffect } from 'react';
import _ from 'lodash';

const configureAppStore = () => {
    const store = configureStore({
        reducer: combineReducers(),
        middleware: (getDefaultMiddleware) => {
            if (process.env.NODE_ENV === `development`) {
                const { logger } = require(`redux-logger`);
                return getDefaultMiddleware({
                    serializableCheck: false,
                }).concat(logger);
            }
            return getDefaultMiddleware({
                serializableCheck: false,
            });
        },
    });
    return store;
};

export const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useThunkDispatch = (): ThunkDispatch<RootState, any, AnyAction> => useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * 使用 selector
 * @param module
 * @param selector
 * @returns
 */
export const useCombineSelector = <T>(module: string, selector: (t: T) => any): any => {
    return useAppSelector((state) => {
        if (state[module] === undefined) {
            throw new Error(module + ' reducer module is not found');
        }
        return selector(state[module] as T);
    }, shallowEqual);
};

/**
 * 动态监听
 * @param state
 * @param eq
 * @param callback
 * @param props
 */
export const useEffectIn = <T>(state: T, eq: T, callback: UseCallbackNoInput, props = [] as any[]): void => {
    const __props = [...props, state];
    useEffect(() => {
        if (eq == state) {
            return callback();
        }
    }, __props);
};

/**
 * 动态监听
 * @param state
 * @param eq
 * @param callback
 * @param props
 */
export const useEffectNotIn = <T>(state: T, neq: T, callback: UseCallbackNoInput, props = [] as any[]): void => {
    const __props = [...props, state];
    useEffect(() => {
        if (neq != state) {
            return callback();
        }
    }, __props);
};

// 默认值
const DEFAULT_EFFECT_OPTION: UseAsnycEffectOption = {
    error: console.error,
    unmountRejected: true,
    ignoreNull: true,
    finally: () => _.noop(),
};

/**
 * 异步 effect 处理
 * @param callback
 * @param render
 * @param props
 * @param error
 */
export const useAsyncEffect = <T>(callback: () => Promise<T>, render: (data: T) => void, props: any[], options?: UseAsnycEffectOption): void => {
    const opt: UseAsnycEffectOption = {
        ...DEFAULT_EFFECT_OPTION,
        ...(options || {}),
    };
    useEffect(() => __mapAsnycEffect(callback, render, props, opt), props);
};

/**
 *  计算 effect
 * @param callback
 * @param render
 * @param props
 * @param options
 * @returns
 */
const __mapAsnycEffect = <T>(callback: () => Promise<T>, render: (data: T) => void, props: any[], options: UseAsnycEffectOption): (() => void) => {
    // 检查属性值,如果有一个为 false
    if (options.ignoreNull && props.length > 0) {
        for (let i = 0; i < props.length; i++) {
            if (props[i] === undefined || props[i] === null) {
                return () => 1;
            }
        }
    }
    let __mounted = true;
    let __hadCallback = false;

    const __endCallback = () => {
        if (!__hadCallback) {
            (!DEFAULT_EFFECT_OPTION.unmountRejected || __mounted) && options.finally && options.finally();
            options.forceFinally && options.forceFinally();
            __hadCallback = true;
        }
    };
    const __startCallback = () => {
        callback()
            .then((o) => (!DEFAULT_EFFECT_OPTION.unmountRejected || __mounted) && render(o))
            .catch((e) => {
                if (e === false) {
                    console.debug(e);
                    return;
                }
                options.error && options.error(e);
            })
            .finally(__endCallback);
    };

    let __it = undefined as undefined | NodeJS.Timer;
    // 是否需要支持延迟加载
    if (options.deplay === undefined || options.deplay <= 0) {
        __startCallback();
    } else {
        __it = setTimeout(__startCallback, options.deplay);
    }

    return () => {
        __mounted = false;
        __it !== undefined && clearTimeout(__it);
        __endCallback();
    };
};
/**
 * 异步 layout effect 处理
 * @param callback
 * @param render
 * @param props
 * @param error
 */
export const useAsyncLayoutEffect = <T>(callback: () => Promise<T>, render: (data: T) => void, props: any[], options?: UseAsnycEffectOption): void => {
    const opt: UseAsnycEffectOption = {
        ...DEFAULT_EFFECT_OPTION,
        ...(options || {}),
    };
    useLayoutEffect(() => __mapAsnycEffect(callback, render, props, opt), props);
};
