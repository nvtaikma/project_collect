import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import Modal from '../../Components/Modal';
import useForm from '../../../../hooks/useForm';
import style from '../../Components/FormCss/Form.module.css';
import categoryApi from '../../../../api/product/categoryApi';
import brandApi from '../../../../api/product/brandApi';
function Form({ type, onClick, data, payload, setPayload }) {
    const _dispatch = useDispatch();
    const validates = [
        { name: 'name', rules: { isRequired: true } },
        { name: 'logo', rules: { isRequired: type === 'add', isFileImg: true } },
        { name: 'category', rules: { isRequired: true } },
    ];
    const initValues = {
        name: '',
        logo: '',
        category: '',
        status: '0',
    };
    const [listCategory, setListCategory] = useState([]);
    const [formValues, setFormValues] = useState(initValues);
    const formRef = useRef();
    useEffect(() => {
        const getCategory = async () => {
            const response = await categoryApi.getALL();
            setListCategory(response[0].data);
        };
        getCategory();
    }, []);
    useEffect(() => {
        if (type === 'update') {
            setFormValues({
                ...formValues,
                name: data.name,
                category: data.categoryId,
                status: data.status,
            });
        }
    }, []);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('name', formValues.name);
            params.append('logo', formValues.logo[0]);
            params.append('category', formValues.category);
            params.append('status', formValues.status);
            if (type === 'add') {
                const res = await brandApi.post(params);
                _dispatch(addToastMessage(res[0].status, res[0].message));
                if (res[0].status === 'success') {
                    formRef.current.reset();
                    setFormValues(initValues);
                    setPayload({ ...payload, page: 1 });
                }
            } else {
                params.append('id', data.id);
                const res = await brandApi.update(params);
                _dispatch(addToastMessage(res[0].status, res[0].message));
                if (res[0].status === 'success') {
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

    console.log(errors);
    return (
        <Modal
            title={type === 'add' ? 'Th??m nh??n h??ng' : 'S???a nh??n h??ng'}
            type={type}
            onClick={onClick}
            onSubmit={() => {
                formSubmit(null, formValues);
            }}
        >
            <form ref={formRef}>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>T??n nh??n h??ng:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.name && 'error'}
                            type="text"
                            name="name"
                            value={formValues.name}
                            placeholder="Nh???p t??n nh??n h??ng..."
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
                        <label>Logo:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.logo && 'error'}
                            type="file"
                            name="logo"
                            onChange={(e) => {
                                handleOnChange('logo', e.target.files);
                            }}
                            onBlur={(e) => {
                                invalid('logo', e.target.files);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.logo}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Danh m???c:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <select
                            className={errors.category && 'error'}
                            name="category"
                            value={formValues.category}
                            onChange={(e) => {
                                handleOnChange('category', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('category', e.target.value);
                            }}
                        >
                            <option value="">---Ch???n danh m???c---</option>
                            {listCategory.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.category}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Tr???ng th??i:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <select
                            // className={errors.status && 'error'}
                            name="status"
                            value={formValues.status}
                            onChange={(e) => {
                                handleOnChange('status', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('status', e.target.value);
                            }}
                        >
                            <option value="0">Hi???n th???</option>
                            <option value="1">???n</option>
                        </select>
                    </div>
                </div>
                {/* <div className={style.error}>
                    <p className="txt-error">{errors.status}</p>
                </div> */}
            </form>
        </Modal>
    );
}

export default Form;
