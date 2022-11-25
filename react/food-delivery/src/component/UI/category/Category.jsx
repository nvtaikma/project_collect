import React from 'react';
import './Category.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import categoryImg01 from '../../../assets/images/category-01.png';
import categoryImg02 from '../../../assets/images/category-02.png';
import categoryImg03 from '../../../assets/images/category-03.png';
import categoryImg04 from '../../../assets/images/category-04.png';

const categoryData = [
    {
        display: 'Fastfood',
        imgUrl: categoryImg01,
    },
    {
        display: 'Pizza',
        imgUrl: categoryImg02,
    },

    {
        display: 'Asian Food',
        imgUrl: categoryImg03,
    },

    {
        display: 'Row Meat',
        imgUrl: categoryImg04,
    },
];

const Category = () => {
    return (
        <div className="category">
            <Container>
                <Row>
                    {categoryData.map((item, index) => (
                        <Col key={index} lg={3} md={4} sm={6} xs={6} className="mb-4">
                            <div className="category__item d-flex align-items-center gap-3">
                                <div className="category__img">
                                    <img src={item.imgUrl} alt={item.display} />
                                </div>
                                <h6>{item.display}</h6>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Category;
