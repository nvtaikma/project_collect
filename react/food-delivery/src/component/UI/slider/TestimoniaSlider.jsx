import React from 'react';
import './TestimoniaSlider.scss';
import Slider from 'react-slick';

import ava01 from '../../../assets/images/ava-1.jpg';
import ava02 from '../../../assets/images/ava-2.jpg';
import ava03 from '../../../assets/images/ava-3.jpg';

const TestimoniaSlider = () => {
    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 2500,
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            <div>
                <p className="slider__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, minus. Tempora reprehenderit a
                    corporis velit, laboriosam vitae ullam, repellat illo sequi odio esse iste fugiat dolor, optio
                    incidunt eligendi deleniti!
                </p>
                <div className="slider__content d-flex align-items-center gap-3">
                    <img src={ava01} alt="avatar-user" className=" rounded" />
                    <h6>Jhon Doe</h6>
                </div>
            </div>
            <div>
                <p className="slider__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, minus. Tempora reprehenderit a
                    corporis velit, laboriosam vitae ullam, repellat illo sequi odio esse iste fugiat dolor, optio
                    incidunt eligendi deleniti!
                </p>
                <div className="slider__content d-flex align-items-center gap-3">
                    <img src={ava02} alt="avatar-user" className=" rounded" />
                    <h6>Eric</h6>
                </div>
            </div>
            <div>
                <p className="slider__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, minus. Tempora reprehenderit a
                    corporis velit, laboriosam vitae ullam, repellat illo sequi odio esse iste fugiat dolor, optio
                    incidunt eligendi deleniti!
                </p>
                <div className="slider__content d-flex align-items-center gap-3">
                    <img src={ava03} alt="avatar-user" className=" rounded" />
                    <h6>frank gallagher</h6>
                </div>
            </div>
        </Slider>
    );
};

export default TestimoniaSlider;
