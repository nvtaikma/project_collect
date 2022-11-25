import React from 'react';
import './Footer.scss';
import logo from '../../assets/images/res-logo.png';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={3} md={4} sm={6}>
            <div className="logo footer__logo text-start">
              <img src={logo} alt="logo" />
              <h5>Tasty Treat</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt pariatur accusamus</p>
            </div>
          </Col>
          <Col lg={3} md={4} sm={6} className="delivery-align">
            <h5 className="footer__title">Delivery Time</h5>
            <ListGroup className="delivery__time-list">
              <ListGroup.Item className="delivery__time-item border-0 ps-0">
                <span>Sunday - Thursday</span>
                <p>10:00am - 11:00pm</p>
              </ListGroup.Item>
              <ListGroup.Item className="delivery__time-item border-0 ps-0">
                <span>Friday - Saturday</span>
                <p>Off day</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3} md={4} sm={6}>
            <h5 className="footer__title">Contact</h5>
            <ListGroup className="delivery__time-list">
              <ListGroup.Item className="delivery__time-item border-0 ps-0">
                <p>Location:Q7-Hồ Chí Minh city </p>
              </ListGroup.Item>
              <ListGroup.Item className="delivery__time-item border-0 ps-0">
                <span>Phone: 0333475095</span>
              </ListGroup.Item>
              <ListGroup.Item className="delivery__time-item border-0 ps-0">
                <span>Email: mrphuc48@gmail.com</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3} md={4} sm={6}>
            <h5 className="footer__title">Newsletter</h5>
            <p>Subscribe our newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <span>
                <SendOutlinedIcon className="icon" />
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg={6} md={6} sm={6}>
            <p className="copyright">Copyright - 2022, website made by Thành Phúc. All Rights Reserved.</p>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <div className="social__links d-flex align-items-center justify-content-end gap-4">
              <p className="m-0">Follow:</p>
              <span>
                <Link to="https://www.facebook.com/profile.php?id=100030760065201">
                  <FacebookOutlinedIcon className="icon" />
                </Link>
              </span>
              <span>
                <Link to="https://github.com/PhucSmile?tab=repositories">
                  <GitHubIcon className="icon" />
                </Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
