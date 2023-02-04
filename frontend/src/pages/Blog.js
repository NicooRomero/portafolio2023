import React from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import ListBlog from '../components/Web/Blog/ListBlog';
import BlogInfo from '../components/Web/Blog/BlogInfo/BlogInfo';

const Blog = (props) => {
    const { location, history } = props;
    const { url } = useParams();

    return ( 
        <Row>
            <Col md={4} />
            <Col md={16}>{url ? <BlogInfo url={url} /> : <ListBlog location={location} history={history} />}</Col>
            <Col md={4} />
        </Row>
        );
}

// {url ? <BlogInfo url={url} /> : <ListBlog location={location} history={history} />}

export default Blog;