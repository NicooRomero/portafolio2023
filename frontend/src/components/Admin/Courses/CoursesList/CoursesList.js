import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Button, List, Space, Spin, Modal as ModalAntd, notification } from 'antd';
import CoursesForm from '../CoursesForm/CoursesForm';
import { getAccToken } from '../../../../api/auth';
import { DeleteCurso } from '../../../../api/cursos'
import Modal from '../../../Modal';
import './CoursesList.scss';

const { confirm } = ModalAntd;

const CoursesList = (props) => {

    const { data, setReloadData, category } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    const addCourse = () => {
        setIsVisible(true);
        setModalTitle('Agregar nuevo curso');
        setModalContent(<CoursesForm setIsVisible={setIsVisible} setReloadData={setReloadData} category={category} />)
    }

    const editCourse = (course) => {
        setIsVisible(true);
        setModalTitle(`${course.title}`);
        setModalContent(<CoursesForm course={course} setIsVisible={setIsVisible} setReloadData={setReloadData} category={category} />)
    }

    const deletCourse = (course) => {
        const accessToken = getAccToken();
        const id = course.id;

        confirm({
            title: 'Eliminar curso',
            content: `¿Estás seguro que quieres eliminar el curso ${course.title}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                DeleteCurso(id, accessToken)
                    .then(res => {
                        console.log(res)
                        if(res.status === 200) {
                            notification['success']({
                                message: res.data.message
                            })
                        } else {
                            notification['error']({
                                message: 'Hubo un error al eliminar el curso.'
                            })
                        }
                    })
                    setReloadData(true);
            }
        })
    }


    if(!data) {
        return (
            <Space size="middle" className="spin">
                <Spin size="large" tip='Cargando lista de usuarios....' />
            </Space>
        )
    } else {
        return (
            <div>
                <div className="courses-web__header">
                    <Button
                        type="primary"
                        className='add-curso_btn'
                        onClick={addCourse}
                        >
                        <FileDoneOutlined />Nuevo Curso
                    </Button>
                </div>
                <div className='web-courses'>
                    <List
                        className='courses-list'
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            pageSize: 3
                        }}
                        dataSource={data}
                        // footer={
                        //     <div className='courses-list__footer'>
                        //         <b>ant design</b> footer part
                        //     </div>
                        // }
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <Button type="primary" ghost onClick={() => editCourse(item)}> <EditOutlined /> Editar </Button>,
                                    <Button type="danger" ghost onClick={() => deletCourse(item)}> <DeleteOutlined /> Eliminar </Button>,
                                    //<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src={item.image}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    className='courses-list__info'
                                    //avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.url}>{item.title}</a>}
                                    description={item.description}
                                    />
                                <div className="courses-list__info-cat">
                                    <h4>Plataforma:</h4> {item.subtitle} <h4 className='h4Last'>Categoria:</h4> {item.category.name}
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <Modal
                    title={modalTitle}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                >
                    {modalContent}
                </Modal>
            </div>
        );
    }
}

export default CoursesList;