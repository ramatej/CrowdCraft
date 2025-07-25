// import React from 'react'
// import "./Navbar.css";
// import { Link } from 'react-router';

// function Navbar() {
//   return (
//     <nav className='navbar'>
//         <div className='navbar__logo'>EventVerse</div>
//         <div className='navbar__actions'>
//             <Link to ={"/Login"}className='navbar__login'>Login</Link>
//             <Link to ={"/SignUp"}className='navbar__signup'>Signup</Link>
//             </div>
//     </nav>
//   )
// }

// export default Navbar

import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router';
import { logout } from '../../Api/logout';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbar__logo'>EventVerse</div>
      <div className='navbar__actions'>
        <Link to="/Login" className='navbar__login'>Login</Link>
        <Link to="/SignUp" className='navbar__signup'>Signup</Link>
        <button onClick={handleLogout} className='navbar__logout'>
          ⏻
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
