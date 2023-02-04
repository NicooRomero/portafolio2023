import React from 'react';
import { Carousel, Image } from 'antd';


const data = [
    {
        title: 'Codo a Codo',
        image: 'https://i.ibb.co/cJjt9Zy/Diploma-codo-a-codo.jpg',
        href: 'https://i.ibb.co/cJjt9Zy/Diploma-codo-a-codo.jpg'
    },
    {
        title: 'https://udemy-certificate.s3.amazonaws.com/image/UC-0c6940d1-8798-4279-99da-eafa523c175b.jpg?v=1597516909000',
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-0c6940d1-8798-4279-99da-eafa523c175b.jpg?v=1597516909000',
        href: 'https://www.udemy.com/certificate/UC-0c6940d1-8798-4279-99da-eafa523c175b/'
    },
    {
        title: 'https://udemy-certificate.s3.amazonaws.com/image/UC-7ed7c134-c46b-41b1-a241-f739928967aa.jpg?v=1602937136000',
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-7ed7c134-c46b-41b1-a241-f739928967aa.jpg?v=1602937136000',
        href: 'https://www.udemy.com/certificate/UC-7ed7c134-c46b-41b1-a241-f739928967aa/'
    },
    {
        title: 'https://udemy-certificate.s3.amazonaws.com/image/UC-63149891-7587-4e28-a14a-6a83e84c0663.jpg?v=1618411221000',
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-63149891-7587-4e28-a14a-6a83e84c0663.jpg?v=1618411221000',
        href: 'https://www.udemy.com/certificate/UC-63149891-7587-4e28-a14a-6a83e84c0663/'
    },
    {
        title: 'Introduction to Cybersecurity',
        image: 'https://i.ibb.co/bgXy4pp/diploma-aws-fundamentos.jpg',
        href: 'https://i.ibb.co/bgXy4pp/diploma-aws-fundamentos.jpg'
    },
    {
        title: 'Cybersecurity Essentials',
        image: 'https://i.ibb.co/6vzdjZ5/diploma-guia-seguridad-informatica.jpg',
        href: 'https://i.ibb.co/6vzdjZ5/diploma-guia-seguridad-informatica.jpg'
    },
    {
        title: 'Networking Essentials',
        image: 'https://i.ibb.co/F6jsn8n/diploma-redes.jpg',
        href: 'https://i.ibb.co/F6jsn8n/diploma-redes.jpg'
    },
    {
        title: 'Endpoint Security',
        image: 'https://i.ibb.co/p0ygjC1/diploma-avanzado-redes.jpg',
        href: 'https://i.ibb.co/p0ygjC1/diploma-avanzado-redes.jpg'
    },
    {
        title: 'Networking Devices and Initial Configuration',
        image: 'https://i.ibb.co/3rDhxL8/diploma-aws-computo.jpg',
        href: 'https://i.ibb.co/3rDhxL8/diploma-aws-computo.jpg'
    },
    {
        title: 'Network Defense',
        image: 'https://i.ibb.co/CwD7FFG/diploma-nodejs-mongo-websockets.jpg',
        href: 'https://i.ibb.co/CwD7FFG/diploma-nodejs-mongo-websockets.jpg'
    },    

];

const Certificados = () => (
    // <List
    //     grid={{
    //         gutter: 16,
    //         xs: 1,
    //         sm: 2,
    //         md: 4,
    //         lg: 4,
    //         xl: 6,
    //         xxl: 3,
    //     }}
    //     dataSource={data}
    //     renderItem={(item) => (
    //         <List.Item>
    //         <Card
    //             hoverable={true} 
    //             title={<a href={item.href} target='_blank'>{item.title}</a>}
    //         >
    //             <div className="img">
    //                 <List.Item
    //                     className='ant-col-img'
    //                     key={item.title}
    //                     extra={
    //                         <img
    //                         width={'100%'}
    //                         alt={item.title}
    //                         src={item.image}
    //                         />
    //                     }
    //                 />
    //             </div>
    //         </Card>
    //         </List.Item>
    //     )}
    // />

    <Carousel autoplay slidesToShow={3}>
        {data.map((item) => {
            return (
                <Image
                    width={350}
                    key={item.title}
                    src={item.image}
                    alt={item.title}
                />
            );
        })}
    </Carousel>
);
export default Certificados;