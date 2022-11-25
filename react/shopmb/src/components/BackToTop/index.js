import { useEffect, useState } from 'react';
import Button from '../Button';
import style from './backtotop.module.css';
function BackToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', showBtnToTop);
        return () => window.removeEventListener('scroll', handleScrollTop);
    }, []);
    const showBtnToTop = () => {
        if (window.scrollY > 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    };
    const handleScrollTop = () => {
        let timeoutId = setInterval(() => {
            document.documentElement.scrollTop -= 50;
            if (document.documentElement.scrollTop === 0) {
                clearInterval(timeoutId);
            }
        }, 1);
    };
    return (
        <div className={`${style.back_to_top} ${show && style.show}`}>
            <Button circle2 onClick={handleScrollTop}>
                <i className="fa-solid fa-arrow-up"></i>
            </Button>
        </div>
    );
}

export default BackToTop;
