import React from 'react';
import './Cart.scss';
import Helmet from '../../component/Helmet/Helmet';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';
import TableTr from '../../component/UI/tableITr/TableITr';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const productCart = useSelector((state) => state.cart.cartItems);
  const subTotalCart = useSelector((state) => state.cart.totalAmount);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const HandleCheckout = () => {
    if (!user?.email) {
      alert('Please log in  to checkout');
    } else {
      navigate('/checkout');
    }
  };
  return (
    <Helmet title="your-cart">
      <SectionFoods title="Your Cart" />

      <section>
        <Container>
          <Row>
            <Col lg={12}>
              {productCart.length === 0 ? (
                <h5 className="text-center fw-bold">
                  Your cart is empty <ProductionQuantityLimitsOutlinedIcon className="fs-2" />
                </h5>
              ) : (
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCart.map((item, index) => (
                      <TableTr key={index} item={item} />
                    ))}
                  </tbody>
                </Table>
              )}

              <div className="subtotal mt-5">
                <h6>
                  Subtotal: <span>${subTotalCart}</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn d-flex gap-3">
                  <button className="addToCart__btn">
                    <Link to="/foods">Continue shopping</Link>
                  </button>
                  <button className="addToCart__btn" onClick={HandleCheckout}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
