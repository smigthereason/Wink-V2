
import React, { useState, useEffect } from 'react';
import "../Styles/Payment.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Plan {
  name: string;
  price: number;
  features: string[];
  current: boolean;
}

const Payment: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const [plans] = useState<Plan[]>([
    {
      name: 'Free',
      price: 0,
      features: ['Basic matching', 'Limited swipes', 'Standard support'],
      current: true,
    },
    {
      name: 'Gold',
      price: 11.99,
      features: ['Advanced matching', 'Unlimited swipes', 'Priority support', 'See who likes you'],
      current: false,
    },
    {
      name: 'Platinum Deluxe',
      price: 22.99,
      features: ['Premium matching', 'Unlimited swipes', 'VIP support', 'See who likes you', 'Boost your profile', 'Exclusive events'],
      current: false,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };

  const handlePayPalRedirect = (plan: Plan) => {
    const paypalEmail = 'victor.dmaina@gmail.com';
    const amount = plan.price.toFixed(2);
    const description = `Upgrade to ${plan.name} plan`;
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&amount=${amount}&item_name=${encodeURIComponent(description)}&currency_code=USD`;

    window.location.href = paypalUrl;
  };

  return (
    <div className="payment-container">
      <h1>Choose Your Plan</h1>
      <h4>Payments done through Paypal</h4>
      <div className="carousel-container">
        <FaArrowLeft className="arrow left-arrow" onClick={handlePrev} />
        <div className="plan-card" data-aos="fade-in">
          <h2>{plans[currentIndex].name}</h2>
          <p className="price">${plans[currentIndex].price.toFixed(2)}/month</p>
          <ul className="features">
            {plans[currentIndex].features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className='button-1'>
          {plans[currentIndex].current ? (
            <button className="current-plan" disabled>Current Plan</button>
          ) : (
            <button onClick={() => handlePayPalRedirect(plans[currentIndex])}>Proceed to PayPal</button>
          )}
          </div>
        </div>
        <FaArrowRight className="arrow right-arrow" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Payment;

