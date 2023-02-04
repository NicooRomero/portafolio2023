import React from 'react';
import { Row, Col } from 'antd';
import ProfileImg from '../../../assets/img/profile.jpeg'
import './MainBanner.scss';

const MainBanner = () => {
    return ( 
        <div className="main-banner">
            <div>
                <Row>
                    <Col lg={24} className="main-banner__flex">
                        <div className='main-banner__desc'>
                            <img src={ProfileImg} alt="" />
                            <div className="about-section__name">
                                <p>Hola, soy</p>
                                <h1>Nicolás Romero</h1>
                                <h3>Santiago del Estero, Argentina</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        );
}

export default MainBanner;