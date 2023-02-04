import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { AddMenu } from '../../../../api/menu';
import { getAccToken } from '../../../../api/auth';

const AddMenuForm = (props) => {
    
    const { setIsVisible, setReloadMenu } = props;
    const [ menuData , setMenuData ] = useState();
    
    const addMenu = () => {
        const { title, description, url } = menuData;

        if(!title || !description || !url ) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            });
        } else {
            const accessToken = getAccToken();
            
            AddMenu(accessToken, menuData)
                .then(res => {
                    if(res.status === 200) {
                        notification['success']({
                            message: res.data.message
                        });
                        setMenuData();
                        setIsVisible(false);
                        setReloadMenu(true);
                    } else {
                        notification['error']({
                            message: res.response.data.message
                        })
                    }
                })
        }
    }
    
    return (<AddForm menuData={menuData} setMenuData={setMenuData} addMenu={addMenu} />);
}

function AddForm(props) {

    const { menuData, setMenuData, addMenu } = props;

    return (
        <Form className='form-add' onFinish={addMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder='Titulo'
                    onChange={e => setMenuData({ ...menuData, title: e.target.value })}
                //value={}
                />
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder='Descripcion'
                    onChange={e => setMenuData({ ...menuData, description: e.target.value })}
                //value={}
                />
            </Form.Item>

            <Form.Item>
                <Input
                    addonBefore="http://"
                    defaultValue="mysite"
                    onChange={e => setMenuData({ ...menuData, url: e.target.value })}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >Crear menú</Button>
            </Form.Item>
        </Form>
    )
}

export default AddMenuForm;