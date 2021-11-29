import { mergeClasses } from '@/utils';
import { ReactElement, ReactNode, useMemo, useState } from 'react';
import styles from '@/styles/components/load-mask.m.less';
import { useEffectIn } from '@hooks';
import Image from './LocalImage';
interface LoadMaskProps {
    loading: boolean;
    children?: ReactNode | ReactNode[];
    mode?: 'show' | 'hide' | 'opacity';
    className?: string;
}
const LoadMask = (props: LoadMaskProps): ReactElement => {
    const { loading, children, mode = 'show', className } = props;
    const __fullMasking = children === undefined;
    const [loaded, setLoaded] = useState(false);

    useEffectIn(loading, false, () => {
        const __it = setTimeout(() => setLoaded(true), 500);
        return () => clearTimeout(__it);
    });
    useEffectIn(loading, true, () => setLoaded(false));
    const __content = useMemo(() => {
        if (!loading || mode === 'show') {
            return children;
        }
        if (mode === 'hide') {
            return <></>;
        }
        return <div className={styles['opacity']}>{children}</div>;
    }, [mode, loading]);

    return (
        <div className={mergeClasses(__fullMasking ? styles['full-masking'] : '', styles['load-mask'], className ? className : '', styles[loading ? 'loading' : 'loaded'], !loading && !loaded ? styles['animate'] : '')}>
            {__content}
            {!loaded ? (
                <div className={styles['masking']}>
                    <Image dir="/images" name="logo" type="svg" width="50" height="50" />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default LoadMask;
