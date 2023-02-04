import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { LogInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN, DATA_USER } from '../../../utils/const';

import './Login.scss';

const Login = () => {
    const [ inputs, setInputs ] = useState({
        email: '',
        password: ''
    });

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value
        })
    }

    const onFinish = async () => {
        const result = await LogInApi(inputs);
        if(result.message) {
            notification['error']({
                message: result.message
            });
        } else {
            const { accessToken, refreshToken, userName } = result;

            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            localStorage.setItem(DATA_USER, userName);

            notification['success']({
                message: 'Login Correcto!'
            });

            window.location = '/admin';
        }
    }
    
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onChange={onChange}
            onFinish={onFinish}
        >
            <Form.Item
                name="email-err"
                rules={[{ required: true, message: 'Por favor ingrese su email!' }]}
            >
                <Input 
                    name="email"
                    type='email'
                    placeholder="Email"
                    className='login-form__input' 
                    prefix={<UserOutlined  style={{color: "rgba(0,0,0,.25)"}} />} 
                />
            </Form.Item>
            <Form.Item
                name='password-err'
                rules={[{ required: true, message: 'Por favor ingrese su password!' }]}
            >
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className='login-form__input'
                    prefix={<LockOutlined  style={{color: "rgba(0,0,0,.25)"}} />}
                />
            </Form.Item>
            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button"
                >
                    Iniciar Sesion
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;