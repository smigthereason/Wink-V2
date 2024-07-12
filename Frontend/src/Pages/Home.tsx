import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import Sidebar from "./Sidebar";
import winkLogo from "../Assets/winklogopic.png";
import Logo from "../Assets/wink-transparent.png";
import { GiFlame } from "react-icons/gi";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "./Button";
import { CgOptions } from "react-icons/cg";

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    exists: boolean;
    pictureUrl: string | null;
  }>({
    exists: false,
    pictureUrl: null,
  });

  useEffect(() => {
    AOS.init({ duration: 1500 });

    // Fetch user profile information
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user-profile");
        const data = await response.json();

        setUserProfile({
          exists: data.profileExists,
          pictureUrl: data.profilePictureUrl,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = ["Account", "Settings", "Payment", "Logout"];

  return (
    <div className="home-container" data-aos="zoom-in">
      <Sidebar
        menuItems={menuItems}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <div className="left-section">
        <div className="semi-nav">
          <div className="name1">
            <img src={winkLogo} alt="Wink logo" />
            <img
              src={Logo}
              alt="logo"
              style={{ maxWidth: "120px", height: "70px" }}
            />
          </div>
        </div>

        <div className="content">
          <div className="content1">
            <h1>Welcome to Wink</h1>
            <p>Your journey to find true love starts here.</p>
            <section className="feature-section">
              <Button />
            </section>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="container">
          <div className="top-nav">
            <div className="social-icons1">
              <a
                href="https://www.facebook.com/victor.maina.77312/"
                target="_blank"
                rel="noopener noreferrer">
                <GiFlame size={32} />
              </a>
              <Link to="/chat" className="message">
                <BiSolidMessageRounded size={32} />
              </Link>
              <a
                href="https://x.com/SmigDs"
                target="_blank"
                rel="noopener noreferrer">
                <IoMdNotificationsOutline size={32} />
              </a>

              <button onClick={toggleSidebar} className="account-button">
                <CgOptions size={32} />
              </button>
            </div>
          </div>

          <div className="grid">
            <div className="card1">
              <div className="card-image1">
                
                <img
                  src="https://images.unsplash.com/photo-1521033719794-41049d18b8d4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Heart"
                />
              
              </div>
              <div className="card-overlay1"></div>
              <div className="card-content1">
                <Link to="/payment" className="direct">
                <h2>Searching for Your Soulmate</h2>
                </Link>
              </div>
            </div>
            <div className="card1">
              <div className="card-image1">
                <img
                  src="https://images.unsplash.com/photo-1582103287241-2762adba6c36?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Night"
                />
              </div>
              <div className="card-overlay1"></div>
              <div className="card-content1">
              <Link to="/payment" className="direct">
                <h2>Night Owl Adventures</h2>
                </Link>
              </div>
            </div>
            <div className="card1">
              <div className="card-image1">
                <img
                  src="https://images.unsplash.com/photo-1542324909-57c08f1b1288?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="People"
                />
              </div>
              <div className="card-overlay1"></div>
              <div className="card-content1">
              <Link to="/payment" className="direct">
                <h2>Discover People</h2>
                </Link>
              </div>
            </div>
            <div className="card1">
              <div className="card-image1">
                <img
                  src="https://images.unsplash.com/photo-1554481923-a6918bd997bc?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Swing"
                />
              </div>
              <div className="card-overlay1"></div>
              <div className="card-content1">
              <Link to="/payment" className="direct">
                <h2>Thrill Seekers Unite</h2>
                </Link>
              </div>
            </div>
            <div className="card1">
              <div className="card-image1">
                <img
                  src="https://plus.unsplash.com/premium_photo-1679518412390-9805e2b79b2b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Foodies"
                />
              </div>
              <div className="card-overlay1"></div>
              <div className="card-content1">
              <Link to="/payment" className="direct">
                <h2>Foodies Delight</h2>
                </Link>
              </div>
            </div>
            <div className="card1">
              <div className="card-image1">
                <img
                  src="https://images.unsplash.com/photo-1496240476075-8bbe454c971a?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Fire on beach"
                />
              </div>
              <div className="card-overlay1"></div>
              <div className="card-content1">
              <Link to="/payment" className="direct">
                <h2>Creative Souls</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="tag">
          {/* <a href="/" rel="noopener noreferrer">
            <FaPowerOff size={32} />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
