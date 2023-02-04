import React, { useState } from 'react'
import Modal from '../../../Modal';
import { Link } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import './MenuMobile.scss';

const MenuMobile = ({ menu }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const handleShowNavbar = () => {
        setIsVisible(true)
        setModalTitle('Menu')
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__container-logo">
                    <Link to={'/'}>
                        <h1>Nicolás Romero</h1>
                    </Link>
                </div>
                <div className="navbar__container-menu_icon" onClick={handleShowNavbar}>
                    <MenuOutlined />
                </div>
                <div className={`navbar__container-nav_elements`}>
                    <Modal
                        title={modalTitle}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                    >
                        <ul>
                            {menu.map(item => {
                                return (
                                    <li key={item.title}>
                                        <Link to={item.url}>{item.title}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </Modal>
                </div>
            </div>
        </nav>
    )
}

export default MenuMobile