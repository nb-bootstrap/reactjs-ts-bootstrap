import { addPageTitle, backPageTitle } from '@reducers/context';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
export const useEffectPageTitle = (render: ((language: string) => string) | string, namespace = false as false | string, props = []): void => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const __props = [...props, i18n];
    useEffect(() => {
        // 开始控制 page title
        const __currentTs: string = _.isString(render) ? render : render(i18n.language);
        dispatch(addPageTitle([__currentTs, namespace]));
        return () => void dispatch(backPageTitle());
    }, __props);
};
