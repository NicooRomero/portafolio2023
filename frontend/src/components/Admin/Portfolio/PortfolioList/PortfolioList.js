import React, { useState } from 'react';
import { Button, List, Modal as ModalAntd, notification } from 'antd';
import { FileAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DeleteProyectApi } from '../../../../api/portfolio';
import { getAccToken } from '../../../../api/auth';
import AddEditForm from '../AddPortfolio/AddEditForm';
import Modal from '../../../Modal';
import './PortfolioList.scss';

const { confirm } = ModalAntd;

const PortfolioList = (props) => {

    const { proyects, setReloadProyects } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null)

    const addProyectModal = () => {
        setIsVisible(true);
        setModalTitle("Subir nuevo proyecto");
        setModalContent(<AddEditForm setIsVisible={setIsVisible} setReloadProyects={setReloadProyects} />)
    }

    const editProyectModal = proyect => {
        setIsVisible(true);
        setModalTitle("Editando proyecto");
        setModalContent(<AddEditForm setIsVisible={setIsVisible} setReloadProyects={setReloadProyects} proyect={proyect} />)
    }

    const deleteProyect = proyect => {
        const accesToken = getAccToken();

        confirm({
            title: "Eliminar curso?",
            content: `¿Estas seguro de que quieres eliminar este curso?`,
            okText: "Eliminar",
            cancelText: "Cancelar",
            onOk() {
                DeleteProyectApi(accesToken, proyect.id)
                    .then(response => {
                        notification['success']({
                            message: response.data.message
                        });
                        setReloadProyects(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error en el servidor, intente de nuevos más tarde"
                        })
                    })
            }
        })
    }

    return ( 
        <div className="proyects-list">
            <div className="proyects-list__header">
                <Button type="primary" onClick={addProyectModal}><FileAddOutlined />Agregar Proyecto</Button>
            </div>
            <List 
                className="proyects-list__items"
                size='small'
                pagination={{
                    pageSize: 5
                }}
            >
                {proyects.map((proyect) => (
                    <List.Item
                    key={proyect.title}
                    actions={[
                        <Button 
                            type="primary"
                            onClick={() => editProyectModal(proyect)}
                        ><EditOutlined /></Button>,
                        <Button 
                            type="danger"
                            onClick={() => deleteProyect(proyect)}
                        ><DeleteOutlined /></Button>
                    ]}
                >
                    <img 
                            src={proyect.img}
                            alt={proyect.title}
                            style={{ width: "100px", marginRight: "20px"}}
                        />
                        <List.Item.Meta
                            title={<a href={proyect.url} target="_blank" rel="noreferrer">{proyect.title}</a>}
                            description={proyect.description}
                        />
                    </List.Item>    
                ))}
            </List>
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

export default PortfolioList;