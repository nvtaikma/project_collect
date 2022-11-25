import { useState } from 'react';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import style from './Login.module.css';
function LoginAdmin() {
    const validates = [
        { name: 'user', rules: { isRequired: true, minLength: 6 } },
        { name: 'password', rules: { isRequired: true, minLength: 6 } },
    ];
    const initValues = { user: '', password: '' };
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState(initValues);
    const handleOnSubmit = () => {
        console.log('thanh cong', formValues);
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleOnSubmit);
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    const clickIcon = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className={style.wapper}>
            <div className={style.form_login}>
                <form>
                    <div className={style.form_title}>
                        <h3>ĐĂNG NHẬP</h3>
                    </div>
                    <div className={style.form_item}>
                        <input
                            className={errors.user && 'error'}
                            type="text"
                            name="user"
                            placeholder="Username"
                            onChange={handleOnChange}
                            onBlur={(e) => {
                                invalid('user', e.target.value);
                            }}
                        />
                    </div>
                    <div className={style.error}>
                        <p className="txt-error">{errors.user}</p>
                    </div>
                    <div className={style.form_item}>
                        <input
                            className={errors.password && 'error'}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            onChange={handleOnChange}
                            onBlur={(e) => {
                                invalid('password', e.target.value);
                            }}
                        />
                        <label className={style.icon} onClick={clickIcon}>
                            {showPassword ? (
                                <i className="fa-solid fa-eye-slash"></i>
                            ) : (
                                <i className="fa-solid fa-eye"></i>
                            )}
                        </label>
                    </div>
                    <div className={style.error}>
                        <p className="txt-error">{errors.password}</p>
                    </div>
                    <div className={style.btn}>
                        <Button
                            icon={'fa-solid fa-right-to-bracket'}
                            large
                            blue
                            onClick={(e) => {
                                formSubmit(e, formValues);
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                    <div className={style.action}>
                        <div className={style.action_item}>
                            <input type="checkbox" id="checkbox" />
                            <label htmlFor="checkbox"> Nhớ mật khẩu</label>
                        </div>
                        <div className={style.action_item}>
                            <a href="#">Quên mật khẩu?</a>
                        </div>
                    </div>
                </form>
                {/* <div className={style.form_loginSub}>
                    <div className={style.form_title}>
                        <p>--- Or Sign In With ---</p>
                    </div>
                    <div className={style.btn}>
                        <Button large blue icon={'fa-brands fa-facebook-f'}>
                            Facebook
                        </Button>
                        <Button large blueAdmin icon={'fa-brands fa-twitter'}>
                            Twitter
                        </Button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default LoginAdmin;
