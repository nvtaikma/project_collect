import { useState } from 'react';
import style from './productOption.module.css';
function ProductOption({ label, list, name, state, setState }) {
    const [active, setActive] = useState(0);
    const addClassActive = (index) => {
        setActive(index);
    };
    const setOptionsCart = (index) => {
        setState({ ...state, [name]: list[index] });
    };
    return (
        <div className={style.product_option}>
            <div className={style.label}>
                <strong>{label}</strong>
            </div>
            <div className={style.options}>
                {list.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className={`${style.option} ${active === index && style.active}`}
                            onClick={() => {
                                if (index !== active) {
                                    addClassActive(index);
                                    setOptionsCart(index);
                                }
                            }}
                        >
                            <span className={style.check}>
                                <i className="fa-solid fa-check"></i>
                            </span>
                            <span className={style.text}>{option}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductOption;
