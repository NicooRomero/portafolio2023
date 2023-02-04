import React from 'react';
import { Carousel, Image } from 'antd';
import './Badges.scss';


const data = [
    {
        id: 1,
        title: 'Introduction to Cybersecurity',
        image: 'https://images.credly.com/size/110x110/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
        href: 'https://www.credly.com/badges/d757b8e7-8904-49f0-822f-fae06405d394'
    },
    {
        id: 2,
        title: 'Cybersecurity Essentials',
        image: 'https://images.credly.com/size/110x110/images/054913b2-e271-49a2-a1a4-9bf1c1f9a404/CyberEssentials.png',
        href: 'https://www.credly.com/badges/cd104e1d-8492-4bb0-8885-9293eb8e9420'
    },
    {
        id: 3,
        title: 'Networking Essentials',
        image: 'https://images.credly.com/size/110x110/images/d7f73336-9adb-4833-a602-761837a33ba3/NetworkingEssentials-01.png',
        href: 'https://www.credly.com/badges/7f5b29c5-dbf4-451f-8668-43d442d83a99'
    },
    {
        id: 4,
        title: 'Endpoint Security',
        image: 'https://images.credly.com/size/110x110/images/0ca5f542-fb5e-4a22-9b7a-c1a1ce4c3db7/EndpointSecurity.png',
        href: 'https://www.credly.com/badges/163d0d26-492f-4150-9ec0-9391cf96a63a'
    },
    {
        id: 5,
        title: 'Networking Devices and Initial Configuration',
        image: 'https://images.credly.com/size/110x110/images/88316fe8-5651-4e61-a6be-5be1558f049e/image.png',
        href: 'https://www.credly.com/badges/4fbf989a-4653-4196-81ad-0854ffef9d33'
    },
    {
        id:6,
        title: 'Network Defense',
        image: 'https://images.credly.com/size/110x110/images/51526f76-711b-4caf-b04d-27f89512b112/NetworkDefense_v1_091721.png',
        href: 'https://www.credly.com/badges/a4f444d3-9bb7-4a5e-9f29-8f4fb2691032'
    },
];


const Badges = () => {

    return (
        <Carousel autoplay slidesToShow={5} dots={false} key='carousel'>
            {data.map((item, index) => {
                return (
                    <a href={item.href} target='_blank' rel="noreferrer" key={index}>
                    <Image
                        className='ant-img-carousel'
                        preview={false}
                        width={110}
                        key={index}
                        src={item.image}
                        alt={item.title}
                        />
                    </a>
                );
            })}
        </Carousel>
    )

};
export default Badges;