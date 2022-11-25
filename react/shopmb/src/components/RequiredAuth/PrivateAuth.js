import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function PrivateAuth() {
    const user = useSelector((state) => state.user.id);
    return user ? <Outlet /> : <Navigate to={'/dang_nhap'} />;
}

export default PrivateAuth;
