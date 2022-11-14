import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import useForm from '../../../../hooks/useForm';
import Modal from '../../Components/Modal';
import style from '../../Components/FormCss/Form.module.css';
import categoryApi from '../../../../api/product/categoryApi';
function Form({ type, onClick, data, payload, setPayload }) {
    const dispatch = useDispatch();
    const validates = [
        { name: 'name', rules: { isRequired: true } },
        { name: 'picture', rules: { isRequired: type === 'add', isFileImg: true } },
    ];
    const initValues = {
        name: '',
        picture: '',
        status: '0',
    };
    const [formValues, setFormValues] = useState(initValues);
    const formRef = useRef();
    useEffect(() => {
        if (type === 'update') {
            setFormValues({ ...formValues, name: data.name, status: data.status });
        }
    }, []);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('name', formValues.name);
            params.append('picture', formValues.picture[0]);
            params.append('status', formValues.status);
            if (type === 'add') {
                const response = await categoryApi.post(params);
                dispatch(addToastMessage(response[0].status, response[0].message));
                if (response[0].status === 'success') {
                    formRef.current.reset();
                    setFormValues(initValues);
                    setPayload({ ...payload, page: 1 });
                }
            } else {
                params.append('id', data.id);
                const response = await categoryApi.update(params);
                console.log(response);
                dispatch(addToastMessage(response[0].status, response[0].message));
                if (response[0].status === 'success') {
                    setPayload({ ...payload });
                }
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
        <Modal
            title={type === 'add' ? 'Thêm danh mục' : 'Sửa danh  mục'}
            type={type}
            onClick={onClick}
            onSubmit={() => {
                formSubmit(null, formValues);
            }}
        >
            <form ref={formRef}>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label htmlFor="">Tên danh mục :</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.name && 'error'}
                            type="text"
                            name="name"
                            value={formValues.name}
                            placeholder="Tên danh mục..."
                            onChange={(e) => {
                                handleOnChange('name', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('name', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.name}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label htmlFor="">Ảnh :</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.picture && 'error'}
                            type="file"
                            name="picture"
                            onChange={(e) => {
                                handleOnChange('picture', e.target.files);
                            }}
                            onBlur={(e) => {
                                invalid('picture', e.target.files);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.picture}</p>
                </div>

                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label htmlFor="">Trạng thái :</label>
                    </div>
                    <div className={style.form_item_content}>
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
