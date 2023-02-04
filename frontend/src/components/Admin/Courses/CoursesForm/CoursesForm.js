import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Select, Upload } from 'antd';
import { FontSizeOutlined, LinkOutlined, UploadOutlined, DesktopOutlined } from '@ant-design/icons';
import { getAccToken } from '../../../../api/auth';
import { AddCurso, EditCurso } from '../../../../api/cursos';

const { TextArea } = Input;
const { Option } = Select;

const CoursesForm = (props) => {

    const { course, category, setIsVisible, setReloadData } = props;
    const [ courseData, setCourseData ] = useState();
    const [ imageUrl, setImageUrl ] = useState();

    useEffect(() => {
        course ? setCourseData({
            title: course.title,
            subtitle: course.subtitle,
            description: course.description,
            url: course.url
        }) : setCourseData();
    }, [course]);

    const addCourse = () => {
        
        if(
            !courseData ||
            !courseData.title || 
            !courseData.subtitle ||
            !courseData.description ||
            !courseData.url ||
            !courseData.category ||
            !imageUrl
        ) {
            notification['error']({
                message: 'Error todos los campos son obligatorios.'
            })
        } else {
            const formData = new FormData();
            const accessToken = getAccToken();

            formData.append('title', courseData.title);
            formData.append('subtitle', courseData.subtitle);
            formData.append('description', courseData.description);
            formData.append('url', courseData.url);
            formData.append('category', courseData.category);
            formData.append('image', imageUrl);

            AddCurso(accessToken, formData)
                .then(response => {
                    notification['success']({
                        message: response.message
                    })
                })
                .catch(err => {
                    notification['error']({
                        message: 'Error al crear el curso!'
                    })
                    console.log(err)
                })
            
                setCourseData();
                setIsVisible(false);
                setReloadData(true);
        }
    }

    const updateCourse = () => {
        const formData = new FormData();
        const accessToken = getAccToken();
        const id = course._id;

        if(!courseData.category) {
            notification['error']({
                message: 'Seleccionar una categoría.'
            })
        } else {
            formData.append('title', courseData.title);
            formData.append('subtitle', courseData.subtitle);
            formData.append('description', courseData.description);
            formData.append('url', courseData.url);
            formData.append('category', courseData.category);
            if (imageUrl) formData.append('image', imageUrl);

            EditCurso(accessToken, formData, id)
                .then(response => {
                    console.log(response)
                    notification['success']({
                        message: response.message
                    })
                })
                .catch(err => {
                    notification['error']({
                        message: 'Error al crear el curso!'
                    })
                    console.log(err)
                })
            
                setIsVisible(false);
                setReloadData(true);
        }       
    }

    return (
        <div className="form-courses">
            <FormAddEddit course={course} setCourseData={setCourseData} courseData={courseData} addCourse={addCourse} updateCourse={updateCourse} category={category} setImageUrl={setImageUrl} />
        </div>
    );
}

function FormAddEddit(props) {

    const { course, setCourseData, courseData, addCourse, updateCourse, category, setImageUrl } = props;

    return (
        <Form onFinish={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder='Titulo del curso'
                    value={courseData ? courseData.title : ''}
                    onChange={e => setCourseData({ ...courseData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<DesktopOutlined />}
                    placeholder='Plataforma'
                    value={courseData ? courseData.subtitle : ''}
                    onChange={e => setCourseData({ ...courseData, subtitle: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <TextArea
                    prefix={<FontSizeOutlined />}
                    placeholder='Descripcion del curso'
                    value={courseData ? courseData.description : ''}
                    onChange={e => setCourseData({ ...courseData, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined />}
                    placeholder='Url del curso'
                    value={courseData ? courseData.url : ''}
                    onChange={e => setCourseData({ ...courseData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Select
                    showSearch
                    placeholder="Seleccionar categoria"
                    optionFilterProp="children"
                    onChange={e => setCourseData({ ...courseData, category: e })}
                    //onSearch={onSearch}
                >   
                {category.map((item) => (
                    <Option key={item._id}>{item.name}</Option>
                ))}
                </Select>
            </Form.Item>
            <Form.Item>
                        <Upload
                            action={'http://localhost:4000/api/v1/cursos/fixupload'}
                            onChange={(e) => setImageUrl(e.file.originFileObj)}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        </Upload>
                    </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {course ? "Actualizar Curso" : "Crear curso"}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CoursesForm;