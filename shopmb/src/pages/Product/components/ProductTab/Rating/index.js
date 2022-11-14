import { useState, useContext, useEffect } from 'react';
import { productProvider } from '../../../productProvider';
import ratingApi from '../../../../../api/rating/ratingApi';

import Loading from './Loading';
import StartLine from './StarLine';
import FormRating from './FormRating';
import Comment from './Comment';
import Button from '../../../../../components/Button';

import styles from './rating.module.css';

function Rating() {
    const productContext = useContext(productProvider);
    const [statistical, setStatistical] = useState({});
    const [loadPage, setLoadPage] = useState(false);
    const [formRt, setFormRt] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getStatistical = async () => {
            try {
                setLoading(true);
                const payload = { pro_id: productContext.id };
                const res = await ratingApi.statistical(payload);
                console.log(res);
                setStatistical(res[0]);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getStatistical();
    }, [productContext.id, loadPage]);
    const showformRating = () => {
        setFormRt((prev) => !prev);
    };

    return (
        <>
            <div className={styles.rating}>
                <div className={styles.title}>
                    <h3>Đánh giá & Nhận xét {productContext.name} </h3>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div className={styles.review_star_rating}>
                        <div className={styles.start_rating_item}>
                            <h4>Đánh giá trung bình</h4>
                            <p>
                                {statistical.tbcRating ? statistical.tbcRating : ''}
                                <i className="fa-solid fa-star"></i>/5
                            </p>
                            <span>{statistical.totalRating ? statistical.totalRating : 0} đánh giá</span>
                        </div>
                        <div className={styles.star_line}>
                            <StartLine star="1" percent={statistical.tbcRating1s} />
                            <StartLine star="2" percent={statistical.tbcRating2s} />
                            <StartLine star="3" percent={statistical.tbcRating3s} />
                            <StartLine star="4" percent={statistical.tbcRating4s} />
                            <StartLine star="5" percent={statistical.tbcRating5s} />
                        </div>
                        <div className={styles.start_rating_item}>
                            <span>Bạn đã dùng sản phẩm này?</span>
                            <Button blue onClick={showformRating}>
                                Đánh giá sản phẩm
                            </Button>
                        </div>
                    </div>
                )}

                {formRt && <FormRating loading={loading} setLoadPage={setLoadPage} />}
                <Comment loadPage={loadPage} />
            </div>
        </>
    );
}

export default Rating;
