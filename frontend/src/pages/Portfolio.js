import React, { useState, useEffect } from 'react';
import { GetPortfolio } from '../api/portfolio';
import { Row, Col, notification } from 'antd';
import ListPortfolio from '../components/Web/Portfolio/ListPortfolio/ListPortfolio';


const Portfolio = () => {
    const [data, setData] = useState();

    useEffect(() => {
        GetPortfolio()
            .then(response => {
                setData(response.data.projectsList)
            })
            .catch(error => {
                notification["error"]({
                    message: error
                })
            })
    }, [])


    return (
        <Row>
            <Col md={4} />
            <Col md={16}><ListPortfolio data={data}/></Col>
            <Col md={4} />
        </Row>
    );
}

export default Portfolio;