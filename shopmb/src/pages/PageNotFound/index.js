import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../assets/images/icon/logo1.png';
import img from '../../assets/images/icon/404notFound.png';
import styles from './PageNotFound.module.css';
function PageNotFound() {
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
                    <strong>RẤT TIẾC, TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI</strong>
                </div>
                <div className={styles.button}>
                    <Button to={'/'} medium transparent borderBlue colorBlue>
                        QUAY VỀ TRANG CHỦ
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
