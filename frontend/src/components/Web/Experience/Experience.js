import React from 'react';
import LogoB from '../../../assets/img/logob2.png';

import './Experience.scss'

const Experience = () => {
    return ( 
        <div className='exp-section'>
            <h1>Experiencia Laboral</h1>
            <div className='exp-section__desc'>
                <div>                    
                    <h4>Dic 2021 - Actualidad</h4>
                    <p></p>
                    <h2>BANCO SANTIAGO DEL ESTERO</h2>
                    <h3>Analista Administrador de Seguridad de la Información</h3>
                    <h4>Seguridad Informática - Ciberseguridad</h4>
                </div>
                <img src={LogoB} alt="" />
            </div>

        </div>
    );
}

export default Experience;