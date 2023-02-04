import React, { useState } from 'react';
import { Avatar, Button, List, Space, Spin, Modal as ModalAntd, notification } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { getAccToken } from '../../../../api/auth';
import { DeleteUser } from '../../../../api/user';
import AddUserForm from '../AddUser/AddUser';
import EditUserForm from '../EditUser';
import Modal from '../../../Modal';

import './ListUsers.scss';
const { confirm } = ModalAntd;

const ListUsers = (props) => {
    
    const { usersData, setReload } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);
    
    const addUserModal = () => {
        setIsVisible(true);
        setModalTitle('Crear Nuevo Usuario');
        setModalContent( <AddUserForm setIsVisible={setIsVisible} setReload={setReload} /> )
    }


    const editUser = user => {
        setIsVisible(true);
        setModalTitle(`Editar usuario`)
        setModalContent(<EditUserForm user={user} setIsVisible={setIsVisible} setReload={setReload} />)
    }

    const deleteUser =  (user) => {
        const accessToken = getAccToken();

        confirm({
            title: 'Eliminar usuario',
            content: `¿Estás seguro que quieres eliminar el usuario ${user.email}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                DeleteUser(user._id, accessToken)
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
                    setReload(true);
            }
        })
    }

    if(usersData.length === 0) {
        return (
            <Space size="middle" className="spin">
                <Spin size="large" tip='Cargando lista de usuarios....' />
            </Space>
        )
    } else {
        return (
            <div>
                <Button
                    type="primary"
                    className='add-user_btn'
                    onClick={addUserModal}
                    >
                    <UserAddOutlined />Nuevo Usuario
                </Button>
                <List
                    className="user-list"
                    //loading={initLoading}
                    itemLayout="horizontal"
                    //loadMore={loadMore}
                    dataSource={usersData}
                    renderItem={usersData => (
                        <List.Item
                            actions={[
                                <Button type="primary" onClick={() => deleteUser(usersData)} danger>Eliminar</Button>,
                                <Button type="primary" onClick={() => editUser(usersData)} >Editar</Button>
                            ]}
                        >
                            <List.Item.Meta
                                className='ant-list-item'
                                avatar={<Avatar src={usersData.image} />}
                                title={<a href="https://ant.design">{usersData.name}</a>}
                                description={usersData.isAdmin ? `${usersData.email} - Admin` : `${usersData.email} - Colaborador`}
                                />
                        </List.Item>
                    )}
                />
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

export default ListUsers;