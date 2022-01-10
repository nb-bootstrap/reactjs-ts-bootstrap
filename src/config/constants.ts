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

export const DEFAULT_CHAIN = {
    chainId: 4,
    name: 'Rinkeby',
    explorer: 'https://rinkeby.etherscan.io',
    f3kController: '0xFD930b7F7180Ab2DE0f9a9Fe1cB2F7eE61530ab5',
    env: 'TEST',
    rpcUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    confirm: 1,
} as WalletChain;
