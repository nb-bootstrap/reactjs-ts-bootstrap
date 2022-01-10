import { useCombineSelector } from './hooks';
import { REDUCER_NAME } from '@reducers/wallet';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { NetworkContextName } from '@/config/constants';
import { isMobile } from 'react-device-detect';
import { connector } from '@/components/wallet/connectors';
import { openModal } from '@reducers/wallet';
import { useAppDispatch } from '.';

export const useWallet = (): UseWalletMoel => {
    const __wallet = useCombineSelector<WalletModel>(REDUCER_NAME, (state) => state);
    const __dispatch = useAppDispatch();
    return {
        ...__wallet,
        openModal: () => __dispatch(openModal()),
    };
};

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: number } {
    const context = useWeb3React<Web3Provider>();
    const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName);
    return context.active ? context : contextNetwork;
}

export function useEagerConnect(autoConnection: boolean): boolean {
    const { activate, active } = useWeb3React(); // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false);

    useEffect(() => {
        autoConnection &&
            connector.isAuthorized().then((isAuthorized: boolean) => {
                if (isAuthorized) {
                    activate(connector, undefined, true).catch(() => {
                        setTried(true);
                    });
                } else {
                    if (isMobile && window.ethereum) {
                        activate(connector, undefined, true).catch(() => {
                            setTried(true);
                        });
                    } else {
                        setTried(true);
                    }
                }
            });
    }, [activate, autoConnection]); // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);

    return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export const useInactiveListener = (suppress = false): void => {
    const { active, error, activate } = useWeb3React(); // specifically using useWeb3React because of what this hook does

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = () => {
                // eat errors
                activate(connector, undefined, true).catch((error) => {
                    console.error('Failed to activate after chain changed', error);
                });
            };

            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    // eat errors
                    activate(connector, undefined, true).catch((error) => {
                        console.error('Failed to activate after accounts changed', error);
                    });
                }
            };

            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged);
                    ethereum.removeListener('accountsChanged', handleAccountsChanged);
                }
            };
        }
        return undefined;
    }, [active, error, suppress, activate]);
};
