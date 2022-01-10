import { useTranslation, useWallet } from '@/services';
import { Button, notification } from 'antd';
import { ReactElement } from 'react';
import styles from '@/styles/market/wallet.m.less';
import { CopyOutlined } from '@ant-design/icons';

const Connected = ({ toUnlink }: { toUnlink: () => void }): ReactElement => {
    const { address } = useWallet();
    const { t } = useTranslation('market', 'header.wallet');
    const _copyAddress = () => {
        navigator.clipboard.writeText(address);
        notification.success({ message: t('copy-success') });
    };
    return (
        <div className={styles['connected-wallet']}>
            <p>
                {address}
                <CopyOutlined onClick={_copyAddress} />
            </p>
            <p className={styles['footer']}>
                <Button type="primary" onClick={toUnlink}>
                    {t('sign-out')}
                </Button>
            </p>
        </div>
    );
};
export default Connected;
