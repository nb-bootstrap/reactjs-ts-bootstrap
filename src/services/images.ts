import { useRef, useState } from 'react';
import { useAsyncEffect } from './hooks';
export const useDynamicImageImport = (name: string, dir: string, type: string, options: UseDynamicImageImportOptions = {}): { error: Error | undefined; loading: boolean; Image: any } => {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined as undefined | Error);
    const [content, setContent] = useState('' as any);
    const { onCompleted, onError } = options;
    useAsyncEffect(
        async () => {
            setError(undefined);
            setLoading(true);
            return import(`@/assets${dir.startsWith('/') ? dir : '/' + dir}/${name}.${type}`);
        },
        (imageData) => {
            if (onCompleted) {
                onCompleted(name, ImportedIconRef.current);
            }
            setContent(imageData?.default);
        },
        [name, type, dir],
        {
            error: (e) => {
                setError(e);
                onError && onError(e);
            },
            finally: () => setLoading(false),
        }
    );

    return { error, loading, Image: content as any };
};
