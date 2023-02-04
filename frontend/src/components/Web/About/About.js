import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { DownloadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Dev1 from '../../../assets/img/dev2.png'
import Dev2 from '../../../assets/img/dev1.png'
import './About.scss'

const About = () => {

    return (
        <div className="about-section">
            <div className="about-section__desc">
                <h2>Full Stack Web Developer & Cybersecurity Analist</h2>
                <Button type="primary" style={{ width: '250px' }} shape="round" icon={<DownloadOutlined />} size='large' onClick={() => window.open('https://drive.google.com/file/d/1CpjqIaEKxcgzYybUIAPBt-arYO4msrQ4/view?usp=share_link')}>
                    Ver/Descargar Mi CV
                </Button>
            </div>
            <div className="about-section__flex">
                <div className="about-section__flex-fs">
                    <h3>Desarrollo Web</h3>
                    <p></p>
                    <h1>DESARROLLADOR WEB FULL<br /> STACK <span>MERN</span></h1>
                    <h2>Conocimientos integrando Mongo Express y Node con React, utilizando Fetch API y Axios para consumir API's que me permiten crear aplicaciones y escribir código que siga las buenas prácticas.</h2>
                    <ul>
                        <li>React Hooks</li>
                        <li>Context & Redux</li>
                        <li>Proyectos con Nextjs</li>
                        <li>Firestore</li>
                    </ul>
                    <Link to='/courses'>Ver más <ArrowRightOutlined /></Link>
                    <img src={Dev1} alt="" />
                </div>
                <div className="about-section__flex-cs">
                    <div>                    
                    <h3>Ciberseguridad</h3>
                    <p></p>
                    <h1>ANALISTA DE <br/> <span> CIBERSEGURIDAD </span></h1>
                    <h2>Desarrollar políticas, procedimientos y mejores prácticas de una empresa para identificar y prevenir cualquier defecto o fallo que pueda dejar vulnerable la información confidencial.</h2>
                    <ul>
                        <li>Garantizar el cumplimiento de la normativa</li>
                        <li>Fundamentos de la Ciberseguridad</li>
                        <li>Respuesta ante incidentes</li>
                        <li>Cifrado de datos</li>
                    </ul>
                    <Link to='/courses'>Ver más <ArrowRightOutlined /></Link>
                    </div>
                    <img src={Dev2} alt="" />
                </div>
            </div>
        </div>
    );
}

export default About;