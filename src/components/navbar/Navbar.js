import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {
    return (
        <div>
            <nav>
                <ul className="navbar">
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/Users">Users</Link>
                    </li>
                </ul>
            </nav>
      </div>
    )
}

export default Navbar;