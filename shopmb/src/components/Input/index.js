import classNames from 'classnames/bind';
import style from './input.module.css';

const cx = classNames.bind(style);

function Input({ textarea, select, children, ...passInput }) {
    let Comp = 'input';
    const _props = {
        ...passInput,
    };
    if (textarea) {
        Comp = 'textarea';
    } else if (select) {
        Comp = 'select';
    }
    const _className = cx('wapper');
    return (
        <Comp className={_className} {..._props}>
            {children}
        </Comp>
    );
}

export default Input;
