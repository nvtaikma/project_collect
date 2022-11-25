import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeToastMessage } from '../../../redux/actions/toastMessage';
import styles from './Item.module.css';
function ItemToastMessage({ id, type, message, onclick }) {
    let icon;
    let title;
    const toastRef = useRef();
    const dispatch = useDispatch();

    switch (type) {
        case 'success':
            icon = 'fa-solid fa-circle-check';
            title = 'Thành công !';
            break;
        case 'warning':
            icon = 'fa-solid fa-triangle-exclamation';
            title = 'Cảnh báo !';
            break;
        case 'error':
            icon = 'fa-solid fa-circle-exclamation';
            title = 'Thất bại !';
            break;
        default:
    }
    useEffect(() => {
        const timeId = setTimeout(() => {
            toastRef.current.classList.add(styles.close);
        }, 3500);
        return () => {
            clearTimeout(timeId);
        };
    }, []);
    useEffect(() => {
        const timeId = setTimeout(() => {
            dispatch(removeToastMessage(id));
        }, 5000);
        return () => {
            clearTimeout(timeId);
        };
    }, []);
    return (
        <div ref={toastRef} className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.icon}>
                <i className={icon}></i>
            </div>
            <div className={styles.text}>
                <div className={styles.title}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.content}>
                    <span>{message}</span>
                </div>
            </div>
            <div className={styles.close_message} onClick={onclick}>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <b className={styles.coutn_down}></b>
        </div>
    );
}

export default ItemToastMessage;
