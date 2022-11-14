import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import categoryApi from '../../../../api/news/category';
import useForm from '../../../../hooks/useForm';
import Modal from '../../Components/Modal';
import style from '../../Components/FormCss/Form.module.css';
import newsApi from '../../../../api/news/news';
function Form({ type, onClick, data, payload, setPayload }) {
    const dispatch = useDispatch();
    const validates = [
        { name: 'title', rules: { isRequired: true } },
        { name: 'category', rules: { isRequired: true } },
        { name: 'img', rules: { isRequired: type === 'add', isFileImg: true } },
        { name: 'content', rules: { isRequired: true } },
    ];
    const initValues = { title: '', img: '', category: '', status: '0', content: '' };
    const formRef = useRef();
    const [formValues, setFormValues] = useState(initValues);
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await categoryApi.get();
                setListCategory(res[0].data);
            } catch (error) {
                console.log(error);
            }
        };
        getCategory();
    }, []);
    useEffect(() => {
        if (type === 'update') {
            setFormValues({
                ...formValues,
                title: data.title,
                category: data.category_id,
                status: data.status,
                content: data.des,
            });
        }
    }, []);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('title', formValues.title);
            params.append('category', formValues.category);
            params.append('img', formValues.img[0]);
            params.append('status', formValues.status);
            params.append('des', formValues.content);
            if (type === 'add') {
                const res = await newsApi.post(params);
                dispatch(addToastMessage(res[0].status, res[0].message));
                if (res[0].status === 'success') {
                    formRef.current.reset();
                    setFormValues(initValues);
                    setPayload({ ...payload, page: 1 });
                }
            } else {
                params.append('id', data.id);
                const res = await newsApi.update(params);
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
    const handleOnchange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    return (
        <Modal
            title={type === 'add' ? 'Thêm tin tức' : 'Sửa tin tức'}
            onClick={onClick}
            type={type}
            onSubmit={() => {
                formSubmit(null, formValues);
            }}
        >
            <form ref={formRef}>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Tiêu đề:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.title && 'error'}
                            type="text"
                            name="title"
                            value={formValues.title}
                            placeholder="Nhập tiêu đề..."
                            onChange={(e) => {
                                handleOnchange('title', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('title', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.title}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Danh mục:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <select
                            className={errors.category && 'error'}
                            name="category"
                            value={formValues.category}
                            onChange={(e) => {
                                handleOnchange('category', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('category', e.target.value);
                            }}
                        >
                            <option value="">---Chọn danh mục---</option>

                            {listCategory.length > 0 &&
                                listCategory.map((item) => {
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
                        <label>Hình ảnh:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.img && 'error'}
                            type="file"
                            name="img"
                            onChange={(e) => {
                                handleOnchange('img', e.target.files);
                            }}
                            onBlur={(e) => {
                                invalid('img', e.target.files);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.img}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Trạng thái:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <select
                            name="status"
                            value={formValues.status}
                            onChange={(e) => {
                                handleOnchange('status', e.target.value);
                            }}
                        >
                            <option value="0">Hiển thị</option>
                            <option value="1">Ẩn</option>
                        </select>
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error"></p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Nội dung:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <div className={errors.content && 'error'}>
                            <Editor
                                textareaName="content"
                                value={formValues.content}
                                onEditorChange={(e) => {
                                    handleOnchange('content', e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.content}</p>
                </div>
            </form>
        </Modal>
    );
}

export default Form;
