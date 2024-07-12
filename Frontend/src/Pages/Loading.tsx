import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Loading.css";
import winkLogo from "../Assets/winklogopic.png";
import Logo from "../Assets/wink-transparent.png";

const Loading: React.FC = () => {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [swipe, setSwipe] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setSwipe(true); 
          setTimeout(() => {
            navigate('/login'); 
          }, 1000); 
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className={`loading-container ${swipe ? 'swipe-left' : ''}`}>
      <div className="loading-content">
        <img src={winkLogo} alt="Loading" className="loading-image" />
        <img
            src={Logo}
            alt="logo"
            style={{ maxWidth: "350px", height: "250px" }}
          />

        <div className="loading-bar">
          <div className="loading-bar-progress" style={{ width: `${loadingProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
