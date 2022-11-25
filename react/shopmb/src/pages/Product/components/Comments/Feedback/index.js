import { useState, useEffect, useContext, useRef } from 'react';
import { productProvider } from '../../../productProvider';
import { formatTimestamp, renderAvt } from '../../../../../hooks/useFormat';
import commentApi from '../../../../../api/comment/commentApi';

import Loading from '../../../../../components/Loading';
import Button from '../../../../../components/Button';
import styles from './Feedback.module.css';
function Feedback({ parentId }) {
    const productContext = useContext(productProvider);
    const commentRef = useRef();
    const [showfeedback, setShowFeedback] = useState(false);
    const [loading, setLoading] = useState(false);
    const [maxItem, setMaxItem] = useState(0);
    const [listComment, setListComment] = useState([]);
    const [payload, setPayload] = useState({
        pro_id: productContext.id,
        parent_id: parentId,
        limit: 3,
        page: 1,
    });
    useEffect(() => {
        const getComments = async () => {
            setLoading(true);
            const res = await commentApi.get(payload);
            payload.page === 1 ? setListComment(res[0].data) : setListComment([...listComment, ...res[0].data]);
            setMaxItem(res[0].max);
            setLoading(false);
        };
        getComments();
    }, [payload]);
    const handleScrollTop = () => {
        const timeoutId = setInterval(() => {
            document.documentElement.scrollTop -= 20;
            if (document.documentElement.scrollTop <= commentRef.current.offsetTop) {
                clearInterval(timeoutId);
            }
        }, 1);
    };

    const handleHideComments = () => {
        const newArr = listComment.filter((item, index) => {
            return index < payload.limit;
        });
        setListComment(newArr);
        setPayload({ ...payload, page: 1 });
        handleScrollTop();
    };
    return (
        <>
            {loading && !showfeedback ? (
                <Loading />
            ) : (
                maxItem > 0 && (
                    <div className={styles.showfeedback}>
                        <Button
                            icon={showfeedback ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-up'}
                            colorBlue
                            transparent
                            cursorDefault={loading}
                            onClick={() => {
                                !loading && setShowFeedback((prev) => !prev);
                            }}
                        >
                            {maxItem} Phản hồi
                        </Button>
                    </div>
                )
            )}

            {showfeedback && (
                <div ref={commentRef} className={styles.feedback}>
                    {listComment.length > 0 &&
                        listComment.map((item) => {
                            return (
                                <div key={item.id} className={styles.comment}>
                                    <div className={styles.left}>
                                        <img src={renderAvt(item.user_avt)} alt="" />
                                    </div>
                                    <div className={styles.right}>
                                        <div className={styles.name}>
                                            <strong>{item.user_name}</strong>
                                            {item.admin && <span className={styles.admin}>Quản trị viên</span>}
                                            <span>- {formatTimestamp(item.created)}</span>
                                        </div>
                                        <div className={styles.content}>{item.content}</div>
                                    </div>
                                </div>
                            );
                        })}
                    {maxItem > payload.limit && (
                        <>
                            {loading ? (
                                <div className={styles.loading} style={{ padding: '10px', width: '100%' }}>
                                    <Loading style={{ margin: '0 auto', width: '20px', height: '20px' }} />
                                </div>
                            ) : (
                                <div className={styles.btn}>
                                    {listComment.length > payload.limit && (
                                        <Button colorBlue transparent onClick={handleHideComments}>
                                            Ẩn bớt
                                        </Button>
                                    )}
                                    {listComment.length < maxItem && (
                                        <Button
                                            colorBlue
                                            transparent
                                            cursorDefault={loading}
                                            onClick={() => {
                                                !loading && setPayload({ ...payload, page: payload.page + 1 });
                                            }}
                                        >
                                            Xem thêm
                                        </Button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Feedback;
