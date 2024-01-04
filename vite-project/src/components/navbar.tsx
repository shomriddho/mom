import  { useState } from 'react';
import { Link } from'react-router-dom';

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <>
      <nav className="p-4 border-primary border-b-2 sticky  top-0 bg-bgcolor w-full z-50 bg-white ">
        <div className="w-full mx-auto flex justify-between items-center  bg-white">
          <div className="hidden md:block w-full text-xl">
            {/* Replace href with appropriate navigation actions */}
            <ul className="flex justify-evenly">
              {/* NavLink or appropriate navigation actions */}
              <li><Link to="/Home" className="text-black">Home</Link></li>
              <li><Link to="/About" className="text-black nb">About</Link></li>
                   
                   <li><Link to="/songs" className="text-black nb"> Songs</Link></li>
                   <li><Link to="/poems" className="text-black nb">Poem</Link></li>
                   <li><Link to="/Videos" className="text-black nb">Videos</Link></li>
                   <li><Link to="#contact-me" className="text-black nb">Contact Me</Link></li>

              
            </ul>
          </div>
          <div className="md:hidden w-full">
            <div className="flex justify-between flex-row-reverse">
              <button
                className="text-black float-right"
                id="menuBtn"
                name="menu opener button"
                aria-label="menu opener button"
                onClick={toggleMobileMenu}
              >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
              </button>
              <h1 className="text-black text-xl float-left">
                Fatema Afroz Sohely
              </h1>
            </div>
          </div>
        </div>
        <div id="mobileMenu" className={` rounded-lg mt-4 text-xl ${showMobileMenu ? 'block' : 'hidden'}`}>
          {/* Mobile menu content */}
          <ul className="w-full">
          <li><a href="#home" className="text-black ">Home</a></li>
                    <li><a href="#about" className="text-black nb">About</a></li>
                   
                    <li><a href="#customer-reviews" className="text-black nb"> Songs</a></li>
                    <li><a href="#recent-project" className="text-black nb">Poem</a></li>
                    <li><a href="#recent-project" className="text-black nb">Videos</a></li>
                    <li><a href="#contact-me" className="text-black nb">Contact Me</a></li> </ul>
        </div>
 </nav>
 
    </>
  );
}

export default Navbar;
