import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import useForm from '../../../hooks/useForm';
import Welcome from '../Components/Welcome';
import Button from '../../../components/Button';
import userApi from '../../../api/user/userApi';
import styles from './ChangePassword.module.css';
function ChangePassword() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const validates = [
        { name: 'password', rules: { isRequired: true, minLength: 6, maxLength: 30 } },
        { name: 'newPassword', rules: { isRequired: true, minLength: 6, maxLength: 30 } },
        { name: 'confimPassword', rules: { isRequired: true, isConfrimed: () => formValues.newPassword } },
    ];
    const initValues = {
        password: '',
        newPassword: '',
        confimPassword: '',
    };
    const [formValues, setFormValues] = useState(initValues);
    const handleSubmit = async () => {
        try {
            const params = new FormData();
            params.append('userId', user.id);
            params.append('password', formValues.password);
            params.append('newPassword', formValues.newPassword);
            setLoading(true);
            const res = await userApi.changePassword(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            res[0].status === 'success' && setFormValues({ ...formValues, ...initValues });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const { invalid, errors, removeError, formSubmit } = useForm(validates, handleSubmit);
    const handleChangeValues = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        removeError(name);
    };
    return (
        <div className={styles.info_user}>
            <Welcome />
            <div className={styles.content}>
                <h3>Thay đổi mật khẩu</h3>
                <div className={styles.form}>
                    <form onSubmit={(e) => formSubmit(e, formValues)}>
                        <div className={styles.form_item}>
                            <label htmlFor="password">Mật khẩu hiện tại</label>
                            <input
                                className={errors.password ? 'error' : ''}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu hiện tại..."
                                value={formValues.password}
                                onChange={(e) => handleChangeValues('password', e.target.value)}
                                onBlur={(e) => invalid('password', e.target.value)}
                            />
                            <p className="txt-error">{errors.password}</p>
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="newPassword">Mật khẩu mới</label>
                            <input
                                className={errors.newPassword ? 'error' : ''}
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Nhập mật khẩu mới..."
                                value={formValues.newPassword}
                                onChange={(e) => handleChangeValues('newPassword', e.target.value)}
                                onBlur={(e) => invalid('newPassword', e.target.value)}
                            />
                            <p className="txt-error">{errors.newPassword}</p>
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="confimPassword">Xác nhận lại mật khẩu</label>
                            <input
                                className={errors.confimPassword ? 'error' : ''}
                                type="password"
                                id="confimPassword"
                                name="confimPassword"
                                placeholder="Nhập lại mật khẩu..."
                                value={formValues.confimPassword}
                                onChange={(e) => handleChangeValues('confimPassword', e.target.value)}
                                onBlur={(e) => invalid('confimPassword', e.target.value)}
                            />
                            <p className="txt-error">{errors.confimPassword}</p>
                        </div>
                        <div className={styles.button}>
                            <Button blue>Cập nhập thông tin</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
