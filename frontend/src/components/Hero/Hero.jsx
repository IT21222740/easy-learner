import React from "react";
import MountainPng from "../../assets/moon-surface-hd.png";
import { useAuth } from '../../contexts/authContext'
const Hero = () => {

  const { currentUser } = useAuth()
  return (
   
    <div className=" bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4">
        <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-white space-y-4 lg:pr-36">
          <h1 data-aos="fade-up" className="text-5xl font-bold">
          <h1 data-aos="fade-up" className="text-5xl font-bold">

</h1>
Hello {currentUser && currentUser.email ? currentUser.email.split('@')[0] : " user"}
</h1>

            <p data-aos="fade-up" data-aos-delay="300">
            "Space: the final frontier. These are the voyages of the Starship Enterprise. Its continuing mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no one has gone before." - Gene Roddenberry
            </p>
           
          </div>
          <div></div>
        </div>
      </div>
      <img
        src={MountainPng}
        alt=""
        className="absolute right-0 bottom-0 w-full brightness-50 z-10"
      />

      <div className="absolute bottom-0 z-30 right-0 w-full bg-gradient-to-b from-transparent from-10% to-primary to-90% h-[20px] sm:h-[50px] md:[60px]"></div>
    </div>
  );
};

export default Hero;
