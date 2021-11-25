import { useTranslation as useTrans } from 'react-i18next';
import { i18n } from 'i18next';

/**
 * 翻译
 * @param namespace  命名空间
 * @param prefixKey 前缀
 * @returns 结果
 */
export const useTranslation = (namespace: string, keyPrefix = ''): { t: (message: string) => string; i18n: i18n } => {
    return useTrans(namespace, { keyPrefix });
};
