import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions/user';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../assets/images/icon/logo1.png';
import img from '../../assets/images/icon/eror403.png';
import styles from './Error403.module.css';
function Error403() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    useEffect(() => {
        accessToken ? navigate('/') : dispatch(deleteUser());
    }, []);
    return (
        <div className="container">
            <div className={styles.box}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className={styles.not_found}>
                    <img src={img} alt="" />
                </div>
                <div className={styles.text}>
                    <strong>RẤT TIẾC, PHIÊN ĐĂNG NHẬP CỦA BẠN ĐÃ HẾT HẠN</strong>
                </div>
                <div className={styles.button}>
                    <Button to={'/dang_nhap'} medium transparent borderBlue colorBlue>
                        QUAY VỀ TRANG ĐĂNG NHẬP
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Error403;
