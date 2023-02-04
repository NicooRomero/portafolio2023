import React, { useRef } from 'react';
import { Formik } from 'formik';
import { Button, Form, Input, message, notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import emailjs from '@emailjs/browser';

const { TextArea } = Input;

const Formulario = () => {
    const form = useRef();
    return (
        <Formik
            initialValues={{ to_name: '', email_address: '', subject_message: '', message_text: '' }}
            
            onSubmit={(values) => {

                if (!values.to_name || !values.email_address || !values.subject_message || !values.message_text) {
                    notification["error"]({
                        message: "Error al enviar mensaje.",
                        description: 'Todos los campos son obligatorios.',
                        icon: (
                            <FrownOutlined
                                style={{
                                    color: '#ff4d4f',
                                }}
                            />
                        ),
                    });
                    return notification;
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_address)) {
                    notification["error"]({
                        message: "Error al enviar mensaje.",
                        description: 'Invalid email address.',
                        icon: (
                            <FrownOutlined
                                style={{
                                    color: '#ff4d4f',
                                }}
                            />
                        )
                    });
                    return notification;
                }

                emailjs.sendForm('service_8ymqx0u', 'template_39k4hw9', form.current, 'o3Bmr2-wuZVFbmXok')
                    .then((result) => {
                        message.success({
                            content: `${result.text}, mensaje enviado correctamente.`,
                            duration: 2,
                        });

                    }, (error) => {
                        message.error({
                            content: `${error.text}, error al enviar el mensaje.`,
                            duration: 2,
                        });
                    });
            }}

        >
            {({
                values,
                errors,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit} ref={form} >
                    <Form.Item
                        label='Nombre'
                        name='nombre'
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input onChange={handleChange} value={values.to_name} type="text" name="to_name" />
                    </Form.Item>
                    {errors.to_name}
                    <Form.Item
                        label='Asunto'
                        name='asunto'
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input onChange={handleChange} value={values.subject_message} type="text" name="subject_message" />
                    </Form.Item>
                    {errors.subject_message}
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Input onChange={handleChange} value={values.email_address} type="email" name="email_address" />
                    </Form.Item>
                    {errors.email_address}
                    <Form.Item
                        label='Mensaje'
                        name="message_text"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea onChange={handleChange} value={values.message_text} rows={4} name="message_text" />
                    </Form.Item>
                    {errors.message_text}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Enviar
                        </Button>
                    </Form.Item>
                </form>
            )}
        </Formik>

    )
};

export default Formulario;