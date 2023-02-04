import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, Upload, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined, UploadOutlined } from '@ant-design/icons';
import { getAccToken } from '../../../../api/auth';
import { AddPost, EditPost } from '../../../../api/posts';
import { Editor } from "@tinymce/tinymce-react";
import moment from 'moment';

import './PostForm.css'

const PostForm = (props) => {

    const { setIsVisible, setReloadPost, post } = props;
    const [ postData, setPostData ] = useState({});
    const [ imageUrl, setImageUrl ] = useState();
    console.log(postData)
    
    const editorRef = useRef();

    useEffect(() => {
        if(post) {
            setPostData({
                title: post.title,
                url: post.url,
                date: post.date,
                description: post.description
            })
        }
    }, [post]);

    const onFinish = () => {
        const { title, url, date } = postData;
        
        if(!title || !url || !date ) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            })
        } else {
            if(!post) {
                createPost();
            } else {
                editPost();
            }
        }
    }

    const createPost = () => {
        
        const accessToken = getAccToken();

        const formData = new FormData();
        const title = postData.title;
        const url = postData.url;
        const date = postData.date;
        
        formData.append('title', title);
        formData.append('url', url);
        formData.append('description', editorRef.current.getContent());
        formData.append('date', date);
        formData.append('img', imageUrl);
        
        AddPost(accessToken, formData)
            .then(res => {
                if(res.status === 200) {
                    notification['success']({
                        message: res.data.message
                    })
                }
            })
            .catch(err => {
                notification['error']({
                    message: 'Error al crear el curso!'
                })
                console.log(err)
            })

                    setIsVisible(false);
                    setReloadPost(true);
                    setPostData({});
    }

    const editPost = () => {
        
        const accessToken = getAccToken();
        const id = post.id;
        
        const formData = new FormData();
        const title = postData.title;
        const url = postData.url;
        const date = postData.date;
        
        formData.append('title', title);
        formData.append('url', url);
        formData.append('description', editorRef.current.getContent());
        formData.append('date', date);
        if (imageUrl) formData.append('img', imageUrl);

        EditPost(accessToken, formData, id)
            .then(res => {
                if(res.status === 200) {
                    notification['success']({
                        message: res.data.message
                    })
                }
            })
            .catch(err => {
                notification['error']({
                    message: 'Error al crear el curso!'
                })
                console.log(err)
            })

            setIsVisible(false);
            setReloadPost(true);
            setPostData({});
            setImageUrl();

    }


    return (<FormPost post={post} postData={postData} setPostData={setPostData} setImageUrl={setImageUrl} onFinish={onFinish} editorRef={editorRef} />);
}

function FormPost(props) {

    const { post, postData, setPostData, setImageUrl, onFinish, editorRef } = props;
    
    return (
        <Form
            className="add-edit-post-form"
            layout="inline"
            onFinish={onFinish}
        >
            <div className="add-edit-post-form__input">
                <Row gutter={24}>
                    <Col span={8}>
                        <Input
                            prefix={<FontSizeOutlined />}
                            placeholder="Titulo"
                            value={postData.title}
                            onChange={e => setPostData({ ...postData, title: e.target.value })}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            prefix={<LinkOutlined />}
                            placeholder="url"
                            value={postData.url}
                            onChange={e => setPostData({ ...postData, url: textUrl(e.target.value) })}
                        />
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            style={{ width: "100%" }}
                            format="DD/MM/YYYY HH:mm:ss"
                            placeholder="Fecha de publicación"
                            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                            value={postData.date && moment(postData.date)}
                            onChange={(e, value) => setPostData({ ...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString() })}
                        />
                    </Col>
                </Row>
            </div>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={postData.description }
                apiKey='jtfs8aam4ce9871rryqjyf0e32ipln6vxa9tbtooc2rfocnw'
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'image'
                    ],
                    
                    toolbar: 'undo redo | formatselect | ' + // eslint-disable-next-line
                        'bold italic backcolor | alignleft aligncenter ' + // eslint-disable-next-line
                        'alignright alignjustify | bullist numlist outdent indent | ' + // eslint-disable-next-line
                        'removeformat | help' + 'link image', // eslint-disable-next-line
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            //onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />
            <Upload
                action={'http://localhost:4000/api/v1/cursos/fixupload'}
                onChange={(e) => setImageUrl(e.file.originFileObj)}
                listType="picture"
                clas
            >
                <Button className='upload-btn' icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            <Button type="primary" htmlType="submit" className="btn-submit">
                {post ? "Actualizar Post" : "Crear Post"}
            </Button>
        </Form>
    )
}

function textUrl(text) {
    const url = text.replace(" ", "-");

    return url.toLowerCase();
}

export default PostForm;