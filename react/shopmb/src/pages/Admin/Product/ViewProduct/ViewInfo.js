import { formatNumber } from '../../../../hooks/useFormat';
import styles from './ViewProduct.module.css';
function ViewInfo({ data }) {
    const versions = JSON.parse(data.versions);
    const colors = JSON.parse(data.colors);
    return (
        <div className={styles.info}>
            <div className={styles.left}>
                <div className={styles.img}>
                    <img src={`${process.env.REACT_APP_API_URL}/assets/products/${data.img}`} alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.item}>
                    <h3>{data.name}</h3>
                </div>
                <div className={styles.item}>
                    <strong>Thương hiệu:</strong>
                    <span>{data.brandName}</span>
                </div>
                <div className={styles.item}>
                    <strong>Dung lượng:</strong>
                    <ul>
                        {versions.map((item, index) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                </div>
                <div className={styles.item}>
                    <strong>Màu sắc:</strong>
                    <ul>
                        {colors.map((item, index) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                </div>
                <div className={styles.item}>
                    <strong>Giá tiền:</strong>
                    <span>{formatNumber(data.price)}₫</span>
                </div>
                <div className={styles.item}>
                    <strong>Số lượng hàng còn:</strong>
                    <span>{data.qty}</span>
                </div>
            </div>
        </div>
    );
}

export default ViewInfo;
