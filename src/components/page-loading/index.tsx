import { ReactElement, useEffect } from 'react';
import { addPageLoading, removePageLoaded } from '@reducers/page-loaded';
import { useAppDispatch } from '@/services';
const PageLoading = (): ReactElement => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(addPageLoading());
        return () => void dispatch(removePageLoaded());
    }, []);
    return <></>;
};

export default PageLoading;
