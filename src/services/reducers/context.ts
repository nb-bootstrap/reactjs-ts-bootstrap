import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import _ from 'lodash';
import { addClassName } from '@/utils';

export const REDUCER_NAME = 'context';
/**
 * 媒体类型
 */
export enum MediaType {
    XS = 'XS',
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
    XL = 'XL',
}

export const MediaWidths: { type: MediaType; max: number }[] = [
    { type: MediaType.XS, max: 576 },
    { type: MediaType.SM, max: 768 },
    { type: MediaType.MD, max: 992 },
    { type: MediaType.LG, max: 1200 },
    { type: MediaType.XL, max: 999999 },
];

const __MEDIA_TYPE_CLASSES = MediaWidths.map((o) => `media-${o.type.toLowerCase()}`);

export interface ContextModel {
    screen: {
        width: number;
        height: number;
        mediaType: MediaType;
        isMobile: boolean;
    };
    pageTitleStacks: {
        text: string;
        namespace: boolean | string;
    }[];
}

const _getMediaType = (width: number): MediaType => {
    for (let i = 0; i < MediaWidths.length; i++) {
        if (MediaWidths[i].max > width) {
            return MediaWidths[i].type;
        }
    }
    throw new Error(`Current media width ${width} is not match`);
};

const _getMediaSize = (): [number, number] => {
    let winWidth = 0,
        winHeight = 0;
    //获取窗口宽度
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    } else if (document.body && document.body.clientWidth) {
        winWidth = document.body.clientWidth;
    }
    //获取窗口高度
    if (window.innerHeight) {
        winHeight = window.innerHeight;
    } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
    }
    if (winWidth > 0 && winHeight > 0) {
        return [winWidth, winHeight];
    }

    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }

    return [winWidth, winHeight];
};

/**
 * 是否 mobile
 * @param mediaType
 * @returns
 */
const _isMobile = (mediaType: MediaType): boolean => {
    return [MediaType.MD, MediaType.SM, MediaType.XS].includes(mediaType);
};

// 初始化
const [__width, __height] = _getMediaSize();
const __mediaType = _getMediaType(__width);
// body element
const __BODY = document.getElementById('root');
const __TITLE = document.getElementsByTagName('title')[0];
// 初始化
const contextSlice = createSlice({
    name: REDUCER_NAME,
    initialState: {
        screen: {
            height: __height,
            width: __width,
            mediaType: _getMediaType(__width),
            isMobile: _isMobile(__mediaType),
        },
        pageTitleStacks: [
            {
                namespace: false,
                text: 'Loading',
            },
        ],
    } as ContextModel,
    reducers: {
        resize: (state) => {
            const [__width0, __height0] = _getMediaSize();
            const __mediaType0 = _getMediaType(__width0);
            state.screen = {
                height: __height0,
                width: __width0,
                mediaType: __mediaType0,
                isMobile: _isMobile(__mediaType0),
            };
            // 设置 body class
            addClassName(__BODY as any, `media-${state.screen.mediaType}`.toLowerCase(), __MEDIA_TYPE_CLASSES);
        },
        addPageTitle: (state, action: PayloadAction<[string, string | false]>) => {
            __TITLE.innerText =
                (action.payload[1] !== false
                    ? t(`${action.payload[0]}`, {
                          lng: 'en_US',
                          ns: action.payload[1] as string,
                      })
                    : action.payload) +
                '-' +
                t(`PageTitleSuffix`, { ns: 'common' });
            state.pageTitleStacks.push({
                namespace: action.payload[1],
                text: action.payload[0],
            });
        },
        resetPageTitle: (state) => {
            let __prefix = '';
            if (!_.isEmpty(state.pageTitleStacks)) {
                const __current = state.pageTitleStacks[state.pageTitleStacks.length - 1];
                __prefix =
                    (__current.namespace !== false
                        ? t(`${__current.text}`, {
                              ns: __current.namespace as string,
                          })
                        : __current.text) + '-';
            }
            __TITLE.innerText = __prefix + t(`PageTitleSuffix`, { ns: 'common' });
        },
        backPageTitle: (state) => {
            state.pageTitleStacks.pop();
            let __prefix = '';
            if (!_.isEmpty(state.pageTitleStacks)) {
                const __current = state.pageTitleStacks[state.pageTitleStacks.length - 1];
                __prefix =
                    (__current.namespace !== false
                        ? t(`${__current.text}`, {
                              ns: __current.namespace as string,
                          })
                        : __current.text) + '-';
            }
            __TITLE.innerText = __prefix + t(`PageTitleSuffix`, { ns: 'common' });
        },
    },
});

// 导出 reducer
export const { resize, addPageTitle, backPageTitle } = contextSlice.actions;
export default contextSlice.reducer;
