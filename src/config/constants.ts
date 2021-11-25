/**
 * 多语言映射，默认是 en -> en,如果有 en-US/en_US -> en 的需求使用此映射
 */
export const LOCALE_MAPPING = {};

/**
 * 支持的 语言
 */
export const LOCALE_NAMES = [
    {
        label: 'English',
        id: 'en_US',
    },
    {
        label: '日本語',
        id: 'ja_JP',
    },
    {
        label: '한국어',
        id: 'ko_KR',
    },
] as { label: string; id: string }[];
