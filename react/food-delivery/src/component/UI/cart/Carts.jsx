import React from 'react';
import './Carts.scss';
import CartItem from './cartItem/CartItem';
import ListGroup from 'react-bootstrap/ListGroup';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../../store/reducer';
import { useNavigate } from 'react-router-dom';

const Carts = () => {
  const dispatch = useDispatch();
  const renderCart = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const TotalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // hidden cart ui
  const HandleShowCartUi = () => {
    dispatch(cartActions.toggleCart());
  };

  const HandleCheckout = () => {
    if (!user?.email) {
      alert('Please log in  to checkout');
    } else {
      navigate('/checkout');
      dispatch(cartActions.toggleCart());
    }
  };

  return (
    <div className="cart__container">
      <ListGroup className="cart__list">
        <div className="cart__close">
          <CancelRoundedIcon className="icon" onClick={HandleShowCartUi} />
        </div>

        <ListGroup.Item className="cart__list-items border-0 bg-transparent">
          {renderCart.length === 0 ? (
            <div className="cart__list-noCart d-flex justify-content-center align-items-center flex-column gap-3">
              <h6>
                No item add to the cart <SentimentVeryDissatisfiedIcon />
              </h6>
              <ProductionQuantityLimitsIcon className="icon" />
            </div>
          ) : (
            renderCart.map((item, index) => <CartItem item={item} key={index} />)
          )}
        </ListGroup.Item>

        <div className="cart__amount d-flex justify-content-between align-items-center gap-5">
          <div className="cart__amount-subtotal">
            <h6>
              Subtotal quantity: <span>{totalQuantity}</span>
            </h6>

            <h6>
              Subtotal amount: <span>${TotalAmount}</span>
            </h6>
          </div>

          <button className="cart__amount-checkout" onClick={HandleCheckout}>
            Check out
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
