import React from 'react';
import logo from "../assets/logo.svg";
import './navbar.css'
const Navbar = ({textAnimationProgress}) => {
    const navItems = [
        { name: "INTRODUCTION", link: "/" },
        { name: "THE TECHNOLOGY", link: "/" },
        { name: "TECH SPOTLIGHT", link: "/" },
        { name: "WHY MUSIC?", link: "/" }
    ];
    return (
        <div className='nav-container'>
            <img src={logo} alt='logo' style={{height: '30px', width: '30px'}} />
            <div >
                <ul className='nav-list'>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} className="nav-link">{item.name}</a>
                        {index===0 &&
                             
                            <div className='scroll-progress-wra'>
                            <div className='scroll-progress' style={{width: `${textAnimationProgress * 100}%`}}></div>
                            </div>
                        }
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;