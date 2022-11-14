import LoadingSkeleton from '../LoadingSkeleton';
import styles from './Product/product.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div key={index} className={styles.product}>
                    <div className={styles.product_img}>
                        <LoadingSkeleton height="250px" />
                    </div>
                    <div className={styles.product_rating}>
                        <ul>
                            <LoadingSkeleton width="40%" height="15px" />
                        </ul>
                    </div>
                    <div className={styles.product_name}>
                        <LoadingSkeleton width="80%" height="40px" />
                    </div>
                    <div className={styles.product_price}>
                        <LoadingSkeleton width="50%" height="18px" />
                    </div>
                </div>
            );
        });
}

export default Loading;
