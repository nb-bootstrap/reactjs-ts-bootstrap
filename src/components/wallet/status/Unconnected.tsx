import { ReactElement } from 'react';
import Image from '@/components/Image';
import { WALLETS_CONNECTORS } from '../connectors';
import { iteratorTo } from '@/utils';
import styles from '@/styles/market/wallet.m.less';
import _ from 'lodash';
const Unconnected = ({ toLink }: { toLink: (name: string) => void }): ReactElement => {
    const __gotoConnect = (link: string) => {
        window.open(link, '_blank');
    };
    return iteratorTo(
        WALLETS_CONNECTORS,
        (items) => <div className={styles['unconnected-wallet']}>{items}</div>,
        (o) => {
            return (
                <div key={o.name}>
                    <p className={styles['icon']} onClick={() => (_.isEmpty(o.link) ? toLink(o.name) : __gotoConnect(o.link))}>
                        <Image width="90" s2x={false} dir="/images/marketplace/wallet" name={o.name} type="png" />
                    </p>
                    <p className={styles['text']}>{o.name}</p>
                    {/* <p className={styles['footer']}>
                        <Button type="primary" onClick={() => (_.isEmpty(o.link) ? toLink(o.name) : __gotoConnect(o.link))}>
                            {t(_.isEmpty(o.link) ? 'link-title' : 'how-to-install')}
                        </Button>
                    </p> */}
                </div>
            );
        }
    );
};
export default Unconnected;
