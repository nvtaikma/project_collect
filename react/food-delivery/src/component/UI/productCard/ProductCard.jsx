import React from 'react';
import PropTypes from 'prop-types';

import './ProductCard.scss';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/reducer';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const HandleAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        id: item.id,
        title: item.title,
        image01: item.image01,
        price: item.price,
      }),
    );
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={item.image01} alt="Product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${item.id}`}>{item.title}</Link>
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price">${item.price}</span>
          <button className="addToCart__btns" onClick={HandleAddToCart}>
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  items: PropTypes.object,
};

export default ProductCard;
