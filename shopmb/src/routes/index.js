// UI client
import Home from '../pages/Home';
import CategoryProduct from '../pages/CategoryProduct';
import Product from '../pages/Product';
import News from '../pages/News';
import CategoryNewsCl from '../pages/News/CategoryNews';
import ViewNews from '../pages/ViewNews';
import Contact from '../pages/Contact';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Serach from '../pages/Search';
import Error403 from '../pages/Error403';

//UI profile
import Profile from '../pages/Profile';
import InfoUser from '../pages/Profile/InfoUser';
import ChangePassword from '../pages/Profile/ChangePassword';
import Order from '../pages/Profile/Order';
import FavouriteProduct from '../pages/Profile/FavouriteProduct';
import RatingProfile from '../pages/Profile/Rating';
import CommentsProfile from '../pages/Profile/Comments';
// UI admin
import Admin from '../pages/Admin';
import LoginAdmin from '../pages/Admin/Login';
import QlProduct from '../pages/Admin/Product';
import QlBrandProduct from '../pages/Admin/BrandProduct';
import QlCategoryProduct from '../pages/Admin/CategoryProduct';
import Orders from '../pages/Admin/Orders';
import Members from '../pages/Admin/Members';
import CategoryNews from '../pages/Admin/CategoryNews';
import NewsAdmin from '../pages/Admin/News';
import ContactAdmin from '../pages/Admin/Contact';
import Comments from '../pages/Admin/Comments';
import Rating from '../pages/Admin/Rating';
import Banner from '../pages/Admin/Banner';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/dang_ky', component: Register, layout: null },
    { path: '/dang_nhap', component: Login, layout: null },
    { path: '/danh_muc/:id', component: CategoryProduct },
    { path: '/tin_tuc', component: News },
    { path: '/tin_tuc/danh_muc/:id', component: CategoryNewsCl },
    { path: '/xem_tin_tuc/:id', component: ViewNews },
    { path: '/tim_kiem/:name', component: Serach },
    { path: '/error403', component: Error403, layout: null },
];
const privateRoutes = [
    { path: '/product/:id', component: Product },
    { path: '/lien_he', component: Contact },
    { path: '/gio_hang', component: Cart },
    { path: '/profile', component: Profile, layout: 'profile' },
    { path: '/profile/cap_nhat_thong_tin_tai_khoan', component: InfoUser, layout: 'profile' },
    { path: '/profile/thay_doi_mat_khau', component: ChangePassword, layout: 'profile' },
    { path: '/profile/don_hang', component: Order, layout: 'profile' },
    { path: '/profile/san_pham_yeu_thich', component: FavouriteProduct, layout: 'profile' },
    { path: '/profile/danh_gia', component: RatingProfile, layout: 'profile' },
    { path: '/profile/binh_luan', component: CommentsProfile, layout: 'profile' },
];

const adminRoutes = [
    { path: '/admin', component: Admin, layout: 'admin' },
    { path: '/admin/login', component: LoginAdmin, layout: null },
    { path: '/admin/san_pham', component: QlProduct, layout: 'admin' },
    { path: '/admin/nhan_hang', component: QlBrandProduct, layout: 'admin' },
    { path: '/admin/danh_muc/', component: QlCategoryProduct, layout: 'admin' },
    { path: '/admin/don_hang', component: Orders, layout: 'admin' },
    { path: '/admin/thanh_vien', component: Members, layout: 'admin' },
    { path: '/admin/danh_muc_tin_tuc', component: CategoryNews, layout: 'admin' },
    { path: '/admin/tin_tuc', component: NewsAdmin, layout: 'admin' },
    { path: '/admin/lien_he', component: ContactAdmin, layout: 'admin' },
    { path: '/admin/binh_luan', component: Comments, layout: 'admin' },
    { path: '/admin/danh_gia', component: Rating, layout: 'admin' },
    { path: '/admin/banner', component: Banner, layout: 'admin' },
];
export { publicRoutes, privateRoutes, adminRoutes };
