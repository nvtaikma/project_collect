import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import Logo from '../../../assets/images/icon/logo1.png';
import Logo2 from '../../../assets/images/icon/logo2.png';
import styles from './LayoutLeft.module.css';
function LayoutLeft({ showAll }) {
    return (
        <div className={styles.dashboard}>
            <div className={styles.logo}>
                <Link to={'/'}>
                    <img src={showAll ? Logo : Logo2} alt="" />
                </Link>
            </div>
            <div className={`${styles.dashboard_menu} ${showAll ? '' : styles.hide} custom-scrollbars`}>
                <ul>
                    <MenuItem to={'/admin'} icon={'fa-solid fa-house-chimney'} label={'Trang chủ'}></MenuItem>
                    <MenuItem
                        icon={'fa fa-database'}
                        label={'Quản lý sản phẩm'}
                        dropMenu={[
                            { to: '/admin/danh_muc', label: 'Danh mục' },
                            { to: '/admin/nhan_hang', label: 'Nhãn hàng' },
                            { to: '/admin/san_pham', label: 'Sản phẩm' },
                        ]}
                    ></MenuItem>
                    <MenuItem to={'/admin/don_hang'} icon={'fa fa-shopping-bag'} label={' Quản lý đơn hàng'}></MenuItem>
                    <MenuItem
                        to={'/admin/thanh_vien'}
                        icon={'fa-solid fa-users'}
                        label={'Quản lý người dùng'}
                    ></MenuItem>
                    <MenuItem
                        icon={'fa-solid fa-book'}
                        label={'Quản lý tin tức'}
                        dropMenu={[
                            { to: '/admin/danh_muc_tin_tuc', label: 'Danh mục tin tức' },
                            { to: '/admin/tin_tuc', label: 'Tin tức' },
                        ]}
                    ></MenuItem>
                    <MenuItem
                        icon={'fa-solid fa-comment-dots'}
                        label={'Quản lý bình luận'}
                        dropMenu={[
                            { to: '/admin/binh_luan', label: 'Bình luận' },
                            { to: '/admin/danh_gia', label: 'Đánh giá' },
                        ]}
                    ></MenuItem>
                    <MenuItem to={'/admin/lien_he'} icon={'fa-solid fa-envelope'} label={'Quản lý liên hệ'}></MenuItem>
                    <MenuItem to={'/admin/banner'} icon={'fa-solid fa-image'} label={'Banner'}></MenuItem>
                </ul>
            </div>
        </div>
    );
}

export default LayoutLeft;
