import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ratingApi from '../../../api/rating/ratingApi';
import { formatTimestamp } from '../../../hooks/useFormat';

import Title from '../Components/Title';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import styles from './RatingProfile.module.css';
function RatingProfile() {
    const user = useSelector((state) => state.user);
    const [maxItem, setMaxItem] = useState(0);
    const [listRatings, setListRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        userId: user.id,
        limit: 4,
        page: 1,
    });
    useEffect(() => {
        const getFavouriteProduct = async () => {
            setLoading(true);
            const res = await ratingApi.getByIdUser(payload);
            setListRatings(res[0].data);
            setMaxItem(res[0].max);
            setLoading(false);
        };
        getFavouriteProduct();
    }, [payload]);
    return (
        <div className={styles.rating_profile}>
            <Title text={'Nhận xét của tôi '} textCount={`${maxItem} đánh giá`} />
            <div className={styles.list_ratings}>
                {loading ? (
                    <Loading count={payload.limit} />
                ) : (
                    listRatings.length > 0 &&
                    listRatings.map((item) => {
                        return (
                            <div key={item.id} className={styles.list_ratings_item}>
                                <div className={styles.img}>
                                    <Link to={`/product/${item.pro_id}`}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/assets/products/${item.pro_img}`}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.name}>
                                        <Link to={`/product/${item.pro_id}`}>
                                            <span>{item.pro_name}</span>
                                        </Link>
                                    </div>
                                    <div className={styles.rating}>
                                        <ul>
                                            {Array(5)
                                                .fill(0)
                                                .map((item1, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className={index < item.star ? styles.active : ''}
                                                        >
                                                            <i className="fa-solid fa-star"></i>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                        <span>{formatTimestamp(item.created)}</span>
                                    </div>

                                    <div className={styles.content}>
                                        <span>{item.content}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {!loading && maxItem > payload.limit && (
                <Pagination maxItem={maxItem} payload={payload} setPayload={setPayload} />
            )}
        </div>
    );
}

export default RatingProfile;
