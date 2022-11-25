import style from './overlay.module.css';
import Button from '../../../../components/Button';
function Overlay({ image, close }) {
    return (
        <div className={style.overlay}>
            <div className={style.box_img}>
                <img src={image} alt="" />
                <Button transparent small onClick={close}>
                    <i className="fa-solid fa-xmark"></i>
                </Button>
            </div>
        </div>
    );
}

export default Overlay;
