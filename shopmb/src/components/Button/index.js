import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './button.module.css';
const cx = classNames.bind(style);
function Button({
    to,
    href,
    borderBlue,
    borderRed,
    blue,
    red,
    black,
    gray1,
    transparent,
    blueAdmin,
    blueAdminSub,
    colorBlue,
    colorRed,
    cursorDefault,
    small,
    small1,
    medium,
    large,
    circle1,
    circle2,
    icon,
    onClick,
    children,
    ...passButton
}) {
    let Comp = 'button';
    const _props = {
        onClick,
        ...passButton,
    };
    if (to && !cursorDefault) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }
    const _classNames = cx('wapper', {
        borderBlue,
        borderRed,
        blue,
        red,
        black,
        red,
        gray1,
        transparent,
        blueAdmin,
        blueAdminSub,
        colorBlue,
        colorRed,
        cursorDefault,
        small,
        small1,
        medium,
        large,
        circle1,
        circle2,
        icon,
    });
    return (
        <Comp className={_classNames} {..._props}>
            <span>
                {icon && <i className={icon}></i>}
                {children}
            </span>
        </Comp>
    );
}

export default Button;
