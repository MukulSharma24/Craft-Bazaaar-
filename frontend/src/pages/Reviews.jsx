import React from 'react';
import Slider from 'react-slick';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import review1 from '../components/photo/review1.png';
import review2 from '../components/photo/review2.png';
import review3 from '../components/photo/review3.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../pages/Review.css';

function Reviews() {
  // Custom Arrow Components
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaArrowLeft size={30} />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaArrowRight size={30} />
      </div>
    );
  };

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="stars">
        {[...Array(5)].map((star, index) => {
          return (
            <FaStar
              key={index}
              color={index < rating ? '#ffc107' : '#e4e5e9'}
              size={24}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="review-container">
      <h1>A Word From Happy Customers</h1>
      <Slider {...settings}>
        <div className="review-slide">
          <img src={review1} alt="Review 1" />
          <div className="testimonial">
            <StarRating rating={5} />
            <p>"Absolutely amazing! The quality exceeded my expectations. Will definitely recommend to others!"</p>
            <p>- Aashi.</p>
          </div>
        </div>
        <div className="review-slide">
          <img src={review2} alt="Review 2" />
          <div className="testimonial">
            <StarRating rating={4} />
            <p>"Great product! Fast delivery and excellent customer service."</p>
            <p>- Rakhi.</p>
          </div>
        </div>
        <div className="review-slide">
          <img src={review3} alt="Review 3" />
          <div className="testimonial">
            <StarRating rating={5} />
            <p>"I'm in love with the craftsmanship. Perfect gift for my loved ones!"</p>
            <p>- Rashi.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Reviews;
