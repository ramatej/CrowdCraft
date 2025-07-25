import React from 'react'
import "./home.css"
import heroImg from "../../assets/work.gif"
import Navbar from '../../components/navbar/Navbar'

function Home() {
  return (
    <>
    <Navbar/>
    <div className='hero'>
      <div className='hero__text'>
        <h1>Welcome to EventVerse</h1>
        <p>sjdhfnvslkd,cfxv</p>
        <p>JOIN, CONNECT, EXPLORE, ENGAGE</p>
      </div>
      <div className='hero__image'>
        <img src={heroImg} alt="image for events" />
      </div>
    </div>
    </>
  )
}

export default Home;