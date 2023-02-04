import React, { useState, useEffect } from 'react';
import { Avatar, Button, Form, Input, Row, Col, Select, Upload, notification  } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { getAccToken } from '../../../../api/auth';
import { UpdateUser } from '../../../../api/user';
import './EditUser.scss';

const EditUser = (props) => {
    const { user, setIsVisible, setReload } = props;
    const [userData, setUserData] = useState({});
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.isAdmin,
            image: user.image,
        })
    }, [user]);

    const updateUser = async () => {
        const userUpdate = userData;
        const token = getAccToken();
        const id = user._id;

        if(userUpdate.password || userData.rePassword) {
            if(userUpdate.password !== userData.rePassword) {
                notification['error']({
                    message: 'Las contraseñas no son iguales.'
                })
                return;
            } else {
                delete userUpdate.rePassword;
            }
        }
        
        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification['error']({
                message: 'Nombre, Apellido & Email son obligatorios'
            })
            return;
        }

        // eslint-disable-next-line
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        const resultValidation = emailValid.test(userUpdate.email);

        if(resultValidation) {
            const formData = new FormData();
                formData.append('name', userUpdate.name);
                formData.append('lastname', userUpdate.lastname);
                formData.append('email', userUpdate.email);
                if (userUpdate.password) formData.append('password', userUpdate.password);
                if (userUpdate.rePassword) formData.append('repassword', userUpdate.rePassword);
                formData.append('isAdmin', userUpdate.role);
                if (imageUrl) formData.append('image', imageUrl)

                let result = await UpdateUser(token, formData, id)
                if(result) {
                    notification['success']({
                        message: result.message
                    });
                } else {
                    notification['error']({
                        message: result.message
                    });
                }
        }
        setIsVisible(false);
        setReload(true);
    }
    
    return ( 
        <div className="edit-user-form">
            <EditForm user={user} userData={userData} setUserData={setUserData} setImageUrl={setImageUrl} updateUser={updateUser} />
        </div>
    );
}

function EditForm(props) {

    const { user, userData, setUserData, setImageUrl, updateUser } = props;

    return (
        <Form className='form-add' onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item className='form-add_avatar'>
                        <Avatar className='form-add_avatar-img' size={64} src={userData.image} icon={<UserOutlined />} />
                        <h2 className='form-add_avatar-h2'>{user.name + ' ' + user.lastname}</h2>
                    </Form.Item>   
                </Col>
            </Row>
            
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Nombre'
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Apellido'
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder='Email'
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccionar rol"
                            value={userData.role ? 'Admin' : 'Colaborador'}
                            onChange={e => setUserData({ ...userData, role: e })}
                        >
                            <Select.Option value={true}>Admin</Select.Option>
                            <Select.Option value={false}>Colaborador</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Nueva Password"
                            type="password"
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Repetir Nueva Password"
                            type="password"
                            onChange={e => setUserData({ ...userData, rePassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Upload
                            onChange={(e) => setImageUrl(e.file.originFileObj)}
                            listType="picture"
                        >
                            <Button className='btn-upld' icon={<UploadOutlined />}>Upload Nuevo Avatar</Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn-submit">Editar Usuario</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default EditUser;