import LoadingSkeleton from '../../../components/LoadingSkeleton';
import styles from './Order.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.orders_list}>
                    <div className={styles.order_top}>
                        <div className={styles.order_top_item}>
                            <LoadingSkeleton height="18px" style={{ maxWidth: '150px' }} />
                        </div>
                        <div className={styles.order_top_item}>
                            <LoadingSkeleton height="18px" style={{ maxWidth: '100px' }} />
                        </div>
                        <div className={styles.order_top_item}>
                            <LoadingSkeleton height="18px" />
                        </div>
                    </div>
                    <div className={styles.order_info}>
                        <div className={styles.order_info_item}>
                            <LoadingSkeleton
                                width="80px"
                                height="80px"
                                style={{ marginRight: '5px', marginBottom: '5px' }}
                            />
                            <LoadingSkeleton height="36px" />
                        </div>
                        <div className={styles.order_info_item}>
                            <LoadingSkeleton />
                        </div>
                        <div className={styles.order_info_item}>
                            <LoadingSkeleton />
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;
