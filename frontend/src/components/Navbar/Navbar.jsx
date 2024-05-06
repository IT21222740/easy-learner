import React from "react";
import Logo from "../../assets/logo.png";
import {useNavigate} from 'react-router-dom'
import {  doSignOut } from '../../firebase/auth'
const Navbar = () => {

  const navigate = useNavigate(); // Initialize navigate function

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the /login route when the login button is clicked
  };

  const handleSignout = async(e) => {
    e.preventDefault();

    await doSignOut();
  }


  return (
    <>
      <nav
        data-aos="fade-down"
        className="fixed top-0 right-0 w-full z-50 bg-black/10 backdrop-blur-sm py-4 sm:py-0"
      >
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-white font-bold text-2xl">
              
              <span>TLG-SPACE</span>
            </div>
            <div className="text-white hidden sm:block">
              <ul className="flex items-center gap-6 text-xl py-4 ">
                <li>
                  <a href="#">About</a>
                </li>
              
              </ul>
            </div>
            <div>
  <button className="text-white border-2 border-white px-3 py-1 rounded-md mr-2" onClick={handleLoginClick}>
    Login
  </button>

  <button className="text-white border-2 border-white px-3 py-1 rounded-md" onClick={handleSignout}>
    Signout
  </button>
</div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
