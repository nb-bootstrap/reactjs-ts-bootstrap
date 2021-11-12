declare interface Window {
    ethereum: any,
    requestAnimationFrame: (callback: (ts: number) => void) => number,
    cancelAnimationFrame: (requestId: number) => void
}


declare module "*.m.less" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '@download/blockies';


declare module 'rc-util/lib/Dom/addEventListener';

// when you use React with typescript
declare namespace JSX {
    interface IntrinsicElements {
        'iconpark-icon': any // Normal web component
    }
}