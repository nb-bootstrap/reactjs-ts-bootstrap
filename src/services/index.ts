import { configureStore } from '@reduxjs/toolkit';
import combineReducers from './reducers';

const configureAppStore = () => {
    const store = configureStore({
        reducer: combineReducers(),
        middleware: (getDefaultMiddleware) => {
            if (process.env.NODE_ENV === `development`) {
                const { logger } = require(`redux-logger`);
                return getDefaultMiddleware({
                    serializableCheck: false
                }).concat(logger);
            }
            return getDefaultMiddleware({
                serializableCheck: false
            });
        }

    });
    return store;
};


export const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch