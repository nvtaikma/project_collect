import { useSelector, useDispatch } from 'react-redux';
import { removeToastMessage } from '../../redux/actions/toastMessage';
import ItemToastMessage from './Item';
import styles from './ToastMessage.module.css';
function ToastMessage() {
    const listToastMessage = useSelector((state) => state.toastMessage);
    const dispatch = useDispatch();
    const handleRemove = (id) => {
        dispatch(removeToastMessage(id));
    };
    return (
        <div className={styles.toast}>
            {listToastMessage.length > 0 &&
                listToastMessage.map((item) => {
                    return (
                        <ItemToastMessage
                            key={item.id}
                            id={item.id}
                            type={item.type}
                            message={item.message}
                            onclick={() => {
                                handleRemove(item.id);
                            }}
                        />
                    );
                })}
        </div>
    );
}

export default ToastMessage;
