import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import { productProvider } from '../../productProvider';
import commentApi from '../../../../api/comment/commentApi';
import useForm from '../../../../hooks/useForm';

import CommentItem from './CommentItem';
import Button from '../../../../components/Button';
import Loading from './CommentItem/Loading';
import Pagination from '../../../../components/Pagination';
import styles from './Comments.module.css';
function Comments() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const productContext = useContext(productProvider);
    const validate = [{ name: 'content', rules: { isRequired: true, minLength: 5 } }];
    const [formValue, setFormValue] = useState({ content: '' });
    const [maxItem, setMaxItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [listComment, setListComment] = useState([]);
    const [payload, setPayload] = useState({
        limit: 4,
        page: 1,
        user_id: user.id,
    });
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append('pro_id', productContext.id);
            params.append('user_id', user.id);
            params.append('content', formValue.content);
            const res = await commentApi.add(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            setLoading(false);
            if (res[0].status === 'success') {
                setFormValue({ ...formValue, content: '' });
                setPayload({ ...payload });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const getComments = async () => {
            try {
                setLoading(true);
                const _payload = { ...payload, pro_id: productContext.id };
                const res = await commentApi.get(_payload);
                setListComment(res[0].data);
                setMaxItem(res[0].max);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, [payload, productContext.id]);

    const { invalid, errors, removeError, formSubmit } = useForm(validate, handleSubmit);
    const handleOnChange = (name, value) => {
        setFormValue({ ...formValue, [name]: value });
        removeError(name);
    };
    return (
        <div className={`${styles.box} container box_shadow`}>
            <div className={styles.title}>
                <h3>Bình luận về {productContext.name}</h3>
            </div>
            <div className={styles.input}>
                <textarea
                    className={errors.content ? 'error' : ''}
                    name="content"
                    rows="5"
                    value={formValue.content}
                    placeholder="Viết bình luận của bạn"
                    onChange={(e) => {
                        handleOnChange('content', e.target.value);
                    }}
                    onBlur={(e) => {
                        invalid('content', e.target.value);
                    }}
                ></textarea>
                <p className="txt-error">{errors.content}</p>
                <Button
                    blue
                    cursorDefault={loading}
                    icon={'fa-solid fa-paper-plane'}
                    onClick={() => {
                        !loading && formSubmit(null, formValue);
                    }}
                >
                    Gửi phản hồi
                </Button>
            </div>

            {loading ? (
                <Loading count={payload.limit} />
            ) : (
                <div className={styles.body}>
                    {listComment.length > 0 &&
                        listComment.map((item) => {
                            return <CommentItem key={item.id} data={item} />;
                        })}
                    {maxItem > payload.limit && (
                        <Pagination maxItem={maxItem} setPayload={setPayload} payload={payload} />
                    )}
                </div>
            )}
        </div>
    );
}

export default Comments;
