import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import commentApi from '../../../api/comment/commentApi';
import { formatTimestamp } from '../../../hooks/useFormat';

import Title from '../Components/Title';
import Pagination from '../../../components/Pagination';
import Loading from './Loading';
import styles from './CommentsProfile.module.css';

function CommentsProfile() {
    const user = useSelector((state) => state.user);
    const [maxItem, setMaxItem] = useState(0);
    const [listComments, setListComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        userId: user.id,
        limit: 4,
        page: 1,
    });
    useEffect(() => {
        const getComments = async () => {
            setLoading(true);
            const res = await commentApi.getByIdUser(payload);
            setListComments(res[0].data);
            setMaxItem(res[0].max);
            setLoading(false);
        };
        getComments();
    }, [payload]);
    return (
        <div className={styles.comment_profile}>
            <Title text={'Bình luận của tôi '} textCount={`${maxItem} bình luận`} />
            <div className={styles.list_comments}>
                {loading ? (
                    <Loading count={payload.limit} />
                ) : (
                    listComments.length > 0 &&
                    listComments.map((item) => {
                        return (
                            <div key={item.id} className={styles.list_comments_item}>
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
                                    <div className={styles.created}>
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

export default CommentsProfile;
