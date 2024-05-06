import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero.jsx";
import HeroCard from "./components/HeroCard/HeroCard.jsx";
import BgVideo from "./assets/hill.mp4";
import wave from "./assets/wave Gif.gif";
import Rapidscat from "./components/Rapidscat/Rapidscat.jsx";
import Satelite from "./components/Satelite/Satelite.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Footer5 from "./components/Footer/Footer5.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";
import MainContent from "./main-Content.jsx";
const App = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  });

  return (
    <Router> {/* Wrap your entire app with BrowserRouter */}
      <div>
      
        
        <AuthProvider>
          {/* Define your routes using Routes and Route */}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
