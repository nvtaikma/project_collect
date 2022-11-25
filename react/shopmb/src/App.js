import { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from './routes';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/actions/user';
import userApi from './api/user/userApi';

import { DefaultLayout } from './layout';
import LayoutAdmin from './layout/AdminLayout';
import ProfileLayout from './layout/ProfileLayout';
import CheckLogin from './components/CheckLogin';
import AdminAuth from './components/RequiredAuth/AdminAuth';
import PrivateAuth from './components/RequiredAuth/PrivateAuth';
import PageNotFound from './pages/PageNotFound';
import ScrollTop from './components/ScrollTop';
import ToastMessage from './components/ToastMessage';
import BackToTop from './components/BackToTop';
function App() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const [login, setLogin] = useState(false);
    useEffect(() => {
        const getMe = async () => {
            setLogin(false);
            const res = await userApi.getMe();
            dispatch(addUser(res[0]));
            setLogin(true);
        };
        accessToken && getMe();
    }, []);
    return (
        <Router>
            <ScrollTop />
            <ToastMessage />
            <div className="App">
                {accessToken && !login ? (
                    <CheckLogin />
                ) : (
                    <Routes>
                        <Route path="*" element={<PageNotFound />} />
                        {publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            let ToTop = BackToTop;
                            if (route.layout === null) {
                                Layout = Fragment;
                                ToTop = Fragment;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />

                                            <ToTop />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route element={<PrivateAuth />}>
                            {privateRoutes.map((route, index) => {
                                let Layout = DefaultLayout;
                                let ToTop = BackToTop;
                                if (route.layout === null) {
                                    Layout = Fragment;
                                    ToTop = Fragment;
                                }
                                if (route.layout === 'profile') {
                                    Layout = ProfileLayout;
                                }
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />

                                                <ToTop />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                        <Route element={<AdminAuth />}>
                            {adminRoutes.map((route, index) => {
                                let Layout = LayoutAdmin;
                                if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
