import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, Select, Upload, notification  } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { RegisterApi } from '../../../../api/user';
import './AddUser.scss';



const AddUserForm = (props) => {

    const { setIsVisible, setReload } = props;
    const [userData, setUserData] = useState({});
    const [imageUrl, setImageUrl] = useState();
    
    const submitForm = async () => {

        const { name, lastname, email, password, rePassword, role } = userData;

        if(!name || !lastname || !email || !password || !rePassword) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            })
        } else if(password !== rePassword) {
            notification['error']({
                message: 'Las contraseñas no coinciden.'
            })
        } else {
            // eslint-disable-next-line
            const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            const resultValidation = emailValid.test(email);

            if(resultValidation) {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('lastname', lastname);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('repassword', rePassword);
                formData.append('isAdmin', role);
                formData.append('image', imageUrl);

                let result = await RegisterApi(formData);
                if(result.message) {
                    if(result.status === 200){
                        notification['success']({
                            message: result.message
                        });
                    } else {
                        notification['error']({
                            message: result.message
                        });
                    }
                }
            } else {
                notification['error']({
                    message: "Ingrese un email válido."
                });
            }
        
        }
        setIsVisible(false);
        setReload(true);
        setUserData({});
        setImageUrl();
    }

    return (
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                setImageUrl={setImageUrl}
                submitForm={submitForm}
            />
        </div>
    );
}

function AddForm(props) {

    const { userData, setUserData, submitForm, setImageUrl } = props;

    return (
        <Form className='form-add' onFinish={submitForm}>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Nombre'
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Apellido'
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
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
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        //value={}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccionar rol"
                            onChange={e => setUserData({ ...userData, role: e })}
                            //value={userData.role}
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
                            placeholder="Password"
                            type="password"
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
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
                            onChange={e => setUserData({ ...userData, rePassword: e.target.value })}
                        //velue={userData.rePassword}
                        //onChange={e => setUserData({ ...userData, rePassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Upload
                            action={'http://localhost:4000/api/v1/cursos/fixupload'}
                            onChange={(e) => setImageUrl(e.file.originFileObj)}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Crear Usuario</Button>
            </Form.Item>
        </Form>
    )
}

export default AddUserForm;