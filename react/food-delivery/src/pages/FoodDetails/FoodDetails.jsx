import React from 'react';
import './FoodDetails.scss';
import { useParams } from 'react-router-dom';
import products from '../../assets/fake-data/products';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';
import Helmet from '../../component/Helmet/Helmet';
import ProductCard from '../../component/UI/productCard/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/reducer';

const FoodDetails = () => {
  const [tab, setTab] = useState('desc');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const userFeedback = [];
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [previewImg, setPreviewImg] = useState(product.image01);

  // filter related with product and slice
  const relatedProduct = products.filter((item) => item.category === product.category);
  const sliceRelatedProduct = relatedProduct.slice(0, 4);

  useEffect(() => {
    setPreviewImg(product.image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  // Handle
  const HandleAddToCart = () => {
    dispatch(
      cartActions.addToCart({
        id: product.id,
        title: product.title,
        image01: product.image01,
        price: product.price,
      }),
    );
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setNameValue('');
    setEmailValue('');
    setContentValue('');

    const feedback = {
      name: nameValue,
      email: emailValue,
      content: contentValue,
    };
    userFeedback.push(feedback);
    console.log(userFeedback);
    alert('success Thanks you');
  };

  return (
    <Helmet title="Food-Details">
      {/* IMG background */}
      <SectionFoods title={product.title} />

      <section>
        <Container>
          <Row>
            <Col lg={2} md={2}>
              <div className="product__imgs">
                <div className="img__item mb-4" onClick={() => setPreviewImg(product.image01)}>
                  <img src={product.image01} alt="product-img" className="w-50" />
                </div>
                <div className="img__item mb-4" onClick={() => setPreviewImg(product.image02)}>
                  <img src={product.image02} alt="product-img" className="w-50" />
                </div>
                <div className="img__item mb-4" onClick={() => setPreviewImg(product.image03)}>
                  <img src={product.image03} alt="product-img" className="w-50" />
                </div>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className="product__main-img">
                <img src={previewImg} alt="product-img" className="w-100" />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="single__product-content">
                <h2 className="product__title mb-3">{product.title}</h2>
                <span className="product__price">
                  Price: <span>${product.price}</span>
                </span>
                <p className="product__category mb-5">
                  Category: <span>{product.category}</span>
                </p>
                <button className="addToCart__btn" onClick={HandleAddToCart}>
                  Add to cart
                </button>
              </div>
            </Col>

            <Col lg={12} md={12}>
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6 className={`${tab === 'desc' && 'tabs-active'}`} onClick={() => setTab('desc')}>
                  Description
                </h6>
                <h6 className={`${tab === 'rev' && 'tabs-active'}`} onClick={() => setTab('rev')}>
                  Review
                </h6>
              </div>

              {tab === 'desc' ? (
                <div className="tabs__desc">
                  <p>{product.desc}</p>
                </div>
              ) : (
                <div className="tabs__form my-5">
                  <div className="review">
                    <p className="user__name mb-0">Thành Phúc</p>
                    <p className="user__email">email: mrphuc48@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <form className="form__submit" onSubmit={HandleSubmit}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                      />
                    </div>
                    <div className="form__group">
                      <textarea
                        type="text"
                        placeholder="Enter your content"
                        rows={5}
                        required
                        value={contentValue}
                        onChange={(e) => setContentValue(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="addToCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            {/* Related-Product */}
            <Col lg={12} className="mb-3">
              <h2 className="related__product-title">You might also like</h2>
            </Col>

            {sliceRelatedProduct.map((item, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={6} className="mt-4">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
