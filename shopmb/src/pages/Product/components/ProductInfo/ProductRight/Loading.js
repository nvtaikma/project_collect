import LoadingSkeleton from '../../../../../components/LoadingSkeleton';
import styles from './productRight.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.product_right}>
                    <div className={styles.product_price}>
                        <LoadingSkeleton width="120px" height="44px" />
                    </div>
                    <div className={styles.status_product}>
                        <LoadingSkeleton width="70%" height="18px" />
                    </div>
                    <div className={styles.product_quantily}>
                        <LoadingSkeleton width="170px" height="20px" />
                    </div>
                    <div className={styles.product_quantily}>
                        <LoadingSkeleton width="220px" height="50px" />
                    </div>
                    <div className={styles.product_quantily}>
                        <LoadingSkeleton width="220px" height="50px" />
                    </div>
                    <div className={styles.product_quantily}>
                        <LoadingSkeleton height="263px" />
                    </div>
                    <div className={styles.btn}>
                        <LoadingSkeleton />
                    </div>
                </div>
            );
        });
}

export default Loading;
