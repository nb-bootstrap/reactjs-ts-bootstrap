import { useState } from 'react';
import _ from 'lodash';

/**
 * 放入一个 localstorage
 * @param key key 字符串类型
 * @param value  value，最终会系列化成string
 */
export const putLocalStorage = <T>(key: string, value: T): boolean => {
    if (value === null || value == undefined || _.isEmpty(key)) {
        localStorage.removeItem(key);
        return true;
    }
    // 开始存储
    localStorage.setItem(key, JSON.stringify(value));
    return true;
};

/**
 * 获取存储值
 * @param key  key
 * @param defaultValue  默认值
 * @returns 
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | undefined => {
    // 获取原始字符串
    const st = localStorage.getItem(key);
    if (!st || _.isEmpty(st)) {
        return defaultValue;
    }
    return JSON.parse(st) as T;
};
/**
 * local storage
 * @param key item 存储
 * @param value 默认值
 * @returns 
 */
export const useLocalStorage = <T>(key: string, value?: T): [T | undefined, (v: T) => void] => {
    // 初始化一个 use state
    const __def = getLocalStorage(key) === undefined ? value : getLocalStorage(key);
    const [__local, __setLocal] = useState(__def as T);
    const changeLocal = (v: T) => {
        putLocalStorage(key, v);
        __setLocal(v);
    };

    return [__local, changeLocal];
}