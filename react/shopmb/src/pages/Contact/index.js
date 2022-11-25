import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../redux/actions/toastMessage';
import Path from '../../components/Path';
import style from './contact.module.css';
import useForm from '../../hooks/useForm';
function Contact() {
    const dispatch = useDispatch();
    const validates = [
        {
            name: 'fullName',
            rules: { isRequired: true, minLength: 6 },
        },
        {
            name: 'email',
            rules: { isRequired: true, isEmail: true },
        },
        {
            name: 'phoneNumber',
            rules: { isRequired: true, isPhoneNumber: true },
        },
        {
            name: 'address',
            rules: { isRequired: true },
        },
        {
            name: 'content',
            rules: { isRequired: true },
        },
    ];
    const initValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        content: '',
    };
    const [formValues, setFormValues] = useState(initValues);

    const handleSubmit = () => {
        // setFormValues(initValues);
        dispatch(addToastMessage('success', 'Gửi thành công!'));
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleSubmit);
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    return (
        <>
            <Path list={[{ _name: 'Liên hệ', path: '' }]} />
            <div className={`container ${style.contact}`}>
                <div className={style.contact_left}>
                    <div className={style.title}>
                        <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>
                    </div>
                    <div className={style.context}>
                        <h4>SHOP LINH KIỆN, LAPTOP TẠI HÀ NỘI – ANH MOBILE</h4>
                        <span>
                            Anh mobile là đại lý cấp 1 tại khu vực Hà Nội. Dịch vụ giao hàng trên khu vực tại HÀ NỘI
                        </span>
                    </div>
                    <div className={style.address}>
                        <ul>
                            <li>
                                <h4>Văn Phòng:</h4>
                                <span>155 Tây Sơn, Khu Đìa Đừng, Thị Trấn Phùng, Huyện Đan Phượng, Hà Nội</span>
                            </li>
                            <li>
                                <h4>Hotline:</h4>
                                <span> 0971.029.649</span>
                            </li>
                            <li>
                                <h4>Email:</h4>
                                <span>nguyentuanh6030@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <form
                    onSubmit={(e) => {
                        formSubmit(e, formValues);
                    }}
                >
                    <div className={style.contact_right}>
                        <div className={style.form_item}>
                            <input
                                className={errors.fullName && 'error'}
                                type="text"
                                name="fullName"
                                value={formValues.fullName}
                                placeholder="Họ và tên"
                                onChange={handleOnChange}
                                onBlur={() => {
                                    invalid('fullName', formValues.fullName);
                                }}
                            />
                            <p className="txt-error">{errors.fullName}</p>
                        </div>
                        <div className={style.form_item}>
                            <input
                                className={errors.email && 'error'}
                                type="text"
                                name="email"
                                value={formValues.email}
                                placeholder="Email"
                                onChange={handleOnChange}
                                onBlur={() => {
                                    invalid('email', formValues.email);
                                }}
                            />
                            <p className="txt-error">{errors.email}</p>
                        </div>
                        <div className={style.form_item}>
                            <input
                                className={errors.phoneNumber && 'error'}
                                type="text"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                placeholder="Số điện thoại"
                                onChange={handleOnChange}
                                onBlur={() => {
                                    invalid('phoneNumber', formValues.phoneNumber);
                                }}
                            />
                            <p className="txt-error">{errors.phoneNumber}</p>
                        </div>
                        <div className={style.form_item}>
                            <input
                                className={errors.address && 'error'}
                                type="text"
                                name="address"
                                value={formValues.address}
                                placeholder="Điạ chỉ"
                                onChange={handleOnChange}
                                onBlur={() => {
                                    invalid('address', formValues.address);
                                }}
                            />
                            <p className="txt-error">{errors.address}</p>
                        </div>
                        <div className={style.form_item}>
                            <textarea
                                className={errors.content && 'error'}
                                name="content"
                                rows="6"
                                value={formValues.content}
                                placeholder="Nội dung"
                                onChange={handleOnChange}
                                onBlur={() => {
                                    invalid('content', formValues.content);
                                }}
                            ></textarea>
                            <p className="txt-error">{errors.content}</p>
                        </div>
                        <div className={style.form_item}>
                            <button>
                                <i className="fa-solid fa-paper-plane"></i>Gửi
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Contact;
