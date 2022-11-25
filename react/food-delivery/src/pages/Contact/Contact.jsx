import React, { useState } from 'react';
import './Contact.scss';
import Helmet from '../../component/Helmet/Helmet';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const contactInfo = [];

  const HandleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPhone('');
    setComments('');

    const userContact = {
      name: name,
      email: email,
      phone: phone,
      comments: comments,
    };

    contactInfo.push(userContact);
    console.log(contactInfo);
    alert('success Thanks you');
  };
  return (
    <Helmet title="Contact">
      <SectionFoods title="Contact" />

      <section>
        <Container>
          <Row>
            <Col lg={8} md={6}>
              <div className="contact">
                <h3 className="mb-4">Contact Us</h3>
                <p>For any query/help, please call: 0333475095 (Everyday, 9 AM- 10 PM)</p>
                <p>
                  Or send us an email: <span>mrphuc48@gmail.com</span>
                </p>

                <div className="contact__location mt-4">
                  <h6>Office Location</h6>
                  <p>Tasty Treat</p>
                  <p>Q7-HO CHI MINH CITY</p>
                </div>
              </div>
              <Form className="form__submit-checkout" onSubmit={HandleSubmit}>
                <FloatingLabel controlId="floatingInput" label="Enter your name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Your phone number" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </FloatingLabel>

                <button type="submit" className="addToCart__btn mt-3">
                  Submit
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
