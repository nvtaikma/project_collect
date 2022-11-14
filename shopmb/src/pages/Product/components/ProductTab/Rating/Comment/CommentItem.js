import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../../../redux/actions/toastMessage';
import { formatTimestamp, renderAvt } from '../../../../../../hooks/useFormat';
import feedbackRatingApi from '../../../../../../api/rating/feedbackRating';

import useForm from '../../../../../../hooks/useForm';
import Button from '../../../../../../components/Button';
import imgAvatar from '../../../../../../assets/images/icon/no-avt.png';
import Loading from './Loading';
import styles from './comment.module.css';
function CommentItem({ data }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const validate = [{ name: 'content', rules: { isRequired: true, minLength: 5 } }];
    const [showBtn, setShowBtn] = useState(false);
    const [loadPage, setLoadPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedbackRating, setfeedbackRating] = useState([]);
    const [formValue, setFormValue] = useState({ content: '' });
    useEffect(() => {
        const getFeedbackRating = async () => {
            try {
                setLoading(true);
                const payload = { rating_id: data.id, limit: 3 };
                const res = await feedbackRatingApi.get(payload);
                setfeedbackRating(res[0].data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getFeedbackRating();
    }, [data.id, loadPage]);
    const clickBtnFeedback = () => {
        setShowBtn((prev) => !prev);
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append('rating_id', data.id);
            params.append('user_id', user.id);
            params.append('content', formValue.content);
            const res = await feedbackRatingApi.add(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            setLoading(false);
            if (res[0].status === 'success') {
                setFormValue({ ...formValue, content: '' });
                setShowBtn((prev) => !prev);
                setLoadPage((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validate, handleSubmit);
    const handleOnChange = (name, value) => {
        setFormValue({ ...formValue, [name]: value });
        removeError(name);
    };
    return (
        <div className={styles.comment}>
            <div className={styles.avatar}>
                <img src={renderAvt(data.user_avt)} alt="avatar" />
            </div>
            <div className={styles.comment_right}>
                <div className={`${styles.comment_right_item} ${styles.user_name}`}>
                    <strong>{data.user_name}</strong>
                    {data.admin && <span className={styles.admin}>Quản trị viên</span>}
                </div>
                <div style={{ display: 'flex' }} className={`${styles.comment_right_item} ${styles.star}`}>
                    <ul>
                        {Array(5)
                            .fill(0)
                            .map((item1, index) => {
                                return (
                                    <li key={index} className={data.star > index ? styles.active : ''}>
                                        <i className="fa-solid fa-star"></i>
                                    </li>
                                );
                            })}
                    </ul>
                    <span style={{ lineHeight: '18px' }} className={styles.time}>
                        {formatTimestamp(data.created)}
                    </span>
                </div>

                <div className={`${styles.comment_right_item} ${styles.commemt}`}>
                    <span>{data.content}</span>
                </div>
                <div className={`${styles.comment_right_item} ${styles.btn_feedback}`}>
                    {user.admin && (
                        <Button
                            icon={'fa-solid fa-comment-dots'}
                            cursorDefault={loading}
                            onClick={!loading ? clickBtnFeedback : undefined}
                        >
                            Phản hồi
                        </Button>
                    )}
                </div>
                {!showBtn &&
                    (loading ? (
                        <Loading />
                    ) : (
                        <div className={styles.cmt_feedback}>
                            {feedbackRating.length > 0 &&
                                feedbackRating.map((item) => {
                                    return (
                                        <div key={item.id} className={styles.cmt_feedback_item}>
                                            <div className={styles.avatar}>
                                                <img src={renderAvt(item.user_avt)} alt="avatar" />
                                            </div>
                                            <div className={styles.feedback_right}>
                                                <div className={`${styles.feedback_right_item} ${styles.user_name}`}>
                                                    <strong>{item.user_name}</strong>
                                                    {item.admin && <span className={styles.admin}>Quản trị viên</span>}
                                                    <span>- {formatTimestamp(item.created)}</span>
                                                </div>
                                                <div className={`${styles.feedback_right_item} ${styles.commemt}`}>
                                                    <span>{item.content}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    ))}
                {showBtn && (
                    <div className={styles.form_feedback}>
                        <textarea
                            className={errors.content && 'error'}
                            name="content"
                            value={formValue.content}
                            rows="5"
                            placeholder="Nhập nội dung..."
                            onChange={(e) => {
                                handleOnChange('content', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('content', e.target.value);
                            }}
                        ></textarea>
                        {errors.content && <p className="txt-error">{errors.content}</p>}
                        <Button
                            blue
                            icon={'fa-solid fa-paper-plane'}
                            cursorDefault={loading}
                            onClick={() => {
                                !loading && formSubmit(null, formValue);
                            }}
                        >
                            Gửi phản hồi
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
