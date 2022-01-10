import { ReactElement, ReactNode } from 'react';
import { store } from '@/services';
import { I18nextProvider } from 'react-i18next';
import PageLoadingMask from '@/components/page-loading/PageLoadingMask';
import WalletProvider from '@/components/wallet/WalletProvider';
import i18n from '@/i18n';
import { Provider } from 'react-redux';
const ContextProvider = ({ children }: { children: ReactNode[] | ReactNode }): ReactElement => {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <WalletProvider>
                    {children}
                    <PageLoadingMask />
                </WalletProvider>
            </Provider>
        </I18nextProvider>
    );
};

export default ContextProvider;
