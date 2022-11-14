import { useRef, useEffect } from 'react';
import style from './starLine.module.css';
function StarLine({ star, percent = 0 }) {
    const b = useRef();
    useEffect(() => {
        b.current.style.width = `${percent}%`;
    }, [percent]);
    return (
        <div className={style.starLine_item}>
            <div className={style.star_number}>
                <span>
                    {star}
                    <i className="fa-solid fa-star"></i>
                </span>
            </div>
            <div className={style.star_line}>
                <b ref={b}></b>
            </div>
            <div className={style.number}>
                <span>{percent}%</span>
            </div>
        </div>
    );
}

export default StarLine;
