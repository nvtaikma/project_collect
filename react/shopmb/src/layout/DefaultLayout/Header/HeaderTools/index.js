import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../../redux/actions/user';
import productApi from '../../../../api/product/productApi';

import FadeIn from '../../../../components/FadeIn';
import SuggestBox from '../../../../components/SuggestBox';
import Loading from '../../../../pages/Admin/Components/ModalConfirm/Loading';
import Button from '../../../../components/Button';
import style from './headerTools.module.css';

function HeaderTools() {
    const dispatch = useDispatch();
    const listCartProduct = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.user);
    const countProductInCart =
        listCartProduct.length > 0
            ? listCartProduct.reduce((total, item) => {
                  return (total += item.qty);
              }, 0)
            : 0;
    const inputRef = useRef();
    const countTotalCartRef = useRef();
    const [showSearch, setShowSearch] = useState(false);
    const [showSuggestBox, setShowSuggestBox] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [payload, setPayload] = useState({
        name: '',
        page: 1,
        limit: 4,
    });
    useEffect(() => {
        if (countTotalCartRef.current) {
            countTotalCartRef.current.classList.add(style.active);
            setTimeout(() => {
                countTotalCartRef.current.classList.remove(style.active);
            }, 3000);
        }
    }, [countProductInCart]);
    useEffect(() => {
        const timeId = setTimeout(() => {
            const value = payload.name.trim();
            if (value) {
                const getProduct = async () => {
                    setLoading(true);
                    const reponse = await productApi.get(payload);
                    setProduct(reponse[0].data);
                    setLoading(false);
                    setShowSuggestBox(true);
                };
                getProduct();
            } else {
                setShowSuggestBox(false);
            }
        }, 700);
        return () => {
            clearTimeout(timeId);
        };
    }, [payload]);
    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, [showSearch]);
    const searchToggle = () => {
        setShowSearch((prev) => !prev);
    };
    const handleClearValue = () => {
        setPayload({ ...payload, name: '' });
        inputRef.current && inputRef.current.focus();
    };
    const handleLogOut = () => {
        dispatch(deleteUser());
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
    };
    return (
        <div className={style.header_tools}>
            <ul id={style.parent}>
                <li id={style.myAccount}>
                    <Button transparent>
                        <i className="fa-regular fa-user"></i>
                    </Button>
                    {user.id ? (
                        <div className={style.myAccount_menu}>
                            <ul>
                                <li>
                                    <Button to={'/profile'} transparent>
                                        <i className="fa-solid fa-address-card"></i>Tài khoản
                                    </Button>
                                </li>
                                <li>
                                    <Button transparent onClick={handleLogOut}>
                                        <i className="fa-solid fa-right-to-bracket"></i>Đăng xuất
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className={style.myAccount_menu}>
                            <ul>
                                <li>
                                    <Button to={'/dang_ky'} transparent>
                                        <i className="fa-solid fa-address-card"></i>Đăng ký
                                    </Button>
                                </li>
                                <li>
                                    <Button to={'/dang_nhap'} transparent>
                                        <i className="fa-solid fa-right-to-bracket"></i>Đăng nhập
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    )}
                </li>
                <li id={style.search}>
                    <Button transparent onClick={searchToggle}>
                        {showSearch ? (
                            <i className="fa-solid fa-xmark"></i>
                        ) : (
                            <i className="fa-solid fa-magnifying-glass"></i>
                        )}
                    </Button>
                    {showSearch && (
                        <>
                            <FadeIn onClick={() => setShowSearch(false)} />
                            <div className={`${style.search_toggle}`}>
                                <div className={style.searchBox}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Nhập tên sản phẩm tìm kiếm..."
                                        value={payload.name}
                                        onChange={(e) => {
                                            setPayload({ ...payload, name: e.target.value });
                                        }}
                                    />
                                    {payload.name && (
                                        <Button small transparent onClick={handleClearValue}>
                                            {isLoading ? <Loading /> : <i className="fa-regular fa-circle-xmark"></i>}
                                        </Button>
                                    )}
                                </div>
                                {showSuggestBox && (
                                    <SuggestBox
                                        data={product}
                                        loading={isLoading}
                                        closeSearch={setShowSearch}
                                        payload={payload}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </li>
                <li className={style.cart}>
                    {listCartProduct.length > 0 && <p ref={countTotalCartRef}>{countProductInCart}</p>}
                    <Button to={'/gio_hang'}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default HeaderTools;
