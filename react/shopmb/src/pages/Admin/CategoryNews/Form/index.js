import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import useForm from '../../../../hooks/useForm';
import Modal from '../../Components/Modal';
import style from '../../Components/FormCss/Form.module.css';
import categoryApi from '../../../../api/news/category';
function Form({ type, onClick, data, payload, setPayload }) {
    const dispatch = useDispatch();
    const validates = [{ name: 'name', rules: { isRequired: true } }];
    const initValues = { name: '', status: '0' };
    const formRef = useRef();
    const [formValues, setFormValues] = useState(initValues);
    useEffect(() => {
        if (type === 'update') {
            setFormValues({ ...formValues, name: data.name, status: data.status });
        }
    }, []);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('name', formValues.name);
            params.append('status', formValues.status);
            if (type === 'add') {
                const res = await categoryApi.post(params);
                dispatch(addToastMessage(res[0].status, res[0].message));
                if (res[0].status === 'success') {
                    formRef.current.reset();
                    setFormValues(initValues);
                    setPayload({ ...payload, page: 1 });
                }
            } else {
                params.append('id', data.id);
                const res = await categoryApi.update(params);
                dispatch(addToastMessage(res[0].status, res[0].message));
                if (res[0].status === 'success') {
                    setPayload({ ...payload });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleSubmit);
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    return (
        <Modal
            title={type === 'add' ? 'Thêm danh mục' : 'Sửa danh mục'}
            type={type}
            onClick={onClick}
            onSubmit={() => {
                formSubmit(null, formValues);
            }}
        >
            <form ref={formRef}>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Tên danh mục: </label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.name && 'error'}
                            type="text"
                            name="name"
                            value={formValues.name}
                            placeholder="Nhập tên danh mục..."
                            onChange={handleOnChange}
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
                        <label>Trạng thái: </label>
                    </div>
                    <div className={style.form_item_content}>
                        <select name="status" value={formValues.status} onChange={handleOnChange}>
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
