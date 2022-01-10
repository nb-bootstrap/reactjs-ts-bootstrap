import { WalletType } from '@/services/reducers/wallet';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { SUPPORTED_CHAINS } from '@/config/constants';
import { NetworkConnector } from '../NetworkConnector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { DEFAULT_CHAIN } from '@/config/constants';

const hadMetamaskPlugin: boolean = window.ethereum && window.ethereum.isMetaMask;
/**
 * injected connector
 */
const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAINS.filter((o) => process.env.REACT_APP_ENV == o.env).map((o) => o.chainId),
});

export const connector = injected;

export const network = new NetworkConnector({
    urls: { [DEFAULT_CHAIN.chainId]: DEFAULT_CHAIN.rpcUrl },
});
export const walletconnect = new WalletConnectConnector({
    rpc: { [DEFAULT_CHAIN.chainId]: DEFAULT_CHAIN.rpcUrl },
    qrcode: true,
});

export const WALLETS_CONNECTORS = [
    {
        name: 'metamask',
        link: !hadMetamaskPlugin ? 'https://metamask.io/' : '',
        type: WalletType.METAMASK,
        connector: connector,
    },
    {
        name: 'wallnetconnect',
        link: '',
        type: WalletType.WALLET_CONNECTOR,
        connector: () =>
            new WalletConnectConnector({
                rpc: { [DEFAULT_CHAIN.chainId]: DEFAULT_CHAIN.rpcUrl },
                bridge: 'https://bridge.walletconnect.org',
                qrcode: true,
                chainId: DEFAULT_CHAIN.chainId,
                infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
                supportedChainIds: [DEFAULT_CHAIN.chainId],
            }),
    },
] as WalletConnectorComponent[];

export const findWallet = (connector: AbstractConnector): WalletConnectorComponent => {
    if (connector instanceof WalletConnectConnector) {
        return { ...WALLETS_CONNECTORS[1], connector };
    }
    return WALLETS_CONNECTORS[0];
};

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider, typeof provider.chainId === 'number' ? provider.chainId : typeof provider.chainId === 'string' ? parseInt(provider.chainId) : 'any');
    library.pollingInterval = 15_000;
    // library.detectNetwork().then((network) => {
    //     const networkPollingInterval = NETWORK_POLLING_INTERVALS[network.chainId]
    //     if (networkPollingInterval) {
    //         console.debug('Setting polling interval', networkPollingInterval)
    //         library.pollingInterval = networkPollingInterval
    //     }
    // })
    return library;
}
