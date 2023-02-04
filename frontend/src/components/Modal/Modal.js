import React from 'react';
import { Modal as ModalAntd } from 'antd';

const Modal = (props) => {
    const { children, title, isVisible, setIsVisible, ...other } = props;

    return(
        <ModalAntd
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={false}
            {...other}
        >
            {children}
        </ModalAntd>
    )
}

export default Modal;