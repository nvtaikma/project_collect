import style from './cartTitle.module.css';
function CartTitle({ number }) {
    return (
        <div className={style.cart_title}>
            <h3>Bạn có {number} sản phẩm trong giỏ hàng </h3>
        </div>
    );
}

export default CartTitle;
