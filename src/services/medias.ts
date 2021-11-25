import { MediaType, REDUCER_NAME, ContextModel } from './reducers/context';
import { useCombineSelector } from './hooks';
import { useEffect } from 'react';

/**
 * 是否移动端
 * @returns
 */
export const useIsMobile = (): boolean => {
    return useCombineSelector<ContextModel>(
        REDUCER_NAME,
        (state) => state.screen.isMobile
    );
};

/**
 * 使用media type
 * @returns
 */
export const useMediaType = (): MediaType => {
    return useCombineSelector<ContextModel>(
        REDUCER_NAME,
        (state) => state.screen.mediaType
    );
};

/**
 *m media type 监听
 * @param callback media 查询
 * @param props
 * @param eq
 */
export const useEffectMediaType = (
    callback: UseCallback,
    props: any[],
    eq?: MediaType
): void => {
    const mediaType = useMediaType();
    const __props = [...props, mediaType];
    useEffect(() => {
        if (eq !== undefined && eq !== mediaType) {
            return;
        }
        return callback(mediaType);
    }, __props);
};

/**
 * 监听 window
 * @returns
 */
export const useWindowSize = (): [number, number] => {
    return useCombineSelector<ContextModel>(REDUCER_NAME, (state) => [
        state.screen.width,
        state.screen.height,
    ]);
};

/**
 * 监听 window 尺寸变化
 * @param callback
 * @param props
 */
export const useEffectWindowSize = (
    callback: (width: number, height: number) => UseCallbackReturnType,
    props: any[]
): void => {
    const [width, height] = useWindowSize();
    const __props = [...props, width, height];
    useEffect(() => callback(width, height), __props);
};
