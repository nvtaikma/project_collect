import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Welcome from './Components/Welcome';
import styles from './Profile.module.css';
function Profile() {
    const user = useSelector((state) => state.user);
    return (
        <div className={styles.profile}>
            <Welcome />
            <div className={styles.content}>
                <div className={styles.content_item}>
                    <div className={styles.item} style={{ justifyContent: 'space-between' }}>
                        <h3>Thông tin cá nhân</h3>
                        <Button to={'/profile/cap_nhat_thong_tin_tai_khoan'} small transparent colorBlue>
                            Cập nhật
                        </Button>
                    </div>
                    <div className={styles.item}>
                        <i className="fa-regular fa-user"></i>
                        <strong>{user.name}</strong>
                    </div>
                    <div className={styles.item}>
                        <i className="fa-solid fa-mobile-screen"></i>
                        <span>{user.sdt}</span>
                    </div>
                    <div className={styles.item}>
                        <i className="fa-regular fa-envelope"></i>
                        <span>{user.email}</span>
                    </div>
                </div>
                <div className={styles.content_item}>
                    <div className={styles.item} style={{ justifyContent: 'space-between' }}>
                        <h3>Địa chỉ nhận hàng</h3>
                        <Button to={'/profile'} small transparent colorBlue>
                            Cập nhật
                        </Button>
                    </div>
                    <p style={{ textAlign: 'center', color: '#ccc', paddingTop: '20px' }}>Chưa có địa chỉ mặc định</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
