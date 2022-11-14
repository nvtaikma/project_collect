import { useState } from 'react';
import Description from './Description';
import Rating from './Rating';
import styles from './productTab.module.css';
function ProductTab({ loading }) {
    const [show, setShow] = useState(true);
    const showClassActive = () => {
        if (!loading) {
            setShow((prev) => !prev);
        }
    };
    return (
        <>
            <div className={`${styles.product_tab} container`}>
                <div className={styles.nav_tab}>
                    <ul>
                        <li className={`${show && styles.active}`} onClick={showClassActive}>
                            Mô tả
                        </li>
                        <li className={`${!show && styles.active}`} onClick={showClassActive}>
                            Đánh giá
                        </li>
                    </ul>
                </div>
                {show ? <Description loading={loading} /> : <Rating />}
            </div>
        </>
    );
}

export default ProductTab;
