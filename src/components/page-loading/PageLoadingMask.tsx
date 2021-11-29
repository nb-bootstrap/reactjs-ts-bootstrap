import { ReactElement, useEffect, useState } from 'react';
import { REDUCER_NAME, PageLoadedModel } from '@reducers/page-loaded';
import { useCombineSelector } from '@/services';
import LoadMask from '../LoadMask';
import PageLoadingBar from './PageLoadingBar';

const PageLoadingMask = (): ReactElement => {
    const [loading, setLoading] = useState(false);
    const counter = useCombineSelector<PageLoadedModel>(REDUCER_NAME, (state) => state.pageLoading);
    useEffect(() => setLoading(counter > 0), [counter]);
    return (
        <div>
            <LoadMask loading={loading} mode="hide" />
            <PageLoadingBar loading={loading} />
        </div>
    );
};

export default PageLoadingMask;
