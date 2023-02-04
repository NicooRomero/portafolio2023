import React, { useState } from 'react';
import { List, Button, Modal as ModalAntd, notification, Space, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DeletePost } from '../../../../api/posts';
import { getAccToken } from '../../../../api/auth'
import PostForm from '../EditPost/PostForm';
import Modal from '../../../Modal';
import moment from "moment";

const { confirm } = ModalAntd;

const PostList = (props) => {

    const { posts, setReloadPost } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    const editPost = (post) => {
        setIsVisible(true);
        setModalTitle(`${post.title}`);
        setModalContent(<PostForm post={post} setIsVisible={setIsVisible} setReloadPost={setReloadPost} />)
    }

    const deletePost = post => {
        const accessToken = getAccToken();

        confirm({
            title: "Eliminando post",
            content: `Estás seguro de eliminar el post ${post.title}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "cancelar",
            onOk() {
                DeletePost(accessToken, post._id)
                    .then(response => {
                        const typeNotification = response.status === 200 ? "success" : "warning";
                        notification[typeNotification]({
                            message: response.data.message
                        });
                        setReloadPost(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error en el servidor, intente de nuevo más tarde."
                        })
                    })
            }
        })
    }

    return ( 
        <div className="post-list">
            <Post 
                posts={posts}
                editPost={editPost}
                isVisible={isVisible}
                modalTitle={modalTitle}
                modalContent={modalContent}
                setIsVisible={setIsVisible} 
                deletePost={deletePost}
            />
        </div>
    );
}

function Post(props) {

    const { posts, editPost, isVisible, modalTitle, modalContent, setIsVisible, deletePost } = props;

    if(!posts) {
        return (
            <Space size="middle" className="spin">
                <Spin size="large" tip='Cargando entradas....' />
            </Space>
        )
    } else {
        return (
            <div>
                <List
                            className='courses-list'
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                pageSize: 5
                            }}
                            dataSource={posts}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <Button type="primary" ghost onClick={() => editPost(item)}> <EditOutlined /> Editar </Button>,
                                        <Button type="danger" ghost onClick={() => deletePost(item)}> <DeleteOutlined /> Eliminar </Button>,
                                        //<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    ]}
                                    extra={
                                        <img
                                            width={150}
                                            alt="logo"
                                            src={item.img}
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        className='courses-list__info'
                                        //avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.url}>{item.title}</a>}
                                        //description={item.description}
                                        />
                                        <div className="courses-list__info-cat">
                                        <h4>Fecha publicación:</h4> {moment(item.date).format("LLL")}
                                    </div>
                                </List.Item>
                            )}
                        />    
                        <Modal title={modalTitle} isVisible={isVisible}  setIsVisible={setIsVisible} width="75%">{modalContent}</Modal>
            </div>                
        )
    }
}

export default PostList;