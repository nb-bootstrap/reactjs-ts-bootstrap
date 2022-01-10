import { ReactElement } from 'react';
import _ from 'lodash';

/**
 * 合并class
 * @param classeNames
 * @returns
 */
export const mergeClasses = (...classeNames: string[]): string => {
    const _classNames: string[] = [];
    classeNames.filter((o) => !_.isEmpty(o)).forEach((o) => _classNames.push(o));
    return _classNames.join(' ');
};

/**
 * 遍历生成 react
 * @param array 数组
 * @param consumer  生成方式
 * @returns  react 元素
 */
export const iteratorTos = <T>(array: T[], consumer: (o: T, i: number) => ReactElement | undefined): ReactElement[] => {
    if (_.isEmpty(array)) {
        return [];
    }
    const _list: ReactElement[] = [];
    array.forEach((o, i) => {
        const _elt: ReactElement | undefined = consumer(o, i);
        if (_elt != undefined) {
            _list.push(_elt);
        }
    });
    return _list;
};

/**
 * 生成一个包装器
 * @param array array
 * @param wrapper  wrapper
 * @param consumer  消费者
 * @returns  结果
 */
export const iteratorTo = <T>(array: T[], wrapper: (children: ReactElement[]) => ReactElement, consumer: (o: T, i: number) => ReactElement | undefined): ReactElement => {
    return wrapper(iteratorTos(array, consumer));
};

export const iteratorNumTo = (num: number, wrapper: (children: ReactElement[]) => ReactElement, consumer: (o: number, i: number) => ReactElement | undefined): ReactElement => {
    const array = [] as number[];
    for (let i = 0; i < num; i++) {
        array.push(i);
    }
    return wrapper(iteratorTos<number>(array, consumer));
};

export const iteratorNumTos = (num: number, consumer: (o: number, i: number) => ReactElement | undefined): ReactElement[] => {
    const array = [] as number[];
    for (let i = 0; i < num; i++) {
        array.push(i);
    }
    return iteratorTos<number>(array, consumer);
};

/**
 * 替换 class
 * @param body  body元素
 * @param className 类名
 * @param removeClasses 移除的类名
 */
export const addClassName = (body: HTMLElement, className: string, removeClasses: string[] = []): void => {
    const __classList = body.classList;
    // 移除已经存在的class
    removeClasses.forEach((o) => __classList.remove(o));
    // 解析 classname
    _.isEmpty(className) || __classList.add(className);
};

/**
 * addres sensitive
 * @param addr
 * @returns
 */
export const sensitiveAddress = (addr: string | undefined | null): string => {
    if (!addr) {
        return '';
    }
    return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4);
};

/**
 * switch network
 * @param chainId
 */
export const switchNetwork = async (chainId: number): Promise<any> => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }], // chainId must be in hexadecimal numbers
    });
};
