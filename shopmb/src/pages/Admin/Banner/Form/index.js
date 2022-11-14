import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import useForm from '../../../../hooks/useForm';
import bannerApi from '../../../../api/banner/bannerApi';
import Modal from '../../Components/Modal';

import styles from '../../Components/FormCss/Form.module.css';
function Form({ type, onClick, payLoad, setPayload, data }) {
    const dispatch = useDispatch();
    const validate = [{ name: 'img', rules: { isRequired: type === 'add', isFileImg: type === 'add' } }];
    const initValue = { img: '', status: '0' };
    const formRef = useRef();
    const [formValues, setFormValues] = useState(initValue);
    useEffect(() => {
        if (type === 'update') {
            setFormValues({ ...formValues, status: data.status });
        }
    }, []);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('status', formValues.status);
            formValues.img && params.append('img', formValues.img[0]);
            if (type === 'add') {
                const res = await bannerApi.post(params);
                dispatch(addToastMessage(res[0].status, res[0].message));
                if (res[0].status === 'success') {
                    setFormValues(initValue);
                    formRef.current.reset();
                    setPayload({ ...payLoad, page: 1 });
                }
            } else {
                params.append('id', data.id);
                const res = await bannerApi.update(params);
                dispatch(addToastMessage(res[0].status, res[0].message));
                setPayload({ ...payLoad });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validate, handleSubmit);
    const handleOnChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    return (
        <Modal
            title={type === 'add' ? 'Thêm banner' : 'Sửa banner'}
            type={type}
            onClick={onClick}
            onSubmit={() => {
                formSubmit(null, formValues);
            }}
        >
            <form ref={formRef}>
                <div className={styles.form_item}>
                    <div className={styles.form_item_label}>
                        <label>Chọn banner:</label>
                    </div>
                    <div className={styles.form_item_content}>
                        <input
                            className={errors.img && 'error'}
                            type="file"
                            name="img"
                            onChange={(e) => {
                                handleOnChange('img', e.target.files);
                            }}
                            onBlur={(e) => {
                                invalid('img', e.target.files);
                            }}
                        />
                    </div>
                </div>
                <div className={styles.error}>
                    <p className="txt-error">{errors.img}</p>
                </div>
                <div className={styles.form_item}>
                    <div className={styles.form_item_label}>
                        <label>Trạng thái:</label>
                    </div>
                    <div className={styles.form_item_content}>
                        <select
                            name="status"
                            value={formValues.status}
                            onChange={(e) => {
                                handleOnChange('status', e.target.value);
                            }}
                        >
                            <option value="0">Hiển thị</option>
                            <option value="1">Ẩn</option>
                        </select>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default Form;
