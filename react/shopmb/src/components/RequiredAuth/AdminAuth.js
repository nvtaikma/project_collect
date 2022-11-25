import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function AdminAuth() {
    const isAdmin = useSelector((state) => state.user.admin);
    return isAdmin ? (
        <Outlet />
    ) : (
        <>
            {alert('Bạn chưa đăng nhập hoặc tài khoản của bạn không có quyền truy cập')} <Navigate to={'/'} />
        </>
    );
}

export default AdminAuth;
