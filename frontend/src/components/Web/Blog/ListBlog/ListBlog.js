import React, { useEffect, useState } from 'react';
import { Spin, List, notification } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { GetPosts } from '../../../../api/posts';
import './ListBlog.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListBlog = () => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        GetPosts(12)
            .then(response => {
                setPosts(response.data.listPost)
            })
            .catch(() => {
                notification['error']({
                    message: 'Error en el servidor, intente de nuevo más tarde.'
                })
            })
    }, [])

    if (!posts) {
        return (
            <Spin indicator={antIcon} tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
        )
    }

    return (
        <div className="blog-list__posts">
            <h1>Entradas de Blog</h1>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 12,
                }}
                dataSource={posts}
                renderItem={post => <Post post={post} />}
            />
        </div>
    );
}

function Post(props) {

    const { post } = props;

    const month = moment(post.date).format("LLL");

    return (
        <Link to={`blog/${post.url}`}>
            <List.Item
                key={post.title}
                extra={
                    <img
                        width={100}
                        alt="logo"
                        src={post.img}
                        style={{ borderRadius: "5px"}}
                    />
                }
            >
                <List.Item.Meta
                    title={<Link style={{ fontStyle: 'italic', fontWeight: '700' }} to={`blog/${post.url}`}>{post.title}</Link>}
                />
                <div style={{ fontSize: "12px", color: "#7a95e8" }}>
                    {month}
                </div>
            </List.Item>
        </Link>
    );
}

export default ListBlog;