import { useState, useEffect, useRef } from 'react';
import commentApi from '../../../../api/comment/commentApi';
import CommentItem from './CommentItem';
import Loading from './Loading';
import Button from '../../../../components/Button';
import styles from './FeaturedComments.module.css';
function FeaturedComments() {
    const containerRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    const [indexSlider, setIndexSlider] = useState(0);
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [listComments, setListComments] = useState([]);
    const [payload, setPayload] = useState({
        limit: 6,
    });
    useEffect(() => {
        const getComments = async () => {
            setLoading(true);
            const res = await commentApi.getCommentsLike(payload);
            setListComments(res);
            setLoading(false);
        };
        getComments();
    }, []);
    useEffect(() => {
        window.innerWidth > 1024 && setNumber(3);
        window.innerWidth >= 700 && window.innerWidth <= 1024 && setNumber(2);
        window.innerWidth < 700 && setNumber(1);
    }, [window.innerWidth]);
    useEffect(() => {
        if (containerRef.current) {
            setClientWidth(containerRef.current.clientWidth / number);
        }
    }, [number]);
    useEffect(() => {
        const timerId = setInterval(() => {
            next();
        }, 3000);
        return () => clearInterval(timerId);
    }, [indexSlider, listComments, number, clientWidth]);

    const prev = () => {
        if (indexSlider <= 0) {
            setIndexSlider(listComments.length - number);
        } else {
            setIndexSlider(indexSlider - 1);
        }
    };
    const next = () => {
        if (indexSlider >= listComments.length - number) {
            setIndexSlider(0);
        } else {
            setIndexSlider(indexSlider + 1);
        }
    };
    return (
        <div className={styles.box}>
            <div ref={containerRef} className={`container ${styles.wapper}`}>
                <div className={styles.title}>
                    <h3>Bình luận nổi bật nhất</h3>
                </div>
                <div className={styles.content}>
                    {loading ? (
                        <Loading count={number} />
                    ) : (
                        <div
                            className={styles.slider}
                            style={{ transform: `translateX(-${indexSlider * clientWidth}px)` }}
                        >
                            {listComments.length > 0 &&
                                listComments.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            style={{ width: `${clientWidth}px` }}
                                            className={styles.comment}
                                        >
                                            <CommentItem data={item} />
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                {!loading && (
                    <>
                        <div className={styles.prev}>
                            <Button circle1 small1 onClick={prev}>
                                <i className="fa-solid fa-angle-left"></i>
                            </Button>
                        </div>
                        <div className={styles.next}>
                            <Button circle1 small1 onClick={next}>
                                <i className="fa-solid fa-angle-right"></i>
                            </Button>
                        </div>
                    </>
                )}

                {!loading && (
                    <div className={styles.dots}>
                        {listComments.length > 0 &&
                            listComments.map((item, index) => {
                                if (index <= listComments.length - number) {
                                    return (
                                        <span
                                            key={index}
                                            className={`${styles.dot} ${index === indexSlider ? styles.active : ''}`}
                                            onClick={() => {
                                                setIndexSlider(index);
                                            }}
                                        ></span>
                                    );
                                }
                            })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeaturedComments;
