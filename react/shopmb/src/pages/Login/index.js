import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/actions/user';
import { addToastMessage } from '../../redux/actions/toastMessage';
import authApi from '../../api/authApi';
import useForm from '../../hooks/useForm';
import BackgroundLogin from '../BackgroundLogin';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import logo from '../../assets/images/icon/logo1.png';

import style from './login.module.css';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validates = [
        { name: 'email', rules: { isRequired: true, isEmail: true } },
        { name: 'password', rules: { isRequired: true, minLength: 6 } },
    ];
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('email', formValues.email);
            params.append('password', formValues.password);
            setLoading(true);
            const res = await authApi.signIn(params);
            setLoading(false);
            dispatch(addToastMessage(res[0].status, res[0].message));
            if (res[0].status === 'success') {
                localStorage.setItem('ACCESS_TOKEN', res[0].accessToken);
                localStorage.setItem('REFRESH_TOKEN', res[0].refreshToken);
                dispatch(addUser(res[0].infoUser[0]));
                navigate('/');
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
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <BackgroundLogin>
            <div className={style.wapper}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        !loading && formSubmit(e, formValues);
                    }}
                >
                    <div className={style.logo}>
                        <Link to={'/'}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className={style.form_input}>
                        <div className={style.form_input_item}>
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
                        <div className={style.error}>
                            <p className="txt-error">{errors.email} </p>
                        </div>
                        <div className={style.form_input_item}>
                            <input
                                className={errors.password && 'error'}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formValues.password}
                                placeholder="Nhập mật khẩu..."
                                onChange={handleOnChange}
                                onBlur={(e) => invalid('password', e.target.value)}
                            />
                            <div className={style.icon} onClick={handleShowPassword}>
                                {showPassword ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </div>
                        </div>
                        <div className={style.error}>
                            <p className="txt-error">{errors.password}</p>
                        </div>
                    </div>
                    <div className={style.action}>
                        <div className={style.action_item}>
                            <input type="checkbox" id="checkbox" />
                            <label htmlFor="checkbox"> Nhớ mật khẩu</label>
                        </div>
                        <div className={style.action_item}>
                            <Link to="">Quên mật khẩu?</Link>
                        </div>
                    </div>

                    <div className={style.btn}>
                        <Button large blue cursorDefault={loading}>
                            <span style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập {loading && <Loading />}{' '}
                            </span>
                        </Button>
                    </div>
                    <div className={style.btn}>
                        <Button to={'/dang_ky'} large transparent icon={'fa-solid fa-user-plus'}>
                            Tạo tài khoản
                        </Button>
                    </div>
                </form>
            </div>
        </BackgroundLogin>
    );
}

export default Login;
