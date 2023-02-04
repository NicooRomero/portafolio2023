import React from 'react';
import { Layout, Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import { getAccToken } from '../../../api/auth';

// components
import LoginForm from '../../../components/Admin/Login';
import RegisterForm from '../../../components/Admin/Register';

import './LogIn.scss';

const Login = () => {
    const { Content } = Layout;
    const { TabPane } = Tabs;

    if(getAccToken()) {
        return <Redirect to='/admin' />
    }

    return (  
        <Layout className='login'>
            <Content className='login__content'>
                <h1 className='login__content-logo'>Administración</h1>
                <div className='login__content-tabs'>
                    <Tabs type='card'>
                        <TabPane tab={<span>Ingresar</span>} key='1'>
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Registrarse</span>} key='2'>
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}

export default Login;