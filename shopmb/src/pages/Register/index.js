import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToastMessage } from '../../redux/actions/toastMessage';
import userApi from '../../api/user/userApi';

import BackgroundLogin from '../BackgroundLogin';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import logo from '../../assets/images/icon/logo1.png';
import useForm from '../../hooks/useForm';

import styles from './registration.module.css';
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validates = [
        { name: 'fullname', rules: { isRequired: true, minLength: 6 } },
        { name: 'email', rules: { isRequired: true, isEmail: true } },
        { name: 'password', rules: { isRequired: true, minLength: 6 } },
        { name: 'confirmPassword', rules: { isRequired: true, isConfrimed: () => formValues.password } },
        { name: 'phoneNumber', rules: { isRequired: true, isPhoneNumber: true } },
    ];
    const initValues = {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initValues);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('name', formValues.fullname);
            params.append('email', formValues.email);
            params.append('password', formValues.password);
            params.append('phoneNumber', formValues.phoneNumber);
            setLoading(true);
            const res = await userApi.add(params);
            setLoading(false);
            dispatch(addToastMessage(res[0].status, res[0].message));
            if (res[0].status === 'success') {
                navigate('/dang_nhap');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleSubmit);

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'phoneNumber') {
            value.slice(-1) % 1 === 0 && setFormValues({ ...formValues, [name]: value });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
        removeError(name);
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowCfPassword = () => {
        setShowCfPassword(!showCfPassword);
    };

    return (
        <BackgroundLogin>
            <div className={styles.wapper}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        !loading && formSubmit(e, formValues);
                    }}
                >
                    <div className={styles.logo}>
                        <Link to={'/'}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className={styles.form_input}>
                        <div className={styles.form_input_item}>
                            <input
                                className={errors.fullname && 'error'}
                                type="text"
                                name="fullname"
                                value={formValues.fullname}
                                placeholder="Nhập họ tên..."
                                onChange={handleOnChange}
                                onBlur={(e) => invalid('fullname', e.target.value)}
                            />
                        </div>
                        <div className={styles.error}>
                            <p className="txt-error">{errors.fullname}</p>
                        </div>
                        <div className={styles.form_input_item}>
                            <input
                                className={errors.email && 'error'}
                                type="text"
                                name="email"
                                value={formValues.email}
                                placeholder="Nhập email..."
                                onChange={handleOnChange}
                                onBlur={(e) => invalid('email', e.target.value)}
                            />
                        </div>
                        <div className={styles.error}>
                            <p className="txt-error">{errors.email} </p>
                        </div>
                        <div className={styles.form_input_item}>
                            <input
                                className={errors.password && 'error'}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formValues.password}
                                placeholder="Nhập mật khẩu..."
                                onChange={handleOnChange}
                                onBlur={(e) => invalid('password', e.target.value)}
                            />
                            <div className={styles.icon} onClick={handleShowPassword}>
                                {showPassword ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </div>
                        </div>
                        <div className={styles.error}>
                            <p className="txt-error">{errors.password}</p>
                        </div>
                        <div className={styles.form_input_item}>
                            <input
                                className={errors.confirmPassword && 'error'}
                                type={showCfPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formValues.confirmPassword}
                                placeholder="Nhập lại mật khẩu..."
                                onChange={handleOnChange}
                                onBlur={(e) => invalid('confirmPassword', e.target.value)}
                            />
                            <div className={styles.icon} onClick={handleShowCfPassword}>
                                {showCfPassword ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </div>
                        </div>
                        <div className={styles.error}>
                            <p className="txt-error">{errors.confirmPassword}</p>
                        </div>
                        <div className={styles.form_input_item}>
                            <input
                                className={errors.phoneNumber && 'error'}
                                type="text"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                placeholder="Nhập sđt..."
                                onChange={handleOnChange}
                                onBlur={(e) => invalid('phoneNumber', e.target.value)}
                            />
                        </div>
                        <div className={styles.error}>
                            <p className="txt-error">{errors.phoneNumber} </p>
                        </div>
                    </div>

                    <div className={styles.btn}>
                        <Button large blue cursorDefault={loading}>
                            <span style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                <i className="fa-solid fa-user-plus"></i> Đăng ký {loading && <Loading />}
                            </span>
                        </Button>
                    </div>
                    <div className={styles.btn}>
                        <Button to={'/dang_nhap'} large transparent icon={'fa-solid fa-right-to-bracket'}>
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </div>
        </BackgroundLogin>
    );
}

export default Register;
