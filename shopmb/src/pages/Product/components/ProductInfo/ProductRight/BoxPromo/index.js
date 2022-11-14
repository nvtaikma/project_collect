import style from './boxPromo.module.css';
function BoxPromo() {
    return (
        <div className={style.boxPromo}>
            <div className={style.title}>Ưu đãi thêm</div>
            <ul>
                <li>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className={style.des}>Sales Sốc chỉ còn 29.490.000 từ ngày 26/06 đến 30/06</div>
                </li>
                <li>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className={style.des}>Bảo hành 2 năm chính hãng</div>
                </li>
                <li>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className={style.des}>
                        Giảm 50% eSIM MobiFone Big Data 1T - 6GB/ ngày - miễn phí tháng đầu - giá chỉ 165.000đ
                    </div>
                </li>
                <li>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className={style.des}>
                        Giảm 50% eSIM MobiFone Triệu Phú Data 1T - 2.5GB/ ngày - miễn phí tháng đầu - giá chỉ 135.000đ
                    </div>
                </li>
                <li>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className={style.des}>Thu cũ đổi mới trợ giá 15%</div>
                </li>
                <li>
                    <i className="fa-solid fa-circle-check"></i>
                    <div className={style.des}>Tặng gói iCloud 50GB miễn phí 3 tháng </div>
                </li>
            </ul>
        </div>
    );
}

export default BoxPromo;
