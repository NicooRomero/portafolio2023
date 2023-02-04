import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { EditMenu } from '../../../../api/menu';
import { getAccToken } from '../../../../api/auth';

const EditMenuForm = (props) => {
    
    const { setIsVisible, setReloadMenu, menuData } = props;
    const [ menuEdit , setMenuEdit ] = useState({});

    useEffect(() => {
        setMenuEdit(menuData)
    },[menuData]);

    const editMenu = () => {
        const { title, description, url } = menuEdit;

        if(!title || !description || !url ) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            });
        } else {
            const accessToken = getAccToken();
            
            EditMenu(accessToken, menuEdit, menuEdit.id)
                .then(res => {
                    console.log(res)
                    if(res.status === 200) {
                        notification['success']({
                            message: res.data.message
                        });
                    } else {
                        notification['error']({
                            message: res.response.data.message
                        })
                    }
                })
            
            setIsVisible(false);
            setMenuEdit({});
            setReloadMenu(true);
        }
    }
    
    return (<AddForm menuEdit={menuEdit} setMenuEdit={setMenuEdit} editMenu={editMenu} />);
}

function AddForm(props) {

    const { menuEdit, setMenuEdit, editMenu } = props;

    return (
        <Form className='form-add' onFinish={editMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder='Titulo'
                    onChange={e => setMenuEdit({ ...menuEdit, title: e.target.value })}
                    value={menuEdit.title}
                />
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder='Descripcion'
                    onChange={e => setMenuEdit({ ...menuEdit, description: e.target.value })}
                    value={menuEdit.description}
                />
            </Form.Item>

            <Form.Item>
                <Input
                    addonBefore="http://"
                    defaultValue="mysite"
                    onChange={e => setMenuEdit({ ...menuEdit, url: e.target.value })}
                    value={menuEdit.url}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >Crear menú</Button>
            </Form.Item>
        </Form>
    )
}

export default EditMenuForm;