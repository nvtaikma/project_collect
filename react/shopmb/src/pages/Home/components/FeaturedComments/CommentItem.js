import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatTimestamp, renderAvt } from '../../../../hooks/useFormat';
import styles from './FeaturedComments.module.css';
function CommentItem({ data }) {
    const user = useSelector((state) => state.user);
    const arrLikes = user.likeComments ? JSON.parse(user.likeComments) : [];
    const arrDislikes = user.dislikeComments ? JSON.parse(user.dislikeComments) : [];
    const [like, setLike] = useState(false);
    const [dislike, setdislike] = useState(false);
    useEffect(() => {
        const checkLike = arrLikes.filter((item) => item === data.id);
        checkLike.length > 0 && setLike(true);
        const checkDislikes = arrDislikes.filter((item) => item === data.id);
        checkDislikes.length > 0 && setdislike(true);
    }, []);
    return (
        <div className={styles.info}>
            <div className={styles.avt}>
                <img src={renderAvt(data.user_avt)} alt="" />
            </div>
            <div className={styles.info_right}>
                <div className={styles.item}>
                    <strong>{data.user_name}</strong>
                    {data.admin && <span className={styles.admin}>quản trị viên</span>}
                </div>
                <div className={styles.item}>
                    <span style={{ fontSize: '13px', color: '#9b9a9a' }}>{formatTimestamp(data.created)}</span>
                </div>
                <div className={styles.item}>
                    <span>{data.content}</span>
                </div>
                <div className={styles.item}>
                    <ul>
                        <li>
                            {like ? (
                                <i style={{ color: 'blue' }} className="fa-solid fa-thumbs-up"></i>
                            ) : (
                                <i className="fa-regular fa-thumbs-up"></i>
                            )}
                            {+data.likes > 0 && data.likes}
                        </li>
                        <li>
                            {dislike ? (
                                <i style={{ color: 'blue' }} className="fa-solid fa-thumbs-down"></i>
                            ) : (
                                <i className="fa-regular fa-thumbs-down"></i>
                            )}

                            {+data.dislikes > 0 && data.dislikes}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
