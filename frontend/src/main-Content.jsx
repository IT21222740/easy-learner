// MainContent.jsx
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero.jsx";
import HeroCard from "./components/HeroCard/HeroCard.jsx";
import Rapidscat from "./components/Rapidscat/Rapidscat.jsx";
import Satelite from "./components/Satelite/Satelite.jsx";
import Footer5 from "./components/Footer/Footer5.jsx";
import BgVideo from "./assets/hill.mp4";
import wave from "./assets/wave Gif.gif";
const MainContent = () => {
  return (
    <div className="h-[700px] relative">
      <video
        autoPlay
        loop
        muted
        className="fixed right-0 top-0 h-[700px] w-full object-cover z-[-1]"
      >
        <source src={BgVideo} type="video/mp4" />
      </video>
      <Navbar />
      <Hero />
      <HeroCard />
      <Rapidscat />
      
      <Footer5 />
    </div>
  );
};

export default MainContent;
 