import React, { useState } from 'react';
import './Checkout.scss';
import Helmet from '../../component/Helmet/Helmet';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { useSelector } from 'react-redux';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const shippingInfo = [];

  const subTotal = useSelector((state) => state.cart.totalAmount);
  const shipping = 10;

  const TotalAmount = subTotal + Number(shipping);

  const HandleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setCity('');
    setPostalCode('');

    const userShippingAddress = {
      name: name,
      email: email,
      phone: phone,
      country: country,
      city: city,
      postalCode: postalCode,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
    alert('success Thanks you');
  };
  return (
    <Helmet title="Checkout">
      <SectionFoods title="Checkout" />

      <section>
        <Container>
          <Row>
            <Col lg={8} md={6}>
              <h6 className="mb-4">Shipping Address</h6>
              <Form className="form__submit-checkout" onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupNumber">
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupCountry">
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupCity">
                  <Form.Control type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupNumber">
                  <Form.Control
                    type="number"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Form.Group>

                <button type="submit" className="addToCart__btn mt-2">
                  Payment
                </button>
              </Form>
            </Col>
            <Col lg={4} md={6}>
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${subTotal}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shipping}</span>
                </h6>

                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${TotalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
