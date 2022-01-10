import { ReactElement, ReactNode } from 'react';
import WalletModal from './WalletModal';

const Wallet = ({ visible, children, hide }: { visible: boolean; children: ReactNode[] | ReactNode; hide: () => void }): ReactElement => {
    return (
        <>
            <WalletModal visible={visible} onCancel={() => hide()} />
            {children}
        </>
    );
};
export default Wallet;
