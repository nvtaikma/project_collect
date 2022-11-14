import { useState, useRef, useEffect } from 'react';
import LayoutLeft from './LayoutLeft';
import LayoutRight from './LayoutRight';
import FadeIn from '../../components/FadeIn';
import styles from './AdminLayout.module.css';
function LayoutAdmin({ children }) {
    const layoutRef = useRef();
    const [showAll, setShowAll] = useState(true);
    const [clientWidth, setClientWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        window.innerWidth < 992 && setIsMobile(true);
        window.addEventListener('resize', EventReSize);
        return () => {
            window.removeEventListener('resize', EventReSize);
        };
    }, []);

    useEffect(() => {
        if (layoutRef.current) {
            setClientWidth(layoutRef.current.offsetWidth);
        }
    }, [showAll]);

    const EventReSize = () => {
        window.innerWidth > 992 && setIsMobile(false);
        window.innerWidth < 992 && setIsMobile(true);
    };
    return (
        <div className={styles.wapper}>
            {isMobile && showMenu && <FadeIn onClick={() => setShowMenu(!showMenu)} />}
            <div
                ref={layoutRef}
                className={`${styles.layout_left} ${showAll ? styles.active : ''} ${showMenu ? styles.show_menu : ''}`}
            >
                <div
                    className={styles.icon}
                    onClick={() => {
                        isMobile ? setShowMenu(!showMenu) : setShowAll(!showAll);
                    }}
                >
                    {isMobile ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    )}
                </div>
                <LayoutLeft showAll={showAll} />
            </div>
            <div
                className={styles.layout_right}
                style={{ paddingLeft: showAll ? `${isMobile ? 0 : 260}px` : `${isMobile ? 0 : 80}px` }}
            >
                <LayoutRight setShowMenu={setShowMenu} showMenu={showMenu} isMobile={isMobile}>
                    {children}
                </LayoutRight>
            </div>
        </div>
    );
}

export default LayoutAdmin;
