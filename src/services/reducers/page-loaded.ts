import { createSlice } from '@reduxjs/toolkit';
export const REDUCER_NAME = 'page-loaded';

export interface PageLoadedModel {
    pageLoading: number; // 加载中的数量
}

// 初始化
const contextSlice = createSlice({
    name: REDUCER_NAME,
    initialState: {
        pageLoading: 0,
    } as PageLoadedModel,
    reducers: {
        addPageLoading: (state) => {
            state.pageLoading++;
        },
        removePageLoaded: (state) => {
            state.pageLoading--;
        },
    },
});

// 导出 reducer
export const { addPageLoading, removePageLoaded } = contextSlice.actions;
export default contextSlice.reducer;
