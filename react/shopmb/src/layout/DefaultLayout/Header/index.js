import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FadeIn from '../../../components/FadeIn';
import HeaderMenu from './HeaderMenu';
import HeaderTools from './HeaderTools';
import Logo from '../../../assets/images/icon/logo1.png';
import styles from './header.module.css';

function Header() {
    const user = useSelector((state) => state.user);
    const [fixed, setFixed] = useState(false);
    const [showMenu, SetShowMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', showClassFixed);
        window.addEventListener('resize', handleChangeScreenWidth);
        return () => {
            window.removeEventListener('scroll', showClassFixed);
            window.removeEventListener('resize', handleChangeScreenWidth);
        };
    }, []);

    useEffect(() => {
        screenWidth <= 1024 ? setIsMobile(true) : setIsMobile(false);
    }, [screenWidth]);
    const handleChangeScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    const showClassFixed = () => {
        if (window.scrollY > 300) {
            setFixed(true);
        } else {
            setFixed(false);
        }
    };
    return (
        <header>
            {user.id && (
                <div className={styles.header_top}>
                    <div className={styles.item}>
                        <label>Liên hệ: </label>
                        <ul>
                            <li>
                                <i className="fa-brands fa-facebook"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-instagram"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-twitter"></i>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.item}>
                        <p>Chào mừng bạn đến với ShopMB</p>
                    </div>
                    <div className={styles.item}>
                        <span>Hotline: 0938.049.434</span>
                    </div>
                </div>
            )}

            <div className={`${styles.wapper_nav_content} ${fixed && styles.fixed}`}>
                <div className={`${styles.row} container`}>
                    <div className={styles.iconMenu} onClick={() => SetShowMenu(true)}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className={styles.header_logo}>
                        <Link to="/">
                            <img src={Logo} />
                        </Link>
                    </div>
                    {isMobile && showMenu && <FadeIn onClick={() => SetShowMenu(false)} />}
                    <HeaderMenu showMenu={showMenu} SetShowMenu={SetShowMenu} />
                    <HeaderTools />
                </div>
            </div>
        </header>
    );
}

export default Header;
