import React from 'react'
import { NavLink } from 'react-router-dom'
import './css/NavBar.css'

function NavBar() {
  return (
    <header className='header__nav'>
      <h1 className="logo font_style">
        <NavLink to="/" className="nav__logo">
          Kendal
        </NavLink>
      </h1>
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="nav__link font_style" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/post" className="nav__link font_style">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/project" className="nav__link font_style">
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav__link font_style">
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav__link font_style">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </header>
  )
}

export default NavBar
