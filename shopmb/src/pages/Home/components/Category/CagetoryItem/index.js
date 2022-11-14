import styles from './cagetoryItem.module.css';
function CagetoryItem({ img, name }) {
    return (
        <div className={styles.cagetory_item}>
            <div className={styles.cagetory_icon}>
                <img src={`${process.env.REACT_APP_API_URL}/assets/category/${img}`} alt="" />
            </div>
            <span className={styles.cagetory_name}>{name}</span>
        </div>
    );
}

export default CagetoryItem;
