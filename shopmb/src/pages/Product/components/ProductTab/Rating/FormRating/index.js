import { useState, useContext, useEffect } from 'react';
import { productProvider } from '../../../../productProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addToastMessage } from '../../../../../../redux/actions/toastMessage';
import ratingApi from '../../../../../../api/rating/ratingApi';
import useForm from '../../../../../../hooks/useForm';
import Button from '../../../../../../components/Button';
import styles from './formRating.module.css';
function FormRating({ loading, setLoadPage }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const productContext = useContext(productProvider);
    const [formValues, setFormValues] = useState({
        user_id: user.id,
        pro_id: productContext.id,
        star: 0,
        content: '',
    });
    const validates = [
        { name: 'star', rules: { isInteger: true } },
        { name: 'content', rules: { isRequired: true, minLength: 5 } },
    ];

    useEffect(() => {
        setFormValues({ ...formValues, pro_id: productContext.id });
    }, [productContext.id]);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('user_id', formValues.user_id);
            params.append('pro_id', formValues.pro_id);
            params.append('star', formValues.star);
            params.append('content', formValues.content);
            const res = await ratingApi.add(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            if (res[0].status === 'success') {
                setFormValues({ ...formValues, star: 0, content: '' });
                setLoadPage((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleSubmit);
    const handleOnChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    return (
        <div className={styles.formRating}>
            <div className={styles.formRating_left}>
                <span>Bạn chấm sản phẩm này bao nhiêu sao?</span>
                <ul>
                    {Array(5)
                        .fill(0)
                        .map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    id={index + 1}
                                    className={index < formValues.star ? styles.active : ''}
                                    onClick={() => {
                                        index + 1 !== formValues.star && handleOnChange('star', index + 1);
                                    }}
                                >
                                    <i className="fa-solid fa-star"></i>
                                </li>
                            );
                        })}
                </ul>
                <p className="txt-error">{errors.star && 'Vui lòng đánh giá sao'}</p>
            </div>
            <div className={styles.formRating_right}>
                <textarea
                    className={errors.content && 'error'}
                    rows="5"
                    name="content"
                    placeholder="Nhập nội dung..."
                    value={formValues.content}
                    onChange={(e) => {
                        handleOnChange('content', e.target.value);
                    }}
                    onBlur={(e) => {
                        invalid('content', e.target.value);
                    }}
                ></textarea>
                <div className={styles.error}>
                    <p className="txt-error">{errors.content}</p>
                </div>
                <Button
                    blue
                    cursorDefault={loading}
                    onClick={() => {
                        !loading && formSubmit(null, formValues);
                    }}
                >
                    <i className="fa-solid fa-paper-plane"></i>Gửi đánh giá
                </Button>
            </div>
        </div>
    );
}

export default FormRating;
