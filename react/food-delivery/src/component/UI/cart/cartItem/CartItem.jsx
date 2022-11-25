import React from 'react';
import PropTypes from 'prop-types';

import './CartItem.scss';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../store/reducer';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    // Increase
    const handleIncrease = () => {
        dispatch(
            cartActions.addToCart({
                id: item.id,
                title: item.title,
                image01: item.image01,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
            }),
        );
    };

    // Decrease
    const HandleDecrease = () => {
        dispatch(cartActions.removeCart({ id: item.id }));
    };

    // Delete
    const HandleDelete = () => {
        dispatch(cartActions.deleteCart({ id: item.id }));
    };

    return (
        <div className="cart__item-wrapper d-flex gap-3 mb-2">
            <img src={item.image01} alt="product-img" />

            <div className="cart__item-info d-flex align-items-center justify-content-between gap-4 ">
                <div>
                    <h6 className="cart__item-title">{item.title}</h6>
                    <p className="cart__item-price d-flex align-items-center gap-5">
                        x{item.quantity} <span>${item.totalPrice}</span>
                    </p>

                    <div className="cart__item-calculation d-flex align-items-center justify-content-between gap-3">
                        <RemoveIcon className="icon" onClick={HandleDecrease} />
                        <span>{item.quantity}</span>

                        <AddIcon className="icon" onClick={handleIncrease} />
                    </div>
                </div>
                <span className="cart__item-close d-flex" onClick={HandleDelete}>
                    <CloseOutlinedIcon className="icon" />
                </span>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    items: PropTypes.object,
};

export default CartItem;
