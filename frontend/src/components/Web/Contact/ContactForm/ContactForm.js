import React from 'react';
import {Image, Row, Col} from 'antd';
import { PhoneOutlined, MailOutlined, LinkedinOutlined } from '@ant-design/icons'
import GetInTouch from '../../../../assets/img/getintouch.gif';
import './ContactForm.scss';
import Formulario from './Formulario';


const ContactForm = () => {

    return (
        <div className='contact-form'>
            <Row>
                <Col span={4} />
                <Col span={16}>
                    <h2>Pongámonos en contacto</h2>
                    <div className="contact-form__body">
                        <div className="contact-form__body-form">
                            <Formulario />
                        </div>
                        <div className="contact-form__body-alt">
                            <Image
                                preview={false}
                                width={400}
                                src={GetInTouch}
                            />
                            <div className="contact-form__body-alt__num"> 
                                <div className="contact-form__body-alt__num-icon"><PhoneOutlined /><a href="https://walink.co/c15e3b" target="_blank" rel="noreferrer"><h3>+54 385 426 3515</h3></a></div>
                                <div className="contact-form__body-alt__num-icon"><MailOutlined /><a href="mailto:nicooromero@gmail.com" target="_blank" rel="noreferrer"><h3>nicooromero@gmail.com</h3></a></div>
                                <div className="contact-form__body-alt__num-icon"><LinkedinOutlined /><a href="https://www.linkedin.com/in/nicooromero/" target="_blank" rel="noreferrer"><h3>LinkedIn</h3></a></div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={4} />
            </Row>
        </div>
    );
}

export default ContactForm;