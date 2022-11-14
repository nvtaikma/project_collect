import Loading from '../Loading';
import styles from './CheckLogin.module.css';
function CheckLogin() {
    return (
        <div className={styles.check_login}>
            <div className={styles.box}>
                <Loading count={20} style={{ with: '100px', height: '100px', margin: '0 auto' }} />
                <h1>ShopMB</h1>
                <p>Đang kiểm tra phiên đăng nhập</p>
            </div>
        </div>
    );
}

export default CheckLogin;
