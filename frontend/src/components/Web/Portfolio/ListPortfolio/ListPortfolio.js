import React from 'react';
import { GithubOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, List } from 'antd';
import './ListPortfolio.scss';

const { Meta } = Card;


const ListPortfolio = (props) => {

    const { data } = props;

    return (
        <div className="portfolio-list">
            <h1>Portafolio Personal</h1>
            <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{
                                width: 250,
                            }}
                            cover={
                                <img
                                    alt={item.id}
                                    src={item.img}
                                />
                            }
                            actions={[
                                <a href={item.url} target="_blank" rel="noreferrer"><EyeOutlined key="eye" /></a>,
                                <a href={item.git} target="_blank" rel="noreferrer"><GithubOutlined key="git" /></a> 
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
        </div>
    );
}

export default ListPortfolio;