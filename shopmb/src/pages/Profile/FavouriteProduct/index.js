import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userApi from '../../../api/user/userApi';
import { formatNumber } from '../../../hooks/useFormat';

import Title from '../Components/Title';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import styles from './FavouriteProduct.module.css';
function FavouriteProduct() {
    const user = useSelector((state) => state.user);
    const [maxItem, setMaxItem] = useState(0);
    const [listProducts, setListProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        userId: user.id,
        limit: 4,
        page: 1,
    });
    useEffect(() => {
        const getFavouriteProduct = async () => {
            setLoading(true);
            const res = await userApi.getFavouriteProducts(payload);
            setListProducts(res[0].data);
            setMaxItem(res[0].max);
            setLoading(false);
        };
        getFavouriteProduct();
    }, [payload]);
    return (
        <div className={styles.favourite_product}>
            <Title text={'Sản phẩm yêu thích '} textCount={`${maxItem} sản phẩm`} />
            <div className={styles.list_products}>
                {loading ? (
                    <Loading count={payload.limit} />
                ) : (
                    listProducts.length > 0 &&
                    listProducts.map((item) => {
                        return (
                            <div key={item.id} className={styles.list_products_item}>
                                <div className={styles.img}>
                                    <Link to={`/product/${item.id}`}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/assets/products/${item.img}`}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.name}>
                                        <Link to={`/product/${item.id}`}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </div>
                                    <div className={styles.price}>
                                        <strong className="txt-error">
                                            {formatNumber(item.price - item.price * (item.sale / 100))}₫
                                        </strong>
                                        {+item.sale > 0 && <s>9.990.000₫</s>}
                                    </div>
                                    <div className={styles.rating}>
                                        <ul>
                                            {Array(5)
                                                .fill(0)
                                                .map((item1, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className={index < item.star ? styles.active : ''}
                                                        >
                                                            <i className="fa-solid fa-star"></i>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {!loading && maxItem > payload.limit && (
                <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />
            )}
        </div>
    );
}

export default FavouriteProduct;
