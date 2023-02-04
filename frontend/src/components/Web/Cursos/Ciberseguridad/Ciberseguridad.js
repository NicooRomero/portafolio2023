import React, { useState, useEffect } from 'react';
import { Card, List } from 'antd';
import { EyeOutlined, DesktopOutlined } from '@ant-design/icons';
import { GetCursosCib } from '../../../../api/cursos';
import './Ciber.scss';
const { Meta } = Card;

const Ciberseguridad = () => {
    const [curso, setCurso] = useState();

    useEffect(() => {
        GetCursosCib()
            .then(res => {
                setCurso(res)
            })
    }, [])

    return (
        <List
            pagination={{ pageSize: 3 }}
            dataSource={curso}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        style={{
                            width: 280,
                            maxHeight: 440,
                        }}
                        hoverable={true}
                        cover={
                            <img
                                alt={item.title}
                                src={item.image}
                            />
                        }
                        actions={[
                            //<Button type="primary" ghost onClick={() => console.log('hola')}> Ver más </Button>, 
                            <a href={item.url} target="_blank" rel="noreferrer" ><p><EyeOutlined /> Ver más</p></a>,
                            <p><DesktopOutlined /> {item.subtitle}</p>
                        ]}
                    >
                        <Meta
                            title={item.title}
                            description={item.description}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default Ciberseguridad;