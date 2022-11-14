import { useState, useEffect } from 'react';
import categoryApi from '../../../../api/news/category';
import { NavLink } from 'react-router-dom';

import styles from './MenuTop.module.css';
function MenuTop() {
    const [listCategory, SetListCategory] = useState([]);
    const [showMenu, SetShowMenu] = useState(false);
    const [payload, Setpayload] = useState({
        limit: 6,
        status: 0,
    });
    useEffect(() => {
        const getCategoryNews = async () => {
            try {
                const res = await categoryApi.get(payload);
                SetListCategory(res[0].data);
            } catch (error) {
                console.log(error);
            }
        };
        getCategoryNews();
    }, []);
    const toggleShowMenu = () => {
        SetShowMenu(!showMenu);
    };
    return (
        <>
            {/* {showMenu && <FadeIn style={{ zIndex: '10' }} />} */}
            <div className={styles.inline_menu}>
                <div className={styles.mobile} onClick={toggleShowMenu}>
                    <span>
                        {showMenu ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-list"></i>}
                        Danh mục tin tức
                    </span>
                </div>
                <ul className={showMenu ? styles.active : ''}>
                    <li>
                        <NavLink
                            to={'/tin_tuc'}
                            className={(nav) => {
                                if (nav.isActive) {
                                    return styles.active;
                                }
                            }}
                            end
                        >
                            TIN MỚI
                        </NavLink>
                    </li>
                    {listCategory.length > 0 &&
                        listCategory.map((item) => {
                            return (
                                <li key={item.id}>
                                    <NavLink
                                        to={`/tin_tuc/danh_muc/${item.id}`}
                                        className={(nav) => {
                                            if (nav.isActive) {
                                                return styles.active;
                                            }
                                        }}
                                        end
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

export default MenuTop;
