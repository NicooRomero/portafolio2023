import React, { useState, useEffect } from 'react';
import { Card, List } from 'antd';
import { EyeOutlined, DesktopOutlined } from '@ant-design/icons';
import { GetCursosDev } from '../../../../api/cursos';

const { Meta } = Card;

const Desarrollo = () => {

    const [curso, setCurso] = useState();

    useEffect(() => {
        GetCursosDev()
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
                            <a href={item.url} target="_blank" rel="noreferrer"><p><EyeOutlined /> Ver más</p></a>,
                            <p><DesktopOutlined /> {item.subtitle}</p>
                        ]}
                    >
                        <Meta
                            //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={item.title}
                            description={item.description.slice(0,200)}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default Desarrollo;