import { Link } from 'react-router-dom';
import Button from '../../../../components/Button';
import styles from './CardItem.module.css';
function CardItem({ title, count, to }) {
    return (
        <div className={styles.cardItem}>
            <div className={styles.item}>
                <span>{title}</span>
            </div>
            <div className={styles.item}>
                <strong>{count}</strong>
            </div>
            <div className={styles.item}>
                <Button to={to} blueAdmin>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
}

export default CardItem;
