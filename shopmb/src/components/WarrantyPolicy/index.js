import style from './warrantyPolicy.module.css';
import icon1 from '../../assets/images/icon/truck.png';
import icon2 from '../../assets/images/icon/guaranteed.png';
import icon3 from '../../assets/images/icon/share.png';
import icon4 from '../../assets/images/icon/like.png';
function WarrantyPolicy() {
    return (
        <div className="container">
            <div className={style.warranty_policy}>
                <div className={style.item}>
                    <div className={style.icon}>
                        <img src={icon1} alt="" />
                    </div>
                    <div className={style.title}>
                        <h4>Giao hàng trên toàn thế giới</h4>
                    </div>
                    <div className={style.description}>
                        <span>Vận chuyển trong 7 ngày ở mọi nơi trên thế giới!</span>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.icon}>
                        <img src={icon2} alt="" />
                    </div>
                    <div className={style.title}>
                        <h4>Đảm bảo sự hài lòng</h4>
                    </div>
                    <div className={style.description}>
                        <span>Chúng tôi đảm bảo sản phẩm chính hãng, chất lượng tốt.</span>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.icon}>
                        <img src={icon3} alt="" />
                    </div>
                    <div className={style.title}>
                        <h4>Trả hàng trong 30 ngày</h4>
                    </div>
                    <div className={style.description}>
                        <span>Miễn phí đổi trả trong 30 ngày đầu sử dụng sản phẩm</span>
                    </div>
                </div>
                <div className={style.item}>
                    <div className={style.icon}>
                        <img src={icon4} alt="" />
                    </div>
                    <div className={style.title}>
                        <h4>Hỗ trợ khách hàng 24/7</h4>
                    </div>
                    <div className={style.description}>
                        <span>Hỗ trợ khách hàng trên mọi phương tiện truyền thông xã hội khác!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarrantyPolicy;
