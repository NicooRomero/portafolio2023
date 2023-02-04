import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import GIF from '../../../../assets/img/contactimg.gif';

import './ContactBanner.scss';

const ContactBanner = () => {
    return ( 
        <div className="contact">
            <div className="contact-content">
                <div className="contact-content__img">
                    <img src={GIF} alt="" />
                </div>
                <div className="contact-content__text">
                    <h2>Contacto</h2>
                    <h3>Todos los medios disponibles para contactarse conmigo puede encontrarlos haciendo click en el siguiente enlace.</h3>
                    <div className="contact-content__text-btn">
                        <Link to='/contact'>
                            <Button type='primary'>
                                Contactarme
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactBanner