import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import Logo from "../Assets/wink-transparent.png";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { FaPowerOff } from "react-icons/fa";

interface LoginData {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const Login: React.FC = () => {
  const [, setActiveCard] = useState<"login" | "signup">("login");
  const [showSignup, setShowSignup] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        loginData,
        { withCredentials: true } 
      );
      console.log("Login response:", response.data); 
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/bridge");
      } else {
        console.error("Login response didn't contain a token:", response.data);
        alert("Login failed: Unexpected response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Login failed: ${error.response.data.message || "An unexpected error occurred"}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Login failed: No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Login failed: An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        signupData
      );
      console.log("Signup response:", response); 
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/bridge");
      } else {
        console.error("Signup response didn't contain a token:", response.data);
        alert("Signup successful, but login failed. Please try logging in.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Signup failed: ${error.response.data.message || "An unexpected error occurred"}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Signup failed: No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Signup failed: An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setData: React.Dispatch<React.SetStateAction<LoginData>>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const selectCard = (card: "login" | "signup") => {
    setActiveCard(card);
    if (card === "signup") {
      setShowSignup(true);
    }
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  return (
    <div className="login-container" data-aos="slide-left">
      <div className="left-section1">
        <img
          src={Logo}
          alt="logo"
          style={{ maxWidth: "350px", height: "250px" }}
        />
      </div>
      <div className="right-section1" data-aos="fade-up">
        <div className="form-container">
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={(e) => handleChange(e, setLoginData)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, setLoginData)}
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="contact_line">
          <div className="line"></div>
          <span className="section_subtitle">Or</span>
          <div className="line2"></div>
        </div>
        <div className="acc-section">
          <h4>Don't have an account? Join us today!</h4>
          <button
            className="option-button"
            onClick={() => selectCard("signup")}
          >
            Create an Account
          </button>
        </div>
      </div>
      {showSignup && (
        <div className="signup-modal" data-aos="fade-in">
          <div className="signup-content">
            <button className="close-button" onClick={closeSignup}>
              <FaPowerOff size={28} />
            </button>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="input-container">
                <label htmlFor="new-username">Username</label>
                <input
                  type="text"
                  id="new-username"
                  name="username"
                  value={signupData.username}
                  onChange={(e) =>
                    handleChange(
                      e,
                      setSignupData as React.Dispatch<
                        React.SetStateAction<LoginData | SignupData>
                      >
                    )
                  }
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="new-email">Email</label>
                <input
                  type="email"
                  id="new-email"
                  name="email"
                  value={signupData.email}
                  onChange={(e) =>
                    handleChange(
                      e,
                      setSignupData as React.Dispatch<
                        React.SetStateAction<LoginData | SignupData>
                      >
                    )
                  }
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={signupData.gender}
                  onChange={(e) =>
                    handleChange(
                      e,
                      setSignupData as React.Dispatch<
                        React.SetStateAction<LoginData | SignupData>
                      >
                    )
                  }
                  required
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="new-password">Password</label>
                <input
                  type="password"
                  id="new-password"
                  name="password"
                  value={signupData.password}
                  onChange={(e) =>
                    handleChange(
                      e,
                      setSignupData as React.Dispatch<
                        React.SetStateAction<LoginData | SignupData>
                      >
                    )
                  }
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    handleChange(
                      e,
                      setSignupData as React.Dispatch<
                        React.SetStateAction<LoginData | SignupData>
                      >
                    )
                  }
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

