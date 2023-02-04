import React, { useState } from 'react';
import { Form, Input, Button,  notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { RegisterApi } from '../../../api/user';

import './Register.scss';
import { createRef } from 'react';

const Register = () => {
    const [inputs, setInputs] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [ error, setError ] = useState('');

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })

    }

    const urlRef = createRef();

    const onSubmit = async () => {

        const { name, email, password, repassword } = inputs;

        if(!name || !email || !password || !repassword ) {
            setError('error');
            notification['error']({
                message: 'Error! Todos los campos son obligatorios.'
            });
        } else {
            setError();
            if(password !== repassword) {
                notification['error']({
                    message: "Las contraseñas no coinciden."
                });
            } else {
                // eslint-disable-next-line
                const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                const resultValidation = emailValid.test(email);

                if(resultValidation) {
                    const formData = new FormData();
                    formData.append('name', inputs.name);
                    formData.append('lastname', inputs.lastname);
                    formData.append('email', inputs.email);
                    formData.append('password', inputs.password);
                    formData.append('repassword', inputs.repassword);
                    formData.append('image', selectedFile);
            
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
                
                setInputs({
                    name: '',
                    lastname: '',
                    email: '',
                    password: '',
                    repassword: '',
                });
                setSelectedFile(null);
            }
        }
    };

    return (
        <Form className="reg-form" onFinish={onSubmit}  >
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    status={error}
                    type="name"
                    name="name"
                    placeholder="Nombre"
                    className="reg-form__input"
                    onChange={onChange}
                    value={inputs.name}                
                />
                <Input
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    status={error}
                    type="name"
                    name="lastname"
                    placeholder="Apellido"
                    className="reg-form__input"
                    onChange={onChange}
                    value={inputs.lastname}                
                />
                <Input
                    prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    status={error}
                    type="email"
                    name="email"
                    placeholder="Correo"
                    className="reg-form__input"
                    onChange={onChange}
                    value={inputs.email}                
                />
                <Input
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    status={error}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="reg-form__input"
                    onChange={onChange}
                    value={inputs.password}
                />
                <Input
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    status={error}
                    type="password"
                    name="repassword"
                    placeholder="Repetir Contraseña"
                    className="reg-form__input"
                    onChange={onChange}
                    value={inputs.repassword}
                />
                <Input
                    status={error}
                    name='image'
                    type='file'
                    ref={urlRef}
                    className="avatar-uploader"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType="submit" className="reg-form-button">
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;