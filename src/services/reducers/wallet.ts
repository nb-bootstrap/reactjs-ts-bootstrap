import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DEFAULT_CHAIN } from '@/config/constants';

export const REDUCER_NAME = 'wallet';

export enum WalletType {
    METAMASK = 'METAMASK',
    WALLET_CONNECTOR = 'WALLET_CONNECTOR',
}

export enum TransactionState {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
}

const walletSlice = createSlice({
    name: REDUCER_NAME,
    initialState: {
        address: '',
        chainId: -1,
        openModal: 0,
        connected: false,
        trading: false,
        transactions: [],
        loadBoxIds: [],
        loadBoxCounter: 0,
        libary: undefined,
        castBoxId: -1,
    } as WalletTransactionModel,
    reducers: {
        link: (state, action: PayloadAction<WalletModel>) => {
            state.address = action.payload.address;
            state.chainId = action.payload.chainId;
            state.type = action.payload.type;
            state.connected = true;
            state.connector = action.payload.connector;
            state.chain = Object.assign({}, DEFAULT_CHAIN);
        },
        unlink: (state) => {
            state.address = '';
            state.chainId = -1;
            state.type = undefined;
            state.connected = false;
            state.chain = undefined;
        },
        openModal: (state) => {
            state.openModal++;
        },
        setTrading: (state, action: PayloadAction<boolean>) => {
            state.trading = action.payload;
        },
        addTransaction: (state, action: PayloadAction<TransactionItem>) => {
            state.transactions.push(action.payload);
        },
        addreLoadBoxId: (state, action: PayloadAction<number>) => {
            state.loadBoxIds.push(action.payload);
        },
        forceReloadMyNft: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload) {
                state.loadBoxIds.splice(state.loadBoxIds.indexOf(action.payload), 1);
            }
            state.loadBoxCounter++;
        },
        completeTransaction: (state, action: PayloadAction<[string, TransactionState]>) => {
            const __item = _.find(state.transactions, { txId: action.payload[0] });
            if (__item === undefined) {
                return;
            }
            __item.state = action.payload[1];
        },
        castBoxId: (state, action: PayloadAction<number>) => {
            state.castBoxId = action.payload;
        },
    },
});

export const { castBoxId, link, unlink, setTrading, addTransaction, openModal, completeTransaction, forceReloadMyNft, addreLoadBoxId } = walletSlice.actions;
export default walletSlice.reducer;
