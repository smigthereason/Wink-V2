import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Bridge.css";
import winkLogo from "../Assets/winklogopic.png";
import Logo from "../Assets/wink-transparent.png";

const Bridge: React.FC = () => {
  const navigate = useNavigate();
  const [swipe, setSwipe] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { title: "Personalized Matches." },
    { title: "We use advanced algorithms to connect you with compatible partners." },
    { title: "Secure and Private." },
    { title: "Your privacy and security are our top priority." }
  ];

  useEffect(() => {
    const navigateTimeout = setTimeout(() => {
      setSwipe(true);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }, 8000); 

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000); // Change feature every 4 seconds

    return () => {
      clearTimeout(navigateTimeout);
      clearInterval(featureInterval);
    };
  }, [navigate, features.length]);

  return (
    <div className={`loading-container ${swipe ? 'swipe-left' : ''}`}>
      <div className="loading-content">
        <img src={winkLogo} alt="Loading" className="loading-image" />
        <img
          src={Logo}
          alt="logo"
          style={{ maxWidth: "350px", height: "250px" }}
        />

        <div className="feature-container">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature ${index === currentFeature ? 'active' : ''}`}
            >
              <h4>{feature.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bridge;