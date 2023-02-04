import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, Select, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './AddUser.scss';



const AddUserForm = () => {
    return (
        <div className="add-user-form">
            <AddForm />
        </div>
    );
}

function AddForm() {
    const [imageUrl, setImageUrl] = useState();

    return (
        <Form className='form-add'>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            name="avatar"
                            type='file'
                            className="avatar-uploader"
                            onChange={(e) => setImageUrl(e.target.files[0])}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        {imageUrl ? (
                            <img
                                src={URL.createObjectURL(imageUrl)}
                                alt="avatar"
                                style={{
                                    width: '15%'
                                }}
                            />
                        ) : (
                            null
                        )}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Nombre'
                        //value={}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Apellido'
                        //value={}
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
                        //value={}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccionar rol"
                        //value={userData.role}
                        //</Form.Item>onChange={e => setUserData({ ...userData, role: e })}
                        >
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="editor">Colaborador</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            type="password"
                        //velue={userData.password}
                        //onChange={e => setUserData({ ...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Repetir Password"
                            type="password"
                        //velue={userData.rePassword}
                        //onChange={e => setUserData({ ...userData, rePassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default AddUserForm;