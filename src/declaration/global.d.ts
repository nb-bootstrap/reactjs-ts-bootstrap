declare interface Window {
    ethereum: any;
    requestAnimationFrame: (callback: (ts: number) => void) => number;
    cancelAnimationFrame: (requestId: number) => void;
}

declare module '*.m.less' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '@download/blockies';

declare module 'rc-util/lib/Dom/addEventListener';

// when you use React with typescript
declare namespace JSX {
    interface IntrinsicElements {
        'iconpark-icon': any; // Normal web component
    }
}

/**
 * use 回调函数
 */
declare type UseCallbackReturnType = void | (() => void);

/**
 * use 回调
 */
declare type UseCallback = <T>(input: T) => UseCallbackReturnType;

/**
 * 没有 input 的 use 回调
 */
declare type UseCallbackNoInput = () => UseCallbackReturnType;

declare type UseAsnycEffectOption = {
    error?: (e: any) => void;
    unmountRejected?: boolean;
    finally?: () => void;
    forceFinally?: () => void;
    deplay?: number;
    ignoreNull?: boolean; // null = undefined | null
};

declare type UseDynamicImageImportOptions = {
    onCompleted?: (name: string, ImageIcon: React.FC<React.SVGProps<SVGSVGElement> | React.ImgHTMLAttributes<HTMLImageElement>> | undefined) => void;
    onError?: (err: Error) => void;
};
