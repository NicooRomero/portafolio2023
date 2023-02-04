import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { logout } from '../../../api/auth';

import './MenuTop.scss';

const MenuTop = (props) => {
    //const { menuCollapsed, setMenuCollapsed } = props;
    const [ nameUser, setNameUser ] = useState('');

    useEffect(() => {
        setNameUser(localStorage.getItem('dataUser'));
    },[nameUser])

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return ( 
        <div className="menu-top">
            {/* <div className="menu-top__left">
                <Button type='link'>
                    {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div> */}
            <div className="menu-top__user">
                <h1>Bienvenido <span>{nameUser}</span> </h1>
            </div>
            <div className="menu-top__right">
                <Button
                    type='link'
                    onClick={logoutUser}
                >
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}

export default MenuTop;