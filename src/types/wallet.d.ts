declare interface TransactionItem {
    txId: string;
    amount: string;
    state: TransactionState;
    time: number;
}
declare interface WalletModel {
    chainId: number;
    address: string;
    connected: boolean;
    connector?: AbstractConnector;
    type?: WalletType;
    chain?: WalletChain;
}

declare interface WalletTransactionModel extends WalletModel {
    transactions: TransactionItem[];
    trading: boolean;
    openModal: number;
    loadBoxIds: number[];
    loadBoxCounter: number;
    castBoxId: number;
}

declare interface UseWalletMoel extends WalletModel {
    openModal: () => void;
}

declare interface WalletConnectorProps {
    cancel: () => void;
}

declare interface WalletImperativeHandle {
    linkTo: () => void;
    unlink: () => void;
}

declare interface WalletConnectorImperativeHandle extends WalletImperativeHandle {
    tryLink: () => void;
    validator: (wallet: WalletModel, success: () => void, fail: (error: any) => void) => void;
}

declare interface WalletConnectorComponent {
    name: string;
    link: string;
    type: WalletType;
    connector: AbstractConnector | (() => AbstractConnector);
}

declare interface WalletChain {
    chainId: number;
    name: string;
    explorer: string;
    env: 'PRODUCTION' | 'TEST';
    rpcUrl: string;
    confirm: number;
}
