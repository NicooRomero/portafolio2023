import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import PostList from '../../../components/Admin/Blog/PostsList/PostList';
import { GetPosts } from '../../../api/posts';
import PostForm from '../../../components/Admin/Blog/EditPost/PostForm';
import Modal from '../../../components/Modal';

import './Blog.css'

const Blog = () => {

    const [ posts, setPosts ] = useState();
    const [ reloadPost, setReloadPost ] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modaltitle, setModalTitle ] = useState("");
    const [ modalContent, setModalContent ] = useState(null);
    
    useEffect(() => {
        GetPosts(0)
            .then(res => {
                if(res.status === 200) {
                    setPosts(res.data.listPost)
                    setReloadPost(false);
                } else {
                    notification['error']({
                        message: res.data.message
                    })
                }
            })
    }, [reloadPost])
    console.log(posts)
    
    const addPost = () => {
        setIsVisible(true);
        setModalTitle("Creando nuevo post");
        setModalContent(
            <PostForm setIsVisible={setIsVisible} setReloadPost={setReloadPost} post={null} />
        )
    }

    return ( 
        <div className="blog">
            <div className="blog__add-post">
                <Button type='primary' onClick={addPost} >Nuevo Post</Button>
            </div>

            <PostList posts={posts} setReloadPost={setReloadPost} />

            <Modal title={modaltitle} isVisible={isVisible}  setIsVisible={setIsVisible} width="75%">{modalContent}</Modal>
        </div>
    );
}

export default Blog;