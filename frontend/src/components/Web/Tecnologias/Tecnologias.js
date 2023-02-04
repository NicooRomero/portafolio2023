import React from 'react';
import { Image } from 'antd';

import JS from '../../../assets/img/tech/js.svg';
import REACT from '../../../assets/img/tech/react.svg';
import NEXT from '../../../assets/img/tech/next.svg';
import NODE from '../../../assets/img/tech/nodejs.svg';
import MONGO from '../../../assets/img/tech/mongodb.svg';
import EX from '../../../assets/img/tech/expressjs.svg';

import './Tecnologias.scss';

const Tecnologias = () => {
    return ( 
        <div className="tec-main">
            <Image src={REACT} />
            <Image src={NODE} />
            <Image src={MONGO} />
            <Image src={EX} />
        </div> 
    );
}

export default Tecnologias;