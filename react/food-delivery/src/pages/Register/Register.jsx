import React from 'react';
import './Register.scss';

import Helmet from '../../component/Helmet/Helmet';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Helmet title="Register">
      <SectionFoods title="Register" />

      <section>
        <Container>
          <Row>
            <Col lg={6} md={6} sm={12} className="m-auto text-center">
              <Form className="form__submit mb-5" onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error ? <p className="error">{error}</p> : null}
                <p className="account__text">
                  Already have an account? <Link to="/login">Login now.</Link>
                </p>
                <button type="submit" className="addToCart__btn w-50">
                  Register
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
