import { ReactElement, useMemo } from 'react';
import { useDynamicImageImport } from '@hooks';
import { mergeClasses } from '@utils';
const images = require.context('@/assets', true);
const loadImage = (imageName: string) => images(`.${imageName}`).default;

interface LocalImageProps {
    dir?: string;
    type?: 'jpg' | 'jpeg' | 'gif' | 'png' | 'svg';
    name: string;
    width?: string | number;
    height?: string | number;
    s2x?: boolean;
    s3x?: boolean;
    onCompleted?: (name: string, ImageIcon: React.FC<React.SVGProps<SVGSVGElement> | React.ImgHTMLAttributes<HTMLImageElement>> | undefined) => void;
    onError?: (err: Error) => void;
    className?: string;
    [key: string]: any;
}

const LocalImage = ({ s2x = true, s3x = false, name, dir, type, onCompleted, onError, width, height, className, ...rest }: LocalImageProps): ReactElement => {
    const _type = !type ? 'svg' : type;
    const _dir = (_type == 'svg' ? '/svg' : '/images') + (!dir ? '' : dir.startsWith('/') ? dir : '/' + dir);
    const __srcset = useMemo(() => {
        const __list = [`${loadImage(`.${dir}/${name}.${type}`)} 1x`];
        if (type == 'svg') {
            return __list;
        }
        if (s2x) {
            __list.push(`${loadImage(`.${dir}/${name}@2x.${type}`)} 2x`);
        }
        if (s3x) {
            __list.push(`${loadImage(`.${dir}/${name}@3x.${type}`)} 3x`);
        }
        return __list;
    }, [s2x, s3x, type]);
    const { error, loading, Image } = useDynamicImageImport(name, _dir, _type, {
        onCompleted,
        onError,
    });
    if (error) {
        return (
            <span className={mergeClasses('boot-local-image', className || '')} style={{ width: width, height: height }}>
                {error.message}
            </span>
        );
    }
    if (loading) {
        return <span className={mergeClasses('boot-local-image loading', className || '')} style={{ width: width, height: height }} {...rest} />;
    }
    return <img className={mergeClasses('boot-local-image', className || '')} srcSet={__srcset.join(',')} src={Image} width={width} height={height} {...rest} />;
};

export default LocalImage;
