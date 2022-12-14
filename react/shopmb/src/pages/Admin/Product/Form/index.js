import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../../../redux/actions/toastMessage';
import { Editor } from '@tinymce/tinymce-react';
import categoryApi from '../../../../api/product/categoryApi';
import brandApi from '../../../../api/product/brandApi';
import useForm from '../../../../hooks/useForm';
import Modal from '../../Components/Modal';
import style from '../../Components/FormCss/Form.module.css';
import productApi from '../../../../api/product/productApi';
function Form({ type, onClick, data, payload, setPayload }) {
    const dispatch = useDispatch();
    const validates = [
        { name: 'name', rules: { isRequired: true } },
        { name: 'category', rules: { isRequired: true } },
        { name: 'brand', rules: { isRequired: true } },
        { name: 'img', rules: { isRequired: type === 'add', isFileImg: true } },
        { name: 'imgs', rules: { isRequired: type === 'add', isFileImg: true } },
        { name: 'ver', rules: { isRequired: true } },
        { name: 'colors', rules: { isRequired: true } },
        { name: 'price', rules: { isRequired: true, isNumber: true } },
        { name: 'qty', rules: { isRequired: true, isNumber: true } },
        { name: 'sale', rules: { isNumber: true } },
    ];
    const initValue = {
        name: '',
        category: '',
        brand: '',
        img: '',
        imgs: '',
        ver: '',
        colors: '',
        price: '',
        qty: '',
        sale: '',
        des: '',
    };
    const [formValues, setFormValues] = useState(initValue);
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [brandProduct, setBrandProduct] = useState([]);
    const formRef = useRef();
    useEffect(() => {
        if (type === 'update') {
            setFormValues({
                name: data.name,
                category: data.category_id,
                brand: data.brand_id,
                ver: JSON.parse(data.versions).join(', '),
                colors: JSON.parse(data.colors).join(', '),
                price: data.price,
                qty: data.qty,
                sale: data.sale,
                des: data.product_des,
            });
        }
    }, []);
    useEffect(() => {
        const getAllCategoryProduct = async () => {
            const response = await categoryApi.getALL();
            setCategoryProduct(response[0].data);
        };
        getAllCategoryProduct();
    }, []);
    useEffect(() => {
        if (formValues.category) {
            const getBrandProduct = async () => {
                const response = await brandApi.getById({ idCategory: formValues.category });
                setBrandProduct(response);
            };
            getBrandProduct();
        }
    }, [formValues.category]);
    const handleSubmit = async () => {
        try {
            const arrVer = formValues.ver.split(',');
            for (let i = 0; i < arrVer.length; i++) {
                arrVer[i] = arrVer[i].trim();
            }
            const arrColors = formValues.colors.split(',');
            for (let i = 0; i < arrColors.length; i++) {
                arrColors[i] = arrColors[i].trim();
            }
            const params = new FormData();
            params.append('name', formValues.name.trim());
            params.append('category', formValues.category);
            params.append('brand', formValues.brand);

            formValues.img && params.append('img', formValues.img[0]);
            if (formValues.imgs) {
                for (let i = 0; i < formValues.imgs.length; i++) {
                    params.append('imgs[]', formValues.imgs[i]);
                }
            }
            params.append('ver', JSON.stringify(arrVer));
            params.append('colors', JSON.stringify(arrColors));
            params.append('price', formValues.price);
            params.append('qty', formValues.qty);
            params.append('sale', formValues.sale);
            params.append('des', formValues.des);
            if (type === 'add') {
                const response = await productApi.post(params);
                dispatch(addToastMessage(response[0].status, response[0].message));
                if (response[0].status === 'success') {
                    formRef.current.reset();
                    setFormValues(initValue);
                    setPayload({ ...payload, page: 1 });
                }
            } else {
                params.append('id', data.id);
                const response = await productApi.update(params);
                dispatch(addToastMessage(response[0].status, response[0].message));
                console.log(response);
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
        if (name === 'price' || name === 'qty') {
            value.slice(-1) % 1 === 0 && setFormValues({ ...formValues, [name]: value });
        } else if (name === 'category') {
            setFormValues({ ...formValues, [name]: value, brand: '' });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
        removeError(name);
    };
    const handleOnChangeDes = (e) => {
        const value = e;
        setFormValues({ ...formValues, des: value });
    };
    return (
        <Modal
            title={type === 'add' ? 'Th??m s???n ph???m' : 'S???a s???n ph???m'}
            type={type}
            onClick={onClick}
            onSubmit={() => {
                formSubmit(null, formValues);
            }}
        >
            <form ref={formRef}>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>T??n s???n ph???m:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.name && 'error'}
                            type="text"
                            name="name"
                            value={formValues.name}
                            placeholder="Nh???p t??n s???n ph???m..."
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
                        <label>Lo???i s???n ph???m:</label>
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
                            <option value="">---ch???n danh m???c---</option>
                            {categoryProduct.length >= 1 &&
                                categoryProduct.map((item) => {
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
                        <label>Nh??n h??ng:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <select
                            className={errors.brand && 'error'}
                            name="brand"
                            value={formValues.brand}
                            onChange={(e) => {
                                handleOnChange('brand', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('brand', e.target.value);
                            }}
                        >
                            <option value="">---ch???n nh??n h??ng---</option>
                            {brandProduct.length >= 1 &&
                                brandProduct.map((item) => {
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
                    <p className="txt-error">{errors.brand}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>H??nh ???nh:</label>
                        <span>{type === 'update' && 'b??? tr???ng n???u kh??ng mu???n thay ?????i ???nh'}</span>
                    </div>
                    <div className={style.form_item_content}>
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
                <div className={style.error}>
                    <p className="txt-error">{errors.img}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>???nh kh??c:</label>
                        <span>{type === 'update' && 'b??? tr???ng n???u kh??ng mu???n thay ?????i ???nh'}</span>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.imgs && 'error'}
                            type="file"
                            name="imgs"
                            multiple
                            onChange={(e) => {
                                handleOnChange('imgs', e.target.files);
                            }}
                            onBlur={(e) => {
                                invalid('imgs', e.target.files);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.imgs}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label htmlFor="">Phi??n b???n :</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.ver && 'error'}
                            type="text"
                            name="ver"
                            value={formValues.ver}
                            placeholder="m???i phi??n b???n c??ch nhau b???ng d???u ph???y"
                            onChange={(e) => {
                                handleOnChange('ver', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('ver', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.ver} </p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label htmlFor="">M??u s???c :</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.colors && 'error'}
                            type="text"
                            name="colors"
                            value={formValues.colors}
                            placeholder="m???i m??u c??ch nhau b???ng d???u ph???y"
                            onChange={(e) => {
                                handleOnChange('colors', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('colors', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.colors} </p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>Gi??:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.price && 'error'}
                            type="text"
                            name="price"
                            value={formValues.price}
                            placeholder="Nh???p gi??..."
                            onChange={(e) => {
                                handleOnChange('price', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('price', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.price}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>S??? l?????ng:</label>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.qty && 'error'}
                            type="text"
                            name="qty"
                            value={formValues.qty}
                            placeholder="Nh???p s??? l?????ng..."
                            onChange={(e) => {
                                handleOnChange('qty', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('qty', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.qty}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>khuy???n m??i (%):</label>
                        <span>c?? th??? b??? tr???ng</span>
                    </div>
                    <div className={style.form_item_content}>
                        <input
                            className={errors.sale && 'sale'}
                            type="text"
                            name="sale"
                            value={formValues.sale}
                            placeholder="Nh???p 1 - 100%"
                            onChange={(e) => {
                                handleOnChange('sale', e.target.value);
                            }}
                            onBlur={(e) => {
                                invalid('sale', e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.sale}</p>
                </div>
                <div className={style.form_item}>
                    <div className={style.form_item_label}>
                        <label>M?? t???:</label>
                        <span>{type === 'add' && 'c?? th??? b??? tr???ng'}</span>
                    </div>
                    <div className={style.form_item_content}>
                        <Editor value={formValues.des} onEditorChange={handleOnChangeDes} />
                    </div>
                </div>
                <div className={style.error}>
                    <p className="txt-error">{errors.des}</p>
                </div>
            </form>
        </Modal>
    );
}

export default Form;
