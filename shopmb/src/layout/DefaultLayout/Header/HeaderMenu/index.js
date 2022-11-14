import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../../redux/actions/user';

import DropdownMenu from '../DropdownMenu';
import FadeIn from '../../../../components/FadeIn';
import Logo from '../../../../assets/images/icon/logo1.png';
import styles from './HeaderMenu.module.css';
function HeaderMenu({ showMenu, SetShowMenu }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const ref = useRef();
    const [showDropMenu, setShowDropMenu] = useState(false);

    const handleLogOut = () => {
        dispatch(deleteUser());
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
    };
    return (
        <div className={`${styles.header_menu} ${showMenu ? styles.active : ''}`}>
            <div className={styles.mobile}>
                <span>
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </span>
                <i className="fa-solid fa-xmark" onClick={() => SetShowMenu(false)}></i>
            </div>
            <ul className=" custom-scrollbars">
                <li>
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>
                </li>
                <li
                    ref={ref}
                    className={`${styles.dropdown} ${showDropMenu ? styles.active : ''}`}
                    onClick={() => setShowDropMenu((prev) => !prev)}
                >
                    <span>
                        Sản phẩm<i className="fa-solid fa-sort-down"></i>
                    </span>
                    <div className={`${styles.dropdown_menu} container`}>
                        <DropdownMenu />
                    </div>
                </li>
                <li>
                    <Link to="/tin_tuc">
                        <span>Tin tức</span>
                    </Link>
                </li>
                <li>
                    <Link to="/lien_he">
                        <span>Liên hệ</span>
                    </Link>
                </li>
                {user.admin && (
                    <li>
                        <Link to="/admin">
                            <span>Trang Admin</span>
                        </Link>
                    </li>
                )}
                {user.id ? (
                    <>
                        <li className={styles.user}>
                            <Link to="/profile">
                                <span>
                                    <i className="fa-solid fa-circle-user"></i>
                                    Tài khoản của tôi
                                </span>
                            </Link>
                        </li>
                        <li className={styles.user} onClick={handleLogOut}>
                            <span>Đăng xuất</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={styles.user}>
                            <Link to="/dang_nhap">
                                <span>
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                    Đăng nhập
                                </span>
                            </Link>
                        </li>
                        <li className={styles.user} onClick={handleLogOut}>
                            <Link to="/dang_ky">
                                <span>
                                    <i className="fa-solid fa-user-plus"></i>
                                    Đăng ký
                                </span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default HeaderMenu;
