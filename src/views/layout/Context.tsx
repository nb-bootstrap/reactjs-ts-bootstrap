import { useAppDispatch, useTranslation } from '@/services';
import { ReactElement, useCallback, useEffect } from 'react';
import { LOCALE_NAMES } from '@/config/constants';
import { addClassName } from '@/utils';
import { resize } from '@reducers/context';
import _ from 'lodash';

const __LAN_CLASS_NAMES = LOCALE_NAMES.map((o) => `lan-${o.id.toLowerCase()}`);

const __BODY = document.getElementsByTagName('body')[0];
/**
 * 用于初始化一些一次性的数据
 * @returns
 */
const Context = (): ReactElement => {
    const { i18n } = useTranslation('', '');
    const dispatch = useAppDispatch();
    // 添加了 resize 事件
    const __resize = useCallback(() => _.throttle(() => dispatch(resize()), 200), []);
    useEffect(() => addClassName(__BODY, `lan-${i18n.language.toLowerCase()}`, __LAN_CLASS_NAMES), [i18n.language]);
    // 添加 resize 事件
    useEffect(() => {
        // 先调用一次
        __resize();
        // resize 监听
        window.addEventListener('resize', __resize);
        return () => window.removeEventListener('resize', __resize);
    }, []);
    return <></>;
};

export default Context;
