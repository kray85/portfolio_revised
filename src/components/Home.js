import React from 'react'
import { SocialIcon } from 'react-social-icons'
import './css/Home.css'

function Home() {
  return (
    <div className="hero__container">
      <h1 className="font_style">Kendal Brown</h1>
      <p className='font_style'>Freelance FullStack Web Developer</p>
      <p className='font_style'>Cyber Security Professional</p>
      <span>
        <SocialIcon
          target="_blank"
          url="https://www.linkedin.com/in/kendal-brown-56320695/"
        />
      </span>
    </div>
  )
}

export default Home
