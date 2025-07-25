import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className='navbar'>
        <div className='navbar__logo'>EventVerse</div>
        <div className='navbar__actions'>
            <Link to ={"/Login"}className='navbar__login'>Login</Link>
            <Link to ={"/SignUp"}className='navbar__signup'>Signup</Link>
            </div>
    </nav>
  )
}

export default Navbar