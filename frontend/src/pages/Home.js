import React from 'react';
import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import MainBanner from '../components/Web/MainBanner';
import About from '../components/Web/About';
import Experience from '../components/Web/Experience';
import Portfolio from '../components/Web/Portfolio/Portfolio';
import Blog from '../components/Web/Blog/Blog';
import ContactBanner from '../components/Web/Contact/Banner/ContactBanner';

const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

const Home = () => {
    return (
        <>
            <MainBanner />
            <About />
            <Experience />
            <Portfolio />
            <Blog />
            <ContactBanner />
            <BackTop>
                <div style={style}><ArrowUpOutlined /></div>
            </BackTop>
        </>
    );
}

export default Home;