import { useEffect, useRef, useState } from 'react';
import bannerApi from '../../../../api/banner/bannerApi';
import Button from '../../../../components/Button';
import LoadingSkeleton from '../../../../components/LoadingSkeleton';
import styles from './slider.module.css';
function Slider() {
    const imgRef = useRef();
    const [indexSlider, setIndexSlider] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [listBanner, setListBanner] = useState([]);
    const [payload, setPayload] = useState({
        status: '0',
    });
    useEffect(() => {
        const getBanner = async () => {
            setLoading(true);
            const res = await bannerApi.get(payload);
            setListBanner(res[0].data);
            setLoading(false);
        };
        getBanner();
    }, [payload]);
    useEffect(() => {
        if (imgRef.current) {
            setClientWidth(imgRef.current.clientWidth);
        }
    }, [imgRef.current]);
    useEffect(() => {
        const timerId = setInterval(() => {
            next();
        }, 4000);
        return () => clearInterval(timerId);
    }, [indexSlider, listBanner]);
    const prev = () => {
        if (indexSlider <= 0) {
            setIndexSlider(listBanner.length - 1);
        } else {
            setIndexSlider(indexSlider - 1);
        }
    };
    const next = () => {
        if (indexSlider >= listBanner.length - 1) {
            setIndexSlider(0);
        } else {
            setIndexSlider(indexSlider + 1);
        }
    };
    const handleClick = (index) => {
        setIndexSlider(index);
    };

    return (
        <div className={`${styles.slider} container`}>
            {loading ? (
                <LoadingSkeleton />
            ) : (
                <>
                    <div ref={imgRef} style={{ width: '100%', height: '100%' }}>
                        <div
                            className={`${styles.wrap_picture}`}
                            style={{ transform: `translateX(-${indexSlider * clientWidth}px)` }}
                        >
                            {listBanner.length > 0 &&
                                listBanner.map((item) => {
                                    return (
                                        <div key={item.id} className={styles.img} style={{ width: clientWidth }}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/assets/banner/${item.img}`}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={styles.dots}>
                        {listBanner.length > 0 &&
                            listBanner.map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`${styles.dot} ${indexSlider === index ? styles.active : ''}`}
                                        onClick={() => {
                                            handleClick(index);
                                        }}
                                    ></div>
                                );
                            })}
                    </div>
                    <div className={`${styles.prev}`}>
                        <Button circle1 onClick={prev}>
                            <i className="fa-solid fa-angle-left"></i>
                        </Button>
                    </div>
                    <div className={`${styles.next}`}>
                        <Button circle1 onClick={next}>
                            <i className="fa-solid fa-angle-right"></i>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Slider;
