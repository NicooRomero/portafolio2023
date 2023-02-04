import React, { useState, useEffect } from 'react';
import MenuList from '../../../components/Admin/Menu/MenuList/MenuList';
import { GetMenu } from '../../../api/menu';

const MenuWeb = () => {

    const [ menu, setMenu ] = useState([]);
    const [ reloadMenu, setReloadMenu ] = useState(false);

    useEffect(() => {
        GetMenu()
            .then(response => {
                    setMenu(response.menuList);
            })
        setReloadMenu(false);
    }, [reloadMenu]);

    return (
        <div className="menu-web">
            <MenuList menu={menu} setReloadMenu={setReloadMenu} />
        </div>
    );
}

export default MenuWeb;