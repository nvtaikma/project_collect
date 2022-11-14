import FadeIn from '../../../../components/FadeIn';
import Button from '../../../../components/Button';
import style from './Modal.module.css';

function Modal({ title, type, children, onSubmit, onClick }) {
    return (
            <FadeIn >
                <div className={style.wapper}>
                    <div className={style.row}>
                        <div className={style.close}>
                            <Button small transparent onClick={onClick}>
                                <i className="fa-solid fa-xmark"></i>
                            </Button>
                        </div>
                        <div className={style.title}>
                            <span>{title}</span>
                        </div>
                        <div className={style.btn}>
                            {type === 'add' ? (
                                <Button blueAdmin icon={'fa-solid fa-plus'} onClick={onSubmit}>
                                    Thêm mới
                                </Button>
                            ) : (
                                <Button blueAdmin icon={'fa-solid fa-pen-to-square'} onClick={onSubmit}>
                                    Sửa
                                </Button>
                            )}
                        </div>
                        <div className={`${style.formContent} custom-scrollbars`}>{children}</div>
                    </div>
                </div>
           </FadeIn>
    );
}

export default Modal;
