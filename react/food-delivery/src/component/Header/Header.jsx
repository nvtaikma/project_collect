import React, { useRef, useState, useEffect } from 'react';
import './Header.scss';
import Container from 'react-bootstrap/Container';
import logo from '../../assets/images/res-logo.png';
import { NavLink, Link } from 'react-router-dom';

import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Tippy from '@tippyjs/react/headless';

import { auth } from '../../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/reducer';
import { userActions } from '../../store/userSlice';

const nav__links = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Foods',
    path: '/foods',
  },
  {
    display: 'Cart',
    path: '/cart',
  },
  {
    display: 'Contact',
    path: '/contact',
  },
];

const Header = () => {
  const user = useSelector((state) => state.user.user);

  const [scroll, setScroll] = useState(false);
  const showMenuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Show cart ui
  const HandleShowCartUi = () => {
    dispatch(cartActions.toggleCart());
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const ToggleMenu = () => {
    showMenuRef.current.classList.toggle('show__menu');
  };

  window.onscroll = () => {
    setScroll(window.scrollY > 80 ? true : false);
    return () => window.onscroll(null);
  };

  const HandleLogOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          userActions.login({
            email: currentUser.email,
          }),
        );
      } else {
        dispatch(userActions.logout());
      }
    });

    return () => {
      unSubscribed();
    };
  }, [dispatch]);

  return (
    <header className={`Header ${scroll ? 'Header__shrink' : ''} `}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-center justify-content-between">
          <div className="logo text-center">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h5>Tasty Treat</h5>
            </Link>
          </div>

          {/* Menu */}
          <div className="navigation" ref={showMenuRef} onClick={ToggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink to={item.path} key={index} className={(navClass) => (navClass.isActive ? 'active__menu' : '')}>
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* nav right icons */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon">
              <ShoppingBasketOutlinedIcon className="icon" onClick={HandleShowCartUi} />

              {totalQuantity >= 1 ? <span className="cart__badge">{totalQuantity}</span> : null}
            </span>

            <span className="user">
              <Tippy
                inertia
                interactive
                delay={[0, 700]}
                placement="bottom"
                render={(attrs) => (
                  <div className="user__list" tabIndex="-1" {...attrs}>
                    <div className="user__items d-flex flex-column ">
                      {user?.email ? (
                        <span onClick={HandleLogOut}>Logout</span>
                      ) : (
                        <>
                          <span>
                            <Link to="/login">Login</Link>
                          </span>
                          <span>
                            <Link to="/register">Register</Link>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              >
                {user?.email ? <PersonOutlineIcon className="icon" /> : <PersonOffOutlinedIcon className="icon" />}
              </Tippy>
            </span>

            {/* Mobile Menu */}
            <span className="mobile__menu" onClick={ToggleMenu}>
              <MenuIcon className="icon" />
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
