import { ReactElement, useEffect, useState } from 'react';
import Wallet from '@/components/wallet';
import { useCombineSelector, useTranslation, useWallet } from '@/services';
import { sensitiveAddress } from '@/utils';
import { Button } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { REDUCER_NAME } from '@reducers/wallet';

const WalletUnconnected = ({ toLink }: { toLink: () => void }): ReactElement => {
    const { t } = useTranslation('wallet', 'header');
    return (
        <Button type="primary" onClick={toLink} icon={<WalletOutlined />}>
            {t('connect-wallet')}
        </Button>
    );
};

const WalletConnected = ({ toUnlink }: { toUnlink: () => void }): ReactElement => {
    const { address } = useWallet();
    return (
        <>
            <Button type="default" onClick={toUnlink}>
                {sensitiveAddress(address)}
            </Button>
        </>
    );
};
const Header = (): ReactElement => {
    const { connected } = useWallet();
    const openModal = useCombineSelector<WalletTransactionModel>(REDUCER_NAME, (state) => state.openModal);
    const [visible, setVisible] = useState(false);
    // if addres is change, visibile is setting to false
    useEffect(() => void setVisible(false), [connected]);
    useEffect(() => void (openModal > 0 && setVisible(true)), [openModal]);
    return (
        <div>
            <Wallet visible={visible} hide={() => setVisible(false)}>
                {connected ? <WalletConnected toUnlink={() => setVisible(true)} /> : <WalletUnconnected toLink={() => setVisible(true)} />}
            </Wallet>
        </div>
    );
};

export default Header;
