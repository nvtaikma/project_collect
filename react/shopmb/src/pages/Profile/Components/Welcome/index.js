import { useSelector } from 'react-redux';
import styles from './Welcome.module.css';
function Welcome() {
    const user = useSelector((state) => state.user);
    return (
        <div className={styles.welcome}>
            <div className={styles.text}>
                <h3>Xin chào bạn, {user.name}</h3>
                <p>
                    Cảm ơn bạn đã quan tâm đến <strong>ShopMB</strong>. Bạn sẽ được hưởng quyền lợi giá cả, quà tặng,
                    các dịch vụ đi kèm và nhiều hơn nữa.
                </p>
                <p>Bắt đầu trải nghiệm nào!</p>
            </div>
        </div>
    );
}

export default Welcome;
