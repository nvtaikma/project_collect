import { useContext } from 'react';
import { productProvider } from '../../../productProvider';
import Loading from './Loading';
import styles from './productTop.module.css';
function ProductTop({ loading }) {
    const productContext = useContext(productProvider);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={styles.title_top}>
                    <div className={styles.name_product}>
                        <h2>{productContext.name}</h2>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductTop;
