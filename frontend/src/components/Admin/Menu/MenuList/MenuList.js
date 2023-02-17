import React, { useState } from 'react';
import { Button, List, Space, Spin, Switch, Modal as ModalAntd, notification } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import AddMenuForm from '../AddMenu';
import EditMenuForm from '../EditMenu/EditMenu';
import Modal from '../../../Modal';
import { getAccToken } from '../../../../api/auth';
import { DeleteMenu } from '../../../../api/menu';
import { ActiveMenu } from '../../../../api/menu';
import './MenuList.scss';
const { confirm } = ModalAntd;

const MenuList = (props) => {
    
    const { menu, setReloadMenu } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const[ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    const addMenu = () => {
        setIsVisible(true);
        setModalTitle('Agregar nuevo menú');
        setModalContent( <AddMenuForm setIsVisible={setIsVisible} setReloadMenu={setReloadMenu} /> )
    }

    const editMenu = (menuData) => {
        setIsVisible(true);
        setModalTitle(`Editar menú ${menu.title}`);
        setModalContent( <EditMenuForm menuData={menuData} setReloadMenu={setReloadMenu} setIsVisible={setIsVisible}  />)
    }

    const deleteMenu = (menuData) => {
        const accessToken = getAccToken();

        confirm({
            title: 'Eliminar usuario',
            content: `¿Estás seguro que quieres eliminar el usuario ${menuData.email}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                DeleteMenu(menuData._id, accessToken)
                    .then(res => {
                        if(res.status === 200) {
                            notification['success']({
                                message: res.data.message 
                            })
                        } else {
                            notification['error']({
                                message: res.response.data.message 
                            })
                        }
                    })
                    setReloadMenu(true);
            }
        })
    }

    const activateMenu = (menuCheck, status) => {
        const accesToken = getAccToken();
        ActiveMenu(accesToken, menuCheck._id, { active: status })
            .then(res => {
                notification["success"]({
                    message: res.data.message
                });
            });
    }

    if(!menu) {
        return (
            <div className='menu-web-list'>
                <div className="menu-web-list__header">
                    <Button
                        type="primary"
                        className='add-menu_btn'
                        onClick={addMenu}
                        >
                        <MenuOutlined />Nuevo Menu
                    </Button>
                </div>
            <Space size="middle" className="spin">
                <Spin size="large" tip='Cargando lista de usuarios....' />
            </Space>
            </div>
        )
    } else {
        return (
            <div className='menu-web-list'>
                <div className="menu-web-list__header">
                    <Button
                        type="primary"
                        className='add-menu_btn'
                        onClick={addMenu}
                        >
                        <MenuOutlined />Nuevo Menu
                    </Button>
                </div>
                <div className="menu-web-list__items">
                    <List
                        //loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={menu}
                        renderItem={menu => (
                            <List.Item
                                actions={[
                                    <Switch defaultChecked={menu.active} onChange={e => activateMenu(menu, e)} />,
                                    <Button type="primary" onClick={() => deleteMenu(menu)} danger>Eliminar</Button>,
                                    <Button type="primary" onClick={() => editMenu(menu)}  >Editar</Button>
                                ]}
                            >
                                <List.Item.Meta
                                    className='ant-list-item'
                                    title={<a href={menu.url}>{menu.title}</a>}
                                    description={menu.description ? menu.description : '...'}
                                    />
                            </List.Item>
                        )}
                    />
                </div>
                <Modal
                    title={modalTitle}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                >
                    {modalContent}
                </Modal>
            </div>
        );
    }
}

export default MenuList;