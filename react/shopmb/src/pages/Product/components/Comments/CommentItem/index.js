import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../../redux/actions/toastMessage';
import { updateUser } from '../../../../../redux/actions/user';
import { productProvider } from '../../../productProvider';
import { formatTimestamp, renderAvt } from '../../../../../hooks/useFormat';
import commentApi from '../../../../../api/comment/commentApi';
import userApi from '../../../../../api/user/userApi';
import useForm from '../../../../../hooks/useForm';

import Feedback from '../Feedback';
import Button from '../../../../../components/Button';
import styles from './CommentItem.module.css';
function CommentItem({ data }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const productContext = useContext(productProvider);
    const validate = [{ name: 'content', rules: { isRequired: true, minLength: 5 } }];
    const [countLike, setCountLike] = useState(+data.likes);
    const [countDislike, setCountDislike] = useState(+data.dislikes);
    const [dislike, setDislike] = useState(false);
    const [like, setLike] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValue, setFormValue] = useState({ content: '' });
    useEffect(() => {
        if (user.likeComments) {
            const arrLikeCmt = JSON.parse(user.likeComments);
            const newArr = arrLikeCmt.filter((item) => {
                return item === data.id;
            });
            setLike(newArr.length > 0);
        }
        if (user.dislikeComments) {
            const arrDislikeCmt = JSON.parse(user.dislikeComments);
            const newArr = arrDislikeCmt.filter((item) => {
                return item === data.id;
            });
            setDislike(newArr.length > 0);
        }
    }, []);
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append('pro_id', productContext.id);
            params.append('user_id', user.id);
            params.append('parent_id', data.id);
            params.append('content', formValue.content);
            const res = await commentApi.add(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            setLoading(false);
            if (res[0].status === 'success') {
                setFormValue({ ...formValue, content: '' });
                setShowForm(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validate, handleSubmit);
    const handleChange = (name, value) => {
        setFormValue({ ...formValue, [name]: value });
        removeError(name);
    };
    const handleshowForm = () => {
        setShowForm((prev) => !prev);
    };
    const likeCmt = async (id) => {
        try {
            const params = new FormData();
            params.append('user_id', user.id);
            params.append('cmt_id', id);
            params.append('user_id', user.id);
            const res = await userApi.updateLikeCmt(params);
        } catch (error) {
            console.log(error);
        }
    };
    const handleLikeCmt = (id) => {
        const arrLikeCmt = user.likeComments ? JSON.parse(user.likeComments) : [];
        const arrDislikeCmt = user.dislikeComments ? JSON.parse(user.dislikeComments) : [];
        if (dislike) {
            setDislike(false);
            setCountDislike((prev) => prev - 1);
            const newArr = arrDislikeCmt.filter((item) => item !== id);
            const toString = JSON.stringify(newArr);
            dispatch(updateUser({ dislikeComments: toString }));
        }
        if (like) {
            setCountLike((prev) => prev - 1);
            const newArr = arrLikeCmt.filter((item) => item !== id);
            const toString = JSON.stringify(newArr);
            dispatch(updateUser({ likeComments: toString }));
        } else {
            setCountLike((prev) => prev + 1);
            arrLikeCmt.push(id);
            const toString = JSON.stringify(arrLikeCmt);
            dispatch(updateUser({ likeComments: toString }));
        }
        setLike((prev) => !prev);
        likeCmt(id);
    };
    const dislikeCmt = async (id) => {
        try {
            const params = new FormData();
            params.append('user_id', user.id);
            params.append('cmt_id', id);
            params.append('user_id', user.id);
            const res = await userApi.updateDislikeCmt(params);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDislikeCmt = (id) => {
        const arrLikeCmt = user.likeComments ? JSON.parse(user.likeComments) : [];
        const arrDislikeCmt = user.dislikeComments ? JSON.parse(user.dislikeComments) : [];
        if (like) {
            setLike(false);
            setCountLike((prev) => prev - 1);
            const newArr = arrLikeCmt.filter((item) => item !== id);
            const toString = JSON.stringify(newArr);
            dispatch(updateUser({ likeComments: toString }));
        }
        if (dislike) {
            setCountDislike((prev) => prev - 1);
            const newArr = arrDislikeCmt.filter((item) => item !== id);
            const toString = JSON.stringify(newArr);
            dispatch(updateUser({ dislikeComments: toString }));
        } else {
            setCountDislike((prev) => prev + 1);
            arrDislikeCmt.push(id);
            const toString = JSON.stringify(arrDislikeCmt);
            dispatch(updateUser({ dislikeComments: toString }));
        }
        setDislike((prev) => !prev);
        dislikeCmt(id);
    };
    return (
        <div className={styles.comment}>
            <div className={styles.left}>
                <img src={renderAvt(data.user_avt)} alt="" />
            </div>
            <div className={styles.right}>
                <div className={styles.name}>
                    <strong>{data.user_name}</strong>
                    {data.admin && <span className={styles.admin}>Quản trị viên</span>}
                    <span> - {formatTimestamp(data.created)}</span>
                </div>
                <div className={styles.created}></div>
                <div className={styles.content}>{data.content}</div>
                <div className={styles.tools}>
                    <Button
                        small
                        transparent
                        colorBlue={like}
                        icon={like ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'}
                        onClick={() => {
                            handleLikeCmt(data.id);
                        }}
                    >
                        {countLike > 0 && countLike}
                    </Button>
                    <Button
                        small
                        transparent
                        colorBlue={dislike}
                        icon={dislike ? 'fa-solid fa-thumbs-down' : 'fa-regular fa-thumbs-down'}
                        onClick={() => {
                            handleDislikeCmt(data.id);
                        }}
                    >
                        {countDislike > 0 && countDislike}
                    </Button>
                    <Button small transparent onClick={handleshowForm}>
                        Phản hồi
                    </Button>
                </div>

                {showForm ? (
                    <div className={styles.input}>
                        <textarea
                            className={errors.content && 'error'}
                            style={{ width: '100%' }}
                            name="content"
                            rows="5"
                            value={formValue.content}
                            placeholder="Phản hồi..."
                            onChange={(e) => {
                                handleChange('content', e.target.value);
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
                ) : (
                    <Feedback parentId={data.id} />
                )}
            </div>
        </div>
    );
}

export default CommentItem;
