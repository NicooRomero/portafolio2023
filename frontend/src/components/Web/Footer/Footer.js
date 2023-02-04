import React from 'react';
import NavFooter from './NavFooter/NavFooter';
import SocialLinks from './NavFooter/SocialLinks/SocialLinks';

import './Footer.scss';

const Footer = () => {
    return ( 
        <div className="footer">
            <div className="footer-copy">
                <h3>Copyright © 2022 Nicolás Romero – All Rights Reserved</h3>
            </div>
            <div className="footer-menu">
                <NavFooter />
            </div>
            <div className="footer-social">
                <SocialLinks />
            </div>
        </div>
    );
}

export default Footer;