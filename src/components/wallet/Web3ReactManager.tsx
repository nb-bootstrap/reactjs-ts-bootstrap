import { ReactElement, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { NetworkContextName } from '@/config/constants';
import { useAppDispatch, useEagerConnect, useInactiveListener, useLocalStorage } from '@/services';
import { network, findWallet } from './connectors';
import { link, unlink, WalletType } from '@reducers/wallet';
import _ from 'lodash';

export default function Web3ReactManager(): ReactElement {
    // const { t } = useTranslation();
    const { active, account, chainId, library, connector: dfConnector } = useWeb3React();
    const dispatch = useAppDispatch();
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName);
    const [autoConnection, setAutoConnecion] = useLocalStorage('auto-connection', false);

    // try to eagerly connect to an injected provider, if it exists and has granted access already
    const triedEager = useEagerConnect(autoConnection as boolean);

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (!library && !networkActive && !networkError) {
            activateNetwork(network);
        }
    }, [triedEager, networkActive, networkError, activateNetwork, active, library]);

    useEffect(() => {
        if (dfConnector && chainId && active && networkActive && account && !_.isEmpty(account)) {
            const __wallet = findWallet(dfConnector);
            dispatch(
                link({
                    connected: true,
                    type: __wallet?.type,
                    address: account,
                    chainId,
                    connector: dfConnector,
                })
            );
            __wallet?.type === WalletType.METAMASK && setAutoConnecion(true);
        }
        if (!active) {
            dispatch(unlink());
            setAutoConnecion(false);
        }
    }, [active, account, chainId, networkActive, dfConnector]);

    // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
    useInactiveListener(!triedEager);

    // handle delayed loader state
    const [showLoader, setShowLoader] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(true);
        }, 600);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // on page load, do nothing until we've tried to connect to the injected connector
    if (!triedEager) {
        return <></>;
    }

    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (!active && networkError) {
        return <>unknownError</>;
    }

    // if neither context is active, spin
    if (!active && !networkActive) {
        return showLoader ? <>Loading</> : <></>;
    }

    return <></>;
}
