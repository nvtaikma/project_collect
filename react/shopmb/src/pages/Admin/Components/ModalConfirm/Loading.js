import styles from './ModalConfirm.module.css';
function Loading() {
    return (
        <div className={styles.ld_wapper}>
            <div className={styles.loading}>
                <span style={{ transform: 'rotate(calc(18deg * (3.3*1)' }}></span>
                <span style={{ transform: 'rotate(calc(18deg * (3.3*2)' }}></span>
                <span style={{ transform: 'rotate(calc(18deg * (3.3*3)' }}></span>
                <span style={{ transform: 'rotate(calc(18deg * (3.3*4)' }}></span>
                <span style={{ transform: 'rotate(calc(18deg * (3.3*5)' }}></span>
                <span style={{ transform: 'rotate(calc(18deg * (3.3*6)' }}></span>
            </div>
        </div>
    );
}

export default Loading;
