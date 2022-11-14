import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MenuItem.module.css';
function MenuItem({ path, text, icon, list = [] }) {
    let Comp = Fragment;
    if (path) {
        Comp = NavLink;
    }
    return (
        <li className={styles.item}>
            {path ? (
                <NavLink
                    to={path}
                    className={(nav) => {
                        if (nav.isActive) {
                            return styles.active;
                        }
                    }}
                    end
                >
                    <span>
                        <i className={icon}></i>
                        {text}
                    </span>
                </NavLink>
            ) : (
                <span>
                    <i className={icon}></i>
                    {text}
                </span>
            )}

            {list.length > 0 && (
                <ul>
                    {list.map((item, index) => {
                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={(nav) => {
                                        if (nav.isActive) {
                                            return styles.active;
                                        }
                                    }}
                                    end
                                >
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

export default MenuItem;
