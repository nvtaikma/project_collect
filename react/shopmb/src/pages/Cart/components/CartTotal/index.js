import { formatNumber } from '../../../../hooks/useFormat';
import Button from '../../../../components/Button';
import style from './cartTotal.module.css';
function CartTotal({ listCart }) {
    return (
        <div className={style.cart_total}>
            <div className={style.cart_total_right}>
                <div className={style.discount_code}>
                    <input type="text" />
                    <Button blue>Áp dụng</Button>
                </div>
                <div className={style.cart_total_item}>
                    <span>Tổng tiền:</span>
                    <span>{formatNumber(listCart.totalPrice)}₫</span>
                </div>
                <div className={style.cart_total_item}>
                    <span>Giảm:</span>
                    <span>0₫</span>
                </div>
                <div className={style.cart_total_item}>
                    <span>Cần thanh toán:</span>
                    <strong>{formatNumber(listCart.totalPrice)}₫</strong>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
