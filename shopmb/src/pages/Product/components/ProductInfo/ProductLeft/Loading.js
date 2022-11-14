import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './productLeft.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.product_left}>
                    <div className={styles.wapper}>
                        <div className={styles.widthImg} style={{ width: '100%', height: '100%' }}>
                            <LoadingSkeleton />
                        </div>
                    </div>
                    <div className={styles.additional_carousel}>
                        <div className={styles.slider_wrapper_outer}>
                            <div className={styles.slider_wrapper}>
                                <div className={styles.silder_item}>
                                    <LoadingSkeleton />
                                </div>
                                <div className={styles.silder_item}>
                                    <LoadingSkeleton />
                                </div>
                                <div className={styles.silder_item}>
                                    <LoadingSkeleton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
}

export default Loading;
