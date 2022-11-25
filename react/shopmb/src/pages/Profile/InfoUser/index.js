import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions/user';
import { addToastMessage } from '../../../redux/actions/toastMessage';
import userApi from '../../../api/user/userApi';
import useForm from '../../../hooks/useForm';

import Welcome from '../Components/Welcome';
import Button from '../../../components/Button';
import styles from './InfoUser.module.css';
function InfoUser() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const validates = [
        { name: 'name', rules: { isRequired: true, minLength: 6, maxLength: 30 } },
        { name: 'sdt', rules: { isRequired: true, isPhoneNumber: true, maxLength: 11 } },
        { name: 'email', rules: { isRequired: true, isEmail: true } },
        { name: 'avt', rules: { isFileImg: true } },
    ];
    const [formValues, setFormValues] = useState({
        id: user.id,
        name: user.name,
        sdt: user.sdt,
        email: user.email,
        avt: '',
    });
    const handleSubmit = async () => {
        if (
            !formValues.avt &&
            formValues.name === user.name &&
            formValues.sdt === user.sdt &&
            formValues.email === user.email
        ) {
            return dispatch(addToastMessage('error', 'Thông tin chưa được thay đổi'));
        }
        try {
            const params = new FormData();
            params.append('id', formValues.id);
            params.append('name', formValues.name);
            params.append('sdt', formValues.sdt);
            params.append('email', formValues.email);
            params.append('avt', formValues.avt[0]);
            setLoading(true);
            const res = await userApi.updateInfo(params);
            dispatch(addToastMessage(res[0].status, res[0].message));
            res[0].status === 'success' && dispatch(updateUser(res[1]));
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
                <h3>Thông tin cá nhân</h3>
                <div className={styles.form}>
                    <form onSubmit={(e) => !loading && formSubmit(e, formValues)}>
                        <div className={styles.form_item}>
                            <label htmlFor="name">Họ và tên:</label>
                            <input
                                className={errors.name ? 'error' : ''}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nhập họ và tên..."
                                value={formValues.name}
                                onChange={(e) => handleChangeValues('name', e.target.value)}
                                onBlur={(e) => invalid('name', e.target.value)}
                            />
                            <div className={styles.error}>
                                <p className="txt-error">{errors.name}</p>
                            </div>
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="sdt">Số điện thoại:</label>
                            <input
                                className={errors.sdt ? 'error' : ''}
                                type="text"
                                id="sdt"
                                name="sdt"
                                placeholder="Nhập số điện thoại..."
                                value={formValues.sdt}
                                onChange={(e) => handleChangeValues('sdt', e.target.value)}
                                onBlur={(e) => invalid('sdt', e.target.value)}
                            />
                            <div className={styles.error}>
                                <p className="txt-error">{errors.sdt}</p>
                            </div>
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="email">Email:</label>
                            <input
                                className={errors.email ? 'error' : ''}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Nhập email..."
                                value={formValues.email}
                                onChange={(e) => handleChangeValues('email', e.target.value)}
                                onBlur={(e) => invalid('email', e.target.value)}
                            />
                            <div className={styles.error}>
                                <p className="txt-error">{errors.email}</p>
                            </div>
                        </div>
                        <div className={styles.form_item}>
                            <label htmlFor="avt">Đổi ảnh đại diện:</label>
                            <input
                                className={errors.avt ? 'error' : ''}
                                type="file"
                                id="avt"
                                name="avt"
                                onChange={(e) => handleChangeValues('avt', e.target.files)}
                                onBlur={(e) => invalid('avt', e.target.files)}
                            />
                            <div className={styles.error}>
                                <p className="txt-error">{errors.avt}</p>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <Button blue cursorDefault={loading}>
                                Cập nhập thông tin
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InfoUser;
