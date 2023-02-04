import React from 'react';
import { Row, Col } from'antd';
import { BookOutlined, CodeOutlined, DatabaseOutlined, RightSquareOutlined, HddOutlined, AppstoreAddOutlined, UserOutlined } from '@ant-design/icons';
import './NavFooter.scss'

const NavFooter = () => {
    return ( 
        <Row className="nav-footer">
                <Col md={12}><RenderListLeft /></Col>
                <Col md={12}><RenderListRight /></Col>            
        </Row>
    );
}

function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href="/">
                    <BookOutlined /> Inicio
                </a>
            </li>
            <li>
                <a href="/portfolio">
                    <CodeOutlined /> Portfolio
                </a>
            </li>
            <li>
                <a href="/blog">
                    <DatabaseOutlined /> Blog
                </a>
            </li>
            <li>
                <a href="/">
                    <RightSquareOutlined /> Política de privacidad
                </a>
            </li>
        </ul>
    )
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <a href="/admin">
                    <HddOutlined /> Administración
                </a>
            </li>
            <li>
                <a href="/habilidades">
                    <AppstoreAddOutlined /> Habilidades
                </a>
            </li>
            <li>
                <a href="https://drive.google.com/file/d/1CpjqIaEKxcgzYybUIAPBt-arYO4msrQ4/view?usp=share_link">
                    <UserOutlined /> CV Descarga
                </a>
            </li>
            <li>
                <a href="/">
                    <RightSquareOutlined /> Política de cookies
                </a>
            </li>
        </ul>
    )
}
export default NavFooter;