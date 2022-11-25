import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCart, updateCart } from '../../../../redux/actions/cart';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import { formatNumber } from '../../../../hooks/useFormat';
import Button from '../../../../components/Button';
import styles from './cartBody.module.css';

function CardBody({ product }) {
    const dispatch = useDispatch();
    const clickMinus = () => {
        if (product.qty > 1) {
            const payload = { id: product.id, qty: product.qty - 1 };
            dispatch(updateCart(payload));
        }
    };
    const clickPlus = () => {
        const payload = { id: product.id, qty: product.qty + 1 };
        dispatch(updateCart(payload));
    };
    const deleteItemCart = (id) => {
        dispatch(deleteCart(id));
        dispatch(addToastMessage('success', 'Xoá giỏ hàng thành công!'));
    };
    return (
        <div className={styles.cart_body}>
            <div className={styles.product_img}>
                <Link to={`/product/${product.idProduct}`}>
                    <img src={`${process.env.REACT_APP_API_URL}/assets/products/${product.img}`} alt="" />
                </Link>
            </div>
            <div className={styles.cart_info}>
                <div className={styles.name}>
                    <Link to={`/product/${product.idProduct}`}>
                        <span>{product.name}</span>
                    </Link>
                </div>
                <p style={{ color: 'blue' }}>Phiên bản: {product.ver}</p>
                <p style={{ color: '#f167c9' }}>Màu sắc: {product.color}</p>
                {product.sale > 0 && <input type="text" value={`khuyến mãi giảm ${product.sale}%`} readOnly />}
                <ul>
                    {product.promotions.map((promotion, index) => {
                        return <li key={index}>{promotion}</li>;
                    })}
                </ul>
            </div>
            <div className={styles.cart_qty}>
                <div className={styles.boxQty}>
                    <div className={styles.cart_qty_wrap}>
                        <div className={styles.minus}>
                            <Button small onClick={clickMinus}>
                                -
                            </Button>
                        </div>
                        <input type="text" name="" id="" value={product.qty} readOnly />
                        <div className={styles.plus}>
                            <Button small onClick={clickPlus}>
                                +
                            </Button>
                        </div>
                    </div>
                    <div className={styles.cart_qty_remove}>
                        <Button
                            small
                            transparent
                            onClick={() => {
                                deleteItemCart(product.id);
                            }}
                        >
                            <i className="fa-solid fa-trash-can"></i> xóa
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.cart_price}>
                <span>{formatNumber(product.qty * (product.price - product.price * (product.sale / 100)))} ₫</span>
                {product.sale > 0 && <s>{formatNumber(product.qty * product.price)} ₫</s>}
            </div>
        </div>
    );
}

export default CardBody;
