import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkedinFilled } from '@ant-design/icons';
import { GetMenu } from '../../../api/menu';
import MenuMobile from './MenuMobile/MenuMobile';
import './MenuTop.scss';

const MenuTop = () => {

    const [menu, setMenu] = useState([]);    

    useEffect(() => {
        GetMenu()
            .then(res => {
                const arrayMenu = [];
                res.menuList.forEach(item => {
                    if (item.active) {
                        arrayMenu.push(item);
                    }
                });
                setMenu(arrayMenu);
            })
    }, [])

    return (
        <section>
            <div className="menu-top-web" mode="horizontal">
                <div className="menu-top-web__logo">
                    <Link to={'/'}>
                        <h1>Nicolás Romero</h1>
                    </Link>
                </div>

                <div className="menu-top-web__menus">
                    {menu.map(item => {
                        const external = item.url.indexOf('http') > -1 ? true : false;

                        if (external) {
                            return (
                                <div key={item._id} className="men-top-web__menus-item">
                                    <Link to={item.url} target="_blank" rel="noopener noreferrer" >{item.title}</Link>
                                </div>
                            )
                        }

                        return (
                            <div key={item._id} className="men-top-web__menus-item">
                                <Link to={item.url}>{item.title}</Link>
                            </div>
                        )
                    })}
                </div>

                <div className="menu-top-web__menus-mobile">
                    <MenuMobile menu={menu} />
                </div>                    

                <div className="menu-top-web__social">
                    <SocialLinks />
                </div>

            </div>
        </section>
    );
}

const SocialLinks = () => {
    return (
        <div className="social-links">
            <a href="https://www.linkedin.com/in/nicooromero" target="_blank" rel="noopener noreferrer">
                <LinkedinFilled />
            </a>

        </div>
    );
}

export default MenuTop;