import style from './partners.module.css';

import partners1 from '../../../../assets/images/partners/partners1.png';
import partners2 from '../../../../assets/images/partners/partners2.png';
import partners3 from '../../../../assets/images/partners/partners3.png';
import partners4 from '../../../../assets/images/partners/partners4.png';
import partners5 from '../../../../assets/images/partners/partners5.png';
function Partners() {
    return (
        <div className="container">
            <div className={style.box}>
                <div className={style.list_partners}>
                    <div className={style.partners}>
                        <img src={partners1} alt="" />
                    </div>
                    <div className={style.partners}>
                        <img src={partners2} alt="" />
                    </div>
                    <div className={style.partners}>
                        <img src={partners3} alt="" />
                    </div>
                    <div className={style.partners}>
                        <img src={partners4} alt="" />
                    </div>
                    <div className={style.partners}>
                        <img src={partners5} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partners;
