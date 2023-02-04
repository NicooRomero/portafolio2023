import React, { useEffect, useState } from 'react'
import { Avatar, Button, List } from 'antd';
import { Link } from 'react-router-dom';
import BLOG from '../../../assets/img/blog.png';
import { RightCircleFilled } from '@ant-design/icons';
import { GetPosts, GetPinned } from '../../../api/posts';

import './Blog.scss';


const Blog = () => {

    const [posts, setPosts ] = useState();
    const [ pinned, setPinned ] = useState();

    useEffect(() => {
        GetPosts(5)
            .then(response => {
                setPosts(response.data.listPost)
            })
        
        GetPinned(3)
            .then(res => {
                setPinned(res.data.postPinned)
            })
    }, [])


    return (
        <div className="blog-personal">
            <div className="blog-personal__main">
                <div className="blog-personal__main-title">
                    <div className="blog-personal__main-title__desc">
                        <h2>Blog <br/> Personal</h2>
                        <h3>Artículos de blog e inspiración, trabajos en curso, avances y actualizaciones sobre mi desarrollo personal y/o profesional.</h3>
                        <div>
                            <Button>
                                <RightCircleFilled />
                                <Link to='/blog'> Ver todas las entradas</Link>
                            </Button>
                        </div>
                    </div>                    
                </div>
                <div className="blog-personal__main-latest">
                    <p>Más Recientes</p>
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={posts}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                // extra={
                                //     <img
                                //         width={272}
                                //         alt="logo"
                                //         src={item.img}
                                //     />
                                // }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={BLOG} />}
                                    title={<Link  to={`/blog/${item.url}`}>{item.title}</Link>}
                                    //description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <div className="blog-personal__main-pinned">
                <p>Destacados</p>
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={pinned}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                // extra={
                                //     <img
                                //         width={272}
                                //         alt="logo"
                                //         src={item.img}
                                //     />
                                // }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={BLOG} />}
                                    title={<Link to={`/blog/${item.url}`}>{item.title}</Link>}
                                    //description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />        
            </div>
        </div>
    );
}

export default Blog;