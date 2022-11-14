import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../hooks/useFormat';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions/user';
import { addCart } from '../../../redux/actions/cart';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import userApi from '../../../api/user/userApi';

import Button from '../../Button';
import styles from './product.module.css';

function Product({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [likeProduct, setLikeProduct] = useState(false);
    useEffect(() => {
        if (user.likeProducts) {
            const arrLikeProducts = JSON.parse(user.likeProducts);
            const newArr = arrLikeProducts.filter((item) => {
                return item === data.id;
            });
            setLikeProduct(newArr.length > 0);
        }
    }, []);
    const clickAddCart = () => {
        const vers = JSON.parse(data.versions);
        const colors = JSON.parse(data.colors);
        const payload = {
            idProduct: data.id,
            name: data.name,
            price: data.price,
            sale: data.sale,
            img: data.img,
            ver: vers[0],
            color: colors[0],
            qty: 1,
        };
        dispatch(addCart(payload));
        dispatch(addToastMessage('success', 'Thêm giỏ hàng thành công!'));
    };
    const likePro = async () => {
        try {
            setLikeProduct((prev) => !prev);
            const params = new FormData();
            params.append('user_id', user.id);
            params.append('pro_id', data.id);
            const res = await userApi.updateLikePro(params);
        } catch (error) {
            console.log(error);
        }
    };
    const handleLikePro = () => {
        const arrLikeProducts = user.likeProducts ?JSON.parse(user.likeProducts):[];
        !user.id && navigate('/dang_nhap');
        if (user.id && likeProduct) {
            const newArr = arrLikeProducts.filter((item) => item !== data.id);
            const toString = JSON.stringify(newArr);
            dispatch(updateUser({ likeProducts: toString }));
            likePro();
        }
        if (user.id && !likeProduct) {
            arrLikeProducts.push(data.id);
            const toString = JSON.stringify(arrLikeProducts);
            dispatch(updateUser({ likeProducts: toString }));
            likePro();
        }
    };
    return (
        <div className={styles.box}>
            <div className={styles.product}>
                {data.sale > 0 && (
                    <div className={styles.sale}>
                        <span>-{data.sale}%</span>
                    </div>
                )}
                <div className={styles.product_img}>
                    <Link to={`/product/${data.id}`}>
                        <img src={`${process.env.REACT_APP_API_URL}/assets/products/${data.img}`} alt="" />
                    </Link>
                </div>
                <div className={styles.product_rating}>
                    <ul>
                        {Array(5)
                            .fill(0)
                            .map((item, index) => {
                                return (
                                    <li key={index} className={index < data.star ? styles.rating : ''}>
                                        <i className="fa-solid fa-star"></i>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className={styles.product_name}>
                    <span>
                        <Link to={`/product/${data.id}`}>{data.name}</Link>
                    </span>
                </div>
                <div className={styles.product_price}>
                    <strong>
                        {data.sale > 0
                            ? formatNumber(data.price - data.price * (data.sale / 100))
                            : formatNumber(data.price)}
                        ₫
                    </strong>
                    {data.sale > 0 && <s>{formatNumber(data.price)}₫</s>}
                </div>
                <div className={styles.post_hover}>
                    <p>
                        <Button small colorRed={likeProduct} onClick={handleLikePro}>
                            <i className="fa-solid fa-heart"></i>
                        </Button>
                        <Button to={`/product/${data.id}`} small>
                            <i className="fa-solid fa-eye"></i>
                        </Button>
                        <Button small onClick={clickAddCart}>
                            <i className="fa-solid fa-cart-plus"></i>
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Product;
