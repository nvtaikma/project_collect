import { useSelector } from 'react-redux';
import { renderAvt } from '../../hooks/useFormat';
import DefaultLayout from '../DefaultLayout';
import MenuItem from '../../pages/Profile/Components/MenuItem';
import Path from '../../components/Path';
import styles from './ProfileLayout.module.css';
function ProfileLayout({ children }) {
    const user = useSelector((state) => state.user);
    return (
        <DefaultLayout>
            <Path list={[{ _name: 'Thông tin cá nhân', path: '/profile' }]} />
            <div className={`container row ${styles.block}`}>
                <div className={`${styles.nav} col`}>
                    <div className={`${styles.accountInfo} row`}>
                        <div className={styles.img}>
                            <img src={renderAvt(user.avt)} alt="" />
                        </div>
                        <div className={styles.name}>
                            <p>Chào bạn,</p>
                            <strong>{user.name}</strong>
                        </div>
                    </div>
                    <div className={styles.profileMenu}>
                        <ul>
                            <MenuItem
                                path="/profile/don_hang"
                                text="Quản lý đơn hàng"
                                icon="fa-solid fa-calendar-days"
                            />
                            <MenuItem
                                path="/profile"
                                text="Quản lý thông tin"
                                icon="fa-regular fa-user"
                                list={[
                                    { name: 'Thông tin tài khoản', path: '/profile/cap_nhat_thong_tin_tai_khoan' },
                                    { name: 'Thay đổi mật khẩu', path: '/profile/thay_doi_mat_khau' },
                                ]}
                            />
                            <MenuItem
                                text="HOẠT ĐỘNG CỦA BẠN"
                                icon="fa-regular fa-clock"
                                list={[
                                    { name: 'Sản phẩm yêu thích', path: '/profile/san_pham_yeu_thich' },
                                    { name: 'Đánh giá của tôi', path: '/profile/danh_gia' },
                                    { name: 'Bình luận của tôi', path: '/profile/binh_luan' },
                                ]}
                            />
                            <MenuItem
                                path="/profile/quan_ly_giam_gia"
                                text="QUẢN LÝ MÃ GIẢM GIÁ"
                                icon="fa-solid fa-pen"
                            />
                        </ul>
                    </div>
                </div>
                <div className={`${styles.content} col`}>{children}</div>
            </div>
        </DefaultLayout>
    );
}

export default ProfileLayout;
