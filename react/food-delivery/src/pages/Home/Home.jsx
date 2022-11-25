import React, { useEffect, useState } from 'react';
import './Home.scss';
import Helmet from '../../component/Helmet/Helmet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Category from '../../component/UI/category/Category';
import ProductCard from '../../component/UI/productCard/ProductCard';

import HeroImg from '../../assets/images/hero.png';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import SafetyCheckOutlinedIcon from '@mui/icons-material/SafetyCheckOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

import featureImg01 from '../../assets/images/service-01.png';
import featureImg02 from '../../assets/images/service-02.png';
import featureImg03 from '../../assets/images/service-03.png';
import foodCategoryImg01 from '../../assets/images/hamburger.png';
import foodCategoryImg02 from '../../assets/images/pizza.png';
import foodCategoryImg03 from '../../assets/images/bread.png';
import whyImg from '../../assets/images/location.png';
import testimonialImg from '../../assets/images/network.png';

import products from '../../assets/fake-data/products';
import TestimoniaSlider from '../../component/UI/slider/TestimoniaSlider';

const featureData = [
  {
    title: 'Quick Delivery',
    imgUrl: featureImg01,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.',
  },

  {
    title: 'Super Dine In',
    imgUrl: featureImg02,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.',
  },
  {
    title: 'Easy Pick Up',
    imgUrl: featureImg03,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.',
  },
];

const Home = () => {
  // filter products
  const [category, setCategory] = useState('ALL');
  const [allProducts, setAllProducts] = useState(products);

  // hot pizza
  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const fitterPizza = products.filter((x) => x.category === 'Pizza');
    const slicePizza = fitterPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);

  useEffect(() => {
    if (category === 'ALL') {
      setAllProducts(products);
    }

    if (category === 'BURGER') {
      const filterBurgers = products.filter((x) => x.category === 'Burger');
      setAllProducts(filterBurgers);
    }

    if (category === 'PIZZA') {
      const filterPizzas = products.filter((x) => x.category === 'Pizza');

      setAllProducts(filterPizzas);
    }

    if (category === 'BREAD') {
      const filterBreads = products.filter((x) => x.category === 'Bread');

      setAllProducts(filterBreads);
    }
  }, [category]);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <div className="hero__content">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait <br />
                  food at <span>your door</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint
                  veritatis!
                </p>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <Link to="/foods">
                    <button className="order__btn d-flex align-items-center justify-content-between">
                      Order now
                      <KeyboardArrowRightIcon />
                    </button>
                  </Link>
                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>
                <div className="hero__sevrvice d-flex align-items-center gap-5 mt-5">
                  <p className="d-flex align-items-center gap-2">
                    <DirectionsCarFilledOutlinedIcon className="icon" />
                    No shipping charge
                  </p>

                  <p className="d-flex align-items-center gap-2">
                    <SafetyCheckOutlinedIcon className="icon" />
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={6} md={6}>
              <div className="hero__img">
                <img src={HeroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* category */}
      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <div className="feature__wrapper">
                <h5 className="feature__subtitle mb-4">What we serve</h5>
                <h2 className="feature__title">Just sit back at home</h2>
                <h2 className="feature__title">
                  we will <span>take care</span>
                </h2>
                <p className="mt-4 mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, officiis?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eius.</p>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            {featureData.map((item, index) => (
              <Col key={index} lg={4} md={6}>
                <div className="feature__item text-center py-3">
                  <img src={item.imgUrl} alt={item.title} className="w-25 mb-3" />
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Product Cart */}
      <section>
        <Container>
          <Row>
            <Col lg={12} className=" text-center">
              <h2>Popular Foods</h2>
            </Col>

            <Col lg={12}>
              <div className="food__category d-flex align-items-center justify-content-center gap-4 mb-5">
                <button
                  className={`all__btn ${category === 'ALL' ? 'foodBtn__Active' : ' '}`}
                  onClick={() => setCategory('ALL')}
                >
                  All
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === 'BURGER' ? 'foodBtn__Active' : ' '}`}
                  onClick={() => setCategory('BURGER')}
                >
                  <img src={foodCategoryImg01} alt="burger-img" />
                  Burger
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === 'PIZZA' ? 'foodBtn__Active' : ' '}`}
                  onClick={() => setCategory('PIZZA')}
                >
                  <img src={foodCategoryImg02} alt="pizza-img" />
                  Pizza
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === 'BREAD' ? 'foodBtn__Active' : ' '}`}
                  onClick={() => setCategory('BREAD')}
                >
                  <img src={foodCategoryImg03} alt="bread-img" />
                  Bread
                </button>
              </div>
            </Col>

            {allProducts.map((item, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={6} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* location */}
      <section className="why__tasty">
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <img src={whyImg} alt="location-img" className="w-100" />
            </Col>
            <Col lg={6} md={6}>
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Tasty Treat?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, minus. Tempora reprehenderit a
                  corporis velit, laboriosam vitae ullam, repellat illo sequi odio esse iste fugiat dolor, optio
                  incidunt eligendi deleniti!
                </p>

                <ListGroup className="mt-4">
                  <ListGroup.Item className="border-0 ps-0 bg-transparent">
                    <p className="tasty__title d-flex align-items-center gap-2">
                      <TaskAltOutlinedIcon className="icon" />
                      Fresh and tasty foods
                    </p>
                    <p className="tasty__title-desc">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, voluptatibus.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0 ps-0 bg-transparent">
                    <p className="tasty__title d-flex align-items-center gap-2">
                      <TaskAltOutlinedIcon className="icon" />
                      Quality support
                    </p>
                    <p className="tasty__title-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum.
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-0 ps-0 bg-transparent">
                    <p className="tasty__title d-flex align-items-center gap-2">
                      <TaskAltOutlinedIcon className="icon" />
                      Order from any location
                    </p>
                    <p className="tasty__title-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum.
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* hot pizza */}
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg={12} className="text-center mb-5">
              <h2 className="fw-bold">Hot Pizza</h2>
            </Col>

            {hotPizza.map((item, index) => (
              <Col key={index} lg={3} md={4} sm={6} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial */}
      <section>
        <Container>
          <Row>
            <Col lg={6} md={6}>
              <div className="testimonial ">
                <h5 className="testimonial-subTitle mb-4">Testimonial</h5>
                <h2 className="testimonial-title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial-desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quasi qui minus quos sit
                  perspiciatis inventore quis provident placeat fugiat!
                </p>
                <TestimoniaSlider />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <img src={testimonialImg} alt="Testimonial-img" className="testimonial__img w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
