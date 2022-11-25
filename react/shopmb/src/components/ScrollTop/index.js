import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
function ScrollTop() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return <></>;
}

export default ScrollTop;
