import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import sesLogo from '../../img/ses_logo_header.png';

export const Navbar = () => {
    return (
        <div>
            <nav>
                <ul className="navbar">
                    <li>
                    <Link to="/">
                        <img src={sesLogo} alt="SES Logo" className="navbarLogo" />
                    </Link>
                    </li>
                    <li>
                    <Link to="/Users" className="navLink">Users</Link>
                    </li>
                </ul>
            </nav>
      </div>
    )
}

export default Navbar;