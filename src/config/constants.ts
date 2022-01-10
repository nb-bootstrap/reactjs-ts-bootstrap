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

/**
 * default chain properties
 */
export const DEFAULT_CHAIN = {
    chainId: process.env.REACT_APP_CHAIN_ID ? parseInt(process.env.REACT_APP_CHAIN_ID) : 1,
    name: process.env.REACT_APP_CHAIN_NAME ? process.env.REACT_APP_CHAIN_NAME : 'Ethereum',
    explorer: process.env.REACT_APP_CHAIN_EXPLORER ? 'https://etherscan.io' : process.env.REACT_APP_CHAIN_EXPLORER,
    env: process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : 'TEST',
    rpcUrl: process.env.REACT_APP_CHAIN_RPC_URL ? 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' : process.env.REACT_APP_CHAIN_RPC_URL,
    confirm: process.env.REACT_APP_CHAIN_CONFIRM ? parseInt(process.env.REACT_APP_CHAIN_CONFIRM) : 3,
} as WalletChain;

export const NetworkContextName = 'NETWORK';
