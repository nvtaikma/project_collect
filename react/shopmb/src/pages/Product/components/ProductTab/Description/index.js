import { useState, useRef, useEffect, useContext } from 'react';
import { productProvider } from '../../../productProvider';
import Loading from './Loading';
import Button from '../../../../../components/Button';
import style from './description.module.css';
function Description({ loading }) {
    const productContext = useContext(productProvider);
    const [showContent, setShowContent] = useState(false);
    const desRef = useRef();
    const contentRef = useRef();
    const clickShowContent = () => {
        desRef.current.classList.toggle(style.show);
        if (showContent) {
            handleScrollTop();
        }
        setShowContent((prev) => !prev);
        console.log(showContent);
    };
    const handleScrollTop = () => {
        const timeoutId = setInterval(() => {
            document.documentElement.scrollTop -= 20;
            if (document.documentElement.scrollTop <= desRef.current.offsetTop) {
                clearInterval(timeoutId);
            }
        }, 1);
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div ref={desRef} className={style.description}>
                    <div className={style.title}>
                        <h3>Chi tiết {productContext.name}</h3>
                    </div>
                    <div
                        ref={contentRef}
                        className={style.content}
                        dangerouslySetInnerHTML={{ __html: productContext.des }}
                    ></div>
                    <div className={style.btn}>
                        {!showContent && (
                            <Button icon={'fa-solid fa-angle-up'} blue onClick={clickShowContent}>
                                <span>Xem thêm</span>
                            </Button>
                        )}
                        {showContent && (
                            <Button icon={'fa-solid fa-angle-down'} blue onClick={clickShowContent}>
                                <span className={style.collapse}>Thu gọn</span>
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Description;
