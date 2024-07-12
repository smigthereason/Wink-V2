import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
// import Matches from "./Pages/Matches";
import Bridge from "./Pages/Bridge";
import Profile from "./Pages/Profile";
import Loading from "./Pages/Loading";
import Login from "./Pages/Login";
import Swipe from "./Pages/Swipe";
import Payment from "./Pages/Payment";
import Chat from "./Pages/Chat"
import Settings from "./Pages/Settings";

const App: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Example: Check if user is logged in and set the state
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUserToken(token);
        setIsUserLoggedIn(true);
      }
      console.log(token);
    };

    checkLoginStatus();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/swipe" element={<Swipe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/matches" element={<Matches />} /> */}
      <Route path="/chat" element={<Chat />} />
      <Route
        path="/profile"
        element={
          <Profile userToken={userToken || ""} isLoggedIn={isUserLoggedIn} />
        }
      />
      <Route path="/bridge" element={<Bridge />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
