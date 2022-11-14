import { useState } from 'react';
import FadeIn from '../../../../components/FadeIn';
import Button from '../../../../components/Button';
import Loading from './Loading';
import styles from './ModalConfirm.module.css';
function ModalConfirm({ showModal, confirm, text }) {
    const [isLoading, setLoading] = useState(false);
    const handleClick = async () => {
        try {
            setLoading(true);
            confirm();
            setLoading(false);
            showModal(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <FadeIn>
            {!isLoading ? (
                <div className={styles.wapper}>
                    <div className={styles.title}>
                        <h4>Xác nhận</h4>
                    </div>
                    <div
                        className={styles.close}
                        onClick={() => {
                            showModal(false);
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className={styles.text}>
                        <span>{text}</span>
                    </div>
                    <div className={styles.button}>
                        <Button
                            borderBlue
                            colorBlue
                            transparent
                            onClick={() => {
                                showModal(false);
                            }}
                        >
                            Từ chối
                        </Button>
                        <Button borderBlue colorBlue transparent onClick={handleClick}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.wapper}>
                    <div className={styles.title}>
                        <h4>Xác nhận</h4>
                    </div>
                    <div className={styles.close}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className={styles.text}>
                        <span>{text}</span>
                    </div>
                    <div className={styles.button_loading}>
                        <button style={{ cursor: 'default' }}>Từ chối</button>
                        <button style={{ cursor: 'default' }}>
                            Xác nhận <Loading />
                        </button>
                    </div>
                </div>
            )}
        </FadeIn>
    );
}

export default ModalConfirm;
