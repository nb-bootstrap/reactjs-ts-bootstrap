import { ReactElement, ReactNode, useMemo } from 'react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './connectors';
import { NetworkContextName } from '@/config/constants';
import Web3ReactManager from './Web3ReactManager';

const WalletProvider = ({ children }: { children: ReactNode[] | ReactNode }): ReactElement => {
    const Web3ProviderNetwork = useMemo(() => createWeb3ReactRoot(NetworkContextName), []);
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Web3ReactManager />
                {children}
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
};
export default WalletProvider;
