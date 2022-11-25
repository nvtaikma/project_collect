import style from './service.module.css';
function Service() {
    return (
        <div className={style.serviceBlock}>
            <div className={`${style.service_container} container`}>
                <div className={style.service_area}>
                    <div className={style.service_item}>
                        <div className={style.service_icon}>
                            <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <div className={style.service_content}>
                            <div className={style.service_heading}>
                                <h4>Free Shipping</h4>
                            </div>
                            <div className={style.service_description}>
                                <span>Lorem Ipsum is simply</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.service_item}>
                        <div className={style.service_icon}>
                            <i className="fa-solid fa-phone-volume"></i>
                        </div>
                        <div className={style.service_content}>
                            <div className={style.service_heading}>
                                <h4>Online Support</h4>
                            </div>
                            <div className={style.service_description}>
                                <span>Lorem Ipsum is simply</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.service_item}>
                        <div className={style.service_icon}>
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                        </div>
                        <div className={style.service_content}>
                            <div className={style.service_heading}>
                                <h4>Money Back</h4>
                            </div>
                            <div className={style.service_description}>
                                <span>Lorem Ipsum is simply</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.service_item}>
                        <div className={style.service_icon}>
                            <i className="fa-solid fa-gear"></i>
                        </div>
                        <div className={style.service_content}>
                            <div className={style.service_heading}>
                                <h4>Our Services</h4>
                            </div>
                            <div className={style.service_description}>
                                <span>Lorem Ipsum is simply</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
