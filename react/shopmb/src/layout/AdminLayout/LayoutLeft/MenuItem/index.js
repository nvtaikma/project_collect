import { Link, NavLink } from 'react-router-dom';
import { Fragment, useState, useRef } from 'react';
import style from './MenuItem.module.css';
function MenuItem({ to, icon, label, active, dropMenu }) {
    const [openMenu, SetOpenMenu] = useState(false);
    const menuRef = useRef(null);
    const iconRef = useRef(null);
    const handleOnClick = () => {
        if (!openMenu) {
            const heightLi = menuRef.current.childNodes[0].offsetHeight;
            const listLi = menuRef.current.childNodes.length;
            menuRef.current.style.height = `${heightLi * listLi}px`;
            iconRef.current.style.transform = 'rotate(90deg)';
            SetOpenMenu(!openMenu);
        } else {
            menuRef.current.style.height = '0px';
            iconRef.current.style.transform = 'rotate(0deg)';
            SetOpenMenu(!openMenu);
        }
    };
    if (to) {
        return (
            <li className={style.wapper}>
                <NavLink
                    to={to}
                    className={(nav) => {
                        if (nav.isActive) {
                            return style.active;
                        }
                    }}
                    end
                >
                    <label>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </label>
                </NavLink>
            </li>
        );
    } else {
        return (
            <li className={style.wapper}>
                <Fragment>
                    <label htmlFor="" onClick={handleOnClick}>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </label>
                    {dropMenu && (
                        <div ref={iconRef} className={style.icon} onClick={handleOnClick}>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    )}
                    {dropMenu && (
                        <ul ref={menuRef} className={style.dropMenu}>
                            {dropMenu.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <NavLink
                                            to={item.to}
                                            className={(nav) => {
                                                if (nav.isActive) {
                                                    return style.active;
                                                }
                                            }}
                                        >
                                            <i className="fa-solid fa-o"></i>
                                            {item.label}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </Fragment>
            </li>
        );
    }
}

export default MenuItem;
