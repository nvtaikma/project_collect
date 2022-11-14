import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../../../../hooks/useFormat';
import productApi from '../../../../../../api/product/productApi';
import styles from './ProductSection.module.css';
function ProductSection({ data }) {
    const payload = {
        limit: 5,
        sold: 'max',
    };
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        const getProduct = async () => {
            const res = await productApi.get(payload);
            setListProduct(res[0].data);
        };
        getProduct();
    }, []);
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <h3>Sản phẩm bán chạy nhất</h3>
            </div>
            <div className={styles.content}>
                {listProduct.length > 0 &&
                    listProduct.map((item) => {
                        return (
                            <div key={item.id} className={styles.product_item}>
                                <div className={styles.img}>
                                    <Link to={`/product/${item.id}`}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/assets/products/${item.img}`}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className={styles.product_info}>
                                    <div className={styles.name_product}>
                                        <Link to={`/product/${item.id}`}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </div>
                                    <div className={styles.name_price}>
                                        <span className="txt-error">
                                            {formatNumber(item.price - item.price * (item.sale / 100))}₫
                                        </span>
                                        {+item.sale > 0 && <s>{formatNumber(item.price)}₫</s>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default ProductSection;
