import { useState, useEffect, useRef } from 'react';
import LoadingSkeleton from '../../../../components/LoadingSkeleton';
import styles from './FeaturedComments.module.css';
function Loading({ count = 1 }) {
    const containerRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        if (containerRef.current) {
            setClientWidth(containerRef.current.clientWidth / count);
        }
    }, []);
    return (
        <div ref={containerRef} className={styles.slider} style={{ width: '100%' }}>
            {Array(count)
                .fill(0)
                .map((item, index) => {
                    return (
                        <div key={index} className={styles.comment} style={{ width: `${clientWidth}px` }}>
                            <div className={styles.info}>
                                <div className={styles.avt}>
                                    <LoadingSkeleton circle width="60px" height="60px" />
                                </div>
                                <div className={styles.info_right}>
                                    <div className={styles.item}>
                                        <LoadingSkeleton width="100px" height="18px" />
                                    </div>
                                    <div className={styles.item}>
                                        <LoadingSkeleton width="80px" height="18px" />
                                    </div>
                                    <div className={styles.item}>
                                        <LoadingSkeleton width="80%" height="38px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Loading;
