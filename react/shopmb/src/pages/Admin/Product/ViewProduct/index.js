import { useState, useRef, useEffect } from 'react';
import FadeIn from '../../../../components/FadeIn';
import ViewInfo from './ViewInfo';
import ViewDes from './ViewDes';
import styles from './ViewProduct.module.css';
function ViewProduct({ showModal, data }) {
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
                    <h4>Thông tin sản phẩm</h4>
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
                            Thông tin
                        </li>
                        <li
                            ref={indexLi === 2 ? liRef : undefined}
                            className={indexLi === 2 ? styles.active : ''}
                            onClick={() => {
                                changeIndexLi(2);
                            }}
                        >
                            Mô tả
                        </li>
                    </ul>
                    <div className={styles.line} style={{ left, width }}></div>
                </div>
                {indexLi === 1 && <ViewInfo data={data} />}
                {indexLi === 2 && <ViewDes data={data} />}
            </div>
        </FadeIn>
    );
}

export default ViewProduct;
