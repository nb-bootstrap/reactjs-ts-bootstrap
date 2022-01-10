import { ReactElement, useCallback } from 'react';
import _ from 'lodash';
import { Modal, message } from 'antd';
import { useLocalStorage, useTranslation, useWallet } from '@/services';
import { WALLETS_CONNECTORS } from './connectors';
import Connected from './status/Connected';
import Unconnected from './status/Unconnected';
import LocalImage from '@/components/LocalImage';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NetworkContextName } from '@/config/constants';
import { switchNetwork } from '@utils';
import { DEFAULT_CHAIN } from '@/config/constants';
import { WalletType } from '@/services/reducers/wallet';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const WalletModal = ({ visible, onCancel }: ModalProps): ReactElement => {
    const { t } = useTranslation('wallet', 'header.wallet');
    const { deactivate } = useWeb3React(NetworkContextName);
    const { deactivate: networkDeactivate, activate } = useWeb3React();
    const { connected } = useWallet();
    const [walletConnected, setWalletConnected] = useLocalStorage('walletconnect-connected', false);
    const __unlink = useCallback(() => {
        setWalletConnected(false);
        deactivate();
        networkDeactivate();
    }, [deactivate, networkDeactivate]);
    // // start to link wallet
    const __toLink = (name: string) => {
        const __wallet = _.find(WALLETS_CONNECTORS, { name });

        if (__wallet && !_.isEmpty(__wallet.link)) {
            window.open(__wallet.link, '_blank');
            return;
        }
        if (__wallet === undefined) {
            return;
        }
        const __connector = _.isFunction(__wallet.connector) ? __wallet.connector() : __wallet.connector;
        if (__connector instanceof WalletConnectConnector && __connector.walletConnectProvider?.wc?.uri) {
            __connector.walletConnectProvider = undefined;
        }
        if (__connector === undefined) {
            return;
        }

        activate(__connector, undefined, true)
            .then(() => {
                if (walletConnected) {
                    console.error('clear connected');
                    setWalletConnected(false);
                    __unlink();
                    _.delay(() => window.location.reload(), 200);
                } else {
                    setWalletConnected(true);
                }
            })
            .catch((e) => {
                if (e instanceof UnsupportedChainIdError) {
                    message.error(t('chain-id-error'));
                    // switch network if wallet type is metamask
                    if (__wallet.type === WalletType.METAMASK) {
                        switchNetwork(DEFAULT_CHAIN.chainId)
                            .catch(console.error)
                            .then(() => {
                                activate(__connector).then(() => window.location.reload());
                            });
                    }
                }
            });
    };
    return (
        <>
            <Modal title={t(connected ? 'unlink-title' : 'link-title')} centered closeIcon={<LocalImage dir="/images/wallet" name="close-x" type="svg" width="20" />} footer={false} visible={visible} onCancel={onCancel}>
                {connected ? <Connected toUnlink={__unlink} /> : <Unconnected toLink={__toLink} />}
            </Modal>
        </>
    );
};
export default WalletModal;
