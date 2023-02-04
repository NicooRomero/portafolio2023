import React, { useState } from 'react';
import { Col, Row, Card } from 'antd';
import Ciberseguridad from '../Ciberseguridad';
import Desarrollo from '../Desarrollo';
import Badges from '../Badges/Badges';
import Certificados from '../Certificados/Certificados';
import './CursosList.scss';

const tabList = [
    {
        key: 'tab1',
        tab: 'Desarrollo Full Stack',
    },
    {
        key: 'tab2',
        tab: 'Ciberseguridad',
    },
];

const contentList = {
    tab1: <Desarrollo />,
    tab2: <Ciberseguridad />,
};

const CursosList = () => {

    const [activeTabKey1, setActiveTabKey1] = useState('tab1');

    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };

    return (
        <div className="cursos">
            <div className="cursos-description">
                <h1>Capacitaciones & Cursos realizados</h1>
                <h2>Todos mis conocimientos adquiridos hasta el dia de hoy son fruto de mi dedicación, mis ganas de seguir aprendiendo, de seguir adquiriendo nuevos conocimientos y saberes que me permitan desenvolverme con fluides en las areas de mi interés. </h2>
            </div>
            <Row>
                <Col span={20}>
                    <Card
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: 'none'
                        }}
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={(key) => {
                            onTab1Change(key);
                        }}
                    >
                        {contentList[activeTabKey1]}
                    </Card>
                </Col>
            </Row>

            <div className="cursos-badges">
            <Row>
                <Col span={20}>
                    <h1>Badges</h1>
                    <h2>Representaciones digitales de un resultado de aprendizaje, experiencia o competencia.</h2>
                    <Badges />
                </Col>
            </Row>
            </div>

            <div className="cursos-certificados">
            <Row>
                <Col span={20}>
                    <h1>Certificados</h1>
                    <h2>Todas mis certificaciones obtenidas por resultado del aprendizaje adquirido en los cursos realizados.</h2>
                    <Certificados />
                </Col>
            </Row>
            </div>
        </div>
    );
}


export default CursosList;