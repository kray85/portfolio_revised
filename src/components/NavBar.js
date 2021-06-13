import React from 'react'
import { NavLink} from 'react-router-dom'

function NavBar() {
    return (
        <header>
            <h1 className='logo'><NavLink to='/' className='nav__logo'>Kendal</NavLink></h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className='nav__link'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/post' className='nav__link'>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' className='nav__link'>About Me</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className='nav__link'>Contact</NavLink>
                    </li>
                </ul>
            </nav>
            
        </header>
    )
}

export default NavBar
