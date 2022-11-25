import Button from '../../../../components/Button';
import logoCart from '../../../../assets/images/icon/cart.png';
import styles from './Empty.module.css';
function Empty() {
    return (
        <div className="container">
            <div className={styles.wapper}>
                <img src={logoCart} alt="" />
                <p>Không có sản phẩm nào trong giỏ hàng</p>
                <Button to={'/'} medium blue>
                    VỀ TRANG CHỦ
                </Button>
            </div>
        </div>
    );
}

export default Empty;
