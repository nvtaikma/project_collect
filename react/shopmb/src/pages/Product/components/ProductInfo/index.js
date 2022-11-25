import ProductTop from './ProductTop';
import ProductLeft from './ProductLeft';
import ProductRight from './ProductRight';
import styles from './productInfo.module.css';

function ProductInfo({ loading }) {
    return (
        <div className="container">
            <div className={`row ${styles.product_info}`}>
                <ProductTop loading={loading} />
                <div className={styles.info}>
                    <div className={styles.info_left}>
                        <ProductLeft loading={loading} />
                    </div>
                    <div className={styles.info_right}>
                        <ProductRight loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;
