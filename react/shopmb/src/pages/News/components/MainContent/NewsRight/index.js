import NewsSection from './NewsSection';
import ProductSection from './ProductSection';
import a from '../../../../../assets/images/product/iPhone_11_128GB.jpg';
import styles from './NewsRight.module.css';
function NewsRight() {
    return (
        <div className={styles.wapper}>
            <div className={styles.card}>
                <NewsSection />
            </div>
            <div className={styles.card}>
                <ProductSection />
            </div>
        </div>
    );
}

export default NewsRight;
