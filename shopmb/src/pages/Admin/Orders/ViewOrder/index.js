import { useState, useEffect, useRef } from 'react';
import InfoMember from './InfoMember';
import InfoOrder from './InfoOrder';
import FadeIn from '../../../../components/FadeIn';
import styles from './ViewOrder.module.css';
function ViewOrder({ data, showModal }) {
    const liRef = useRef();
    const [indexLi, setIndexLi] = useState(1);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setLeft(liRef.current.offsetLeft);
        setWidth(liRef.current.offsetWidth);
    }, [indexLi]);
    const changeIndexLi = (id) => {
        setIndexLi(id);
    };
    return (
        <FadeIn>
            <div className={styles.box}>
                <div className={styles.title}>
                    <h4>Thông tin đơn hàng</h4>
                    <div className={styles.icon} onClick={() => showModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className={styles.nav_tab}>
                    <ul>
                        <li
                            ref={indexLi === 1 ? liRef : undefined}
                            className={indexLi === 1 ? styles.active : ''}
                            onClick={() => {
                                changeIndexLi(1);
                            }}
                        >
                            Thông tin khách hàng
                        </li>
                        <li
                            ref={indexLi === 2 ? liRef : undefined}
                            className={indexLi === 2 ? styles.active : ''}
                            onClick={() => {
                                changeIndexLi(2);
                            }}
                        >
                            Thông tin đơn hàng
                        </li>
                    </ul>
                    <div className={styles.line} style={{ left, width }}></div>
                </div>
                <div className={`${styles.content} custom-scrollbars`}>
                    {indexLi === 1 && <InfoMember data={data} />}
                    {indexLi === 2 && <InfoOrder data={data} />}
                </div>
            </div>
        </FadeIn>
    );
}

export default ViewOrder;
