import { ReactElement, useEffect, useRef, useState } from 'react';
import styles from '@/styles/components/page-loading-bar.m.less';
import { mergeClasses } from '@/utils';
const PageLoadingBar = ({ loading }: { loading: boolean }): ReactElement => {
    const [__className, setClassName] = useState('loaded');
    const __current = useRef({ timer: undefined as undefined | NodeJS.Timer });
    useEffect(() => {
        __current.current.timer && clearTimeout(__current.current.timer);
        if (loading) {
            setClassName('loading');
        } else {
            setClassName('loaded');
            __current.current.timer = setTimeout(() => setClassName('finised'), 600);
        }
        return () => __current.current.timer && clearTimeout(__current.current.timer);
    }, [loading]);
    return (
        <div className={mergeClasses(styles['page-loading-bar'], styles[__className])}>
            <p className={styles['masking-' + __className]} />
        </div>
    );
};

export default PageLoadingBar;
