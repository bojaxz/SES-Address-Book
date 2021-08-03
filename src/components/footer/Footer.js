import React from 'react';
import './footer.css';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import PersonalLogo from '../../img/Personal_Logo_Darkv3.svg';

export const Footer = () => {
    return (
        <div className="footer">
            <img src={PersonalLogo} />
            <IconContext.Provider value={{ size: "2rem" }}  >
                <div className="icons">
                    <a 
                        href="https://github.com/bojaxz"
                        target="_blank"
                        rel='noreferrer'
                    >
                        <FaGithub />
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/liam-morrison-a4547a187/"
                        target="_blank"
                        rel='noreferrer'
                    >
                        <FaLinkedin />
                    </a>
                    <a 
                        href="https://twitter.com/erroratu/status/1420237554604027906?s=21"
                        target="_blank"
                        rel='noreferrer'
                    >
                        <FaTwitter />
                    </a>
                </div>
            </IconContext.Provider>
            <p>CopyRight 2021</p>
        </div>
    )
}

export default Footer;