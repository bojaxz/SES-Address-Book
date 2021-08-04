import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import sesLogo from '../../img/ses_logo_header.png';

export const Navbar = () => {
    return (
        <div>
            <nav>
                <ul className="navbar">
                    <li>
                    <NavLink to="/" >
                        <img src={sesLogo} alt="SES Logo" className="navbarLogo" />
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/Users" className="navLink" activeClassName="active">
                        Users
                    </NavLink>
                    </li>
                </ul>
            </nav>
      </div>
    )
}

export default Navbar;