import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined, FileImageOutlined, GithubOutlined } from '@ant-design/icons';
import { AddProyectApi, EditProyectApi } from '../../../../api/portfolio';
import { getAccToken } from '../../../../api/auth';


const AddEditForm = (props) => {

    const { setIsVisible, setReloadProyects, proyect } = props;
    const [ proyectData, setProyectData ] = useState({});

    useEffect(() => {
        proyect ? setProyectData(proyect) : setProyectData({});
    }, [proyect]);

    const addProyect = () => {
        if(!proyectData) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        } else {
            const accessToken = getAccToken();

            AddProyectApi(accessToken, proyectData)
                .then(response => {
                        notification['success']({
                            message: response.data.message
                        });
                    setIsVisible(false);
                    setReloadProyects(true);
                    setProyectData({});
                })
                .catch(err => {
                    console.log(err)
                    notification["error"]({
                        message: "Error en el servidor, intente de nuevo más tarde."
                    })
                })
        }
    }

    const updateProyect = () => {
        const accessToken = getAccToken();
        
        EditProyectApi(accessToken, proyect.id, proyectData)
            .then(response => {
                if(response.status === 200) {
                    notification["success"]({
                        message: response.data.message
                    })
                } else {
                    notification["error"]({
                        message: "Error en el servidor, intente de nuevo más tarde."
                    })
                }
                        
                setIsVisible(false);
                setReloadProyects(true);
                setProyectData({});
            })
            .catch(err => {
                console.log(err)
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                })
            })
    }

    return ( 
        <Form className="form-add-edit" onFinish={proyect ? updateProyect : addProyect}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo del proyecto"
                    value={proyectData.title}
                    onChange={e => setProyectData({ ...proyectData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Descripcion del proyecto"
                    value={proyectData.description}
                    onChange={e => setProyectData({ ...proyectData, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="Url"
                    value={proyectData.url}
                    onChange={e => setProyectData({ ...proyectData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<GithubOutlined />}
                    placeholder="Url"
                    value={proyectData.git}
                    onChange={e => setProyectData({ ...proyectData, git: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<FileImageOutlined />}
                    placeholder="Url imagen"
                    value={proyectData.img}
                    onChange={e => setProyectData({ ...proyectData, img: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {proyect ? "Actualizar Curso" : "Crear curso"}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddEditForm;