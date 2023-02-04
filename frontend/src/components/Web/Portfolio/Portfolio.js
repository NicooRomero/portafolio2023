import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Avatar, Card, Spin, Statistic } from 'antd';
import { LoadingOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { GetPortfolio } from '../../../api//portfolio';
import GitHub from '../../../assets/img/github.png';
import './Portfolio.scss';

const { Meta } = Card;

const Portfolio = () => {

    const [data, setData] = useState();
    const [projects, setProjects] = useState();

    useEffect(() => {

        GetPortfolio(4)
            .then(res => {
                setProjects(res.data.projectsList)
            })
            .catch(err => {
                console.log(err)
            })

        const fetchGit = async () => {
            const res = await fetch('https://api.github.com/users/NicooRomero');
            const profile = await res.json();
            setData(profile)
        }

        fetchGit();

    }, []);

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    if (projects && data) {
        return (
            <div className='portfolio-main'>
                <div className="portfolio-main__head">
                    <h1>Portfolio</h1>
                </div>
                <div className="portfolio-main__content">
                    <div className="portfolio-main__content-git">
                        <p>GitHub Profile</p>
                        <Card
                            hoverable
                            style={{
                                width: 300,
                            }}
                            actions={[
                                <Statistic title="Followers" value={data.followers} />,
                                <Statistic title="Following" value={data.following} />,
                                <Statistic title="Repositories" value={data.public_repos} />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={GitHub} />}
                                title={`@${data.login}`}
                                description={data.bio}
                            />
                        </Card>
                        <h2>Desarrolo web implementando las tecnologías más usadas</h2>
                        <h3>Todas las capacitaciones tomadas me permiten hoy llevar a la práctica y desarrollar distintos sitios y aplicaciones web, que van desde una simple Landing page con <b>HTML & CSS</b>, agregando alguna funcionalidad a la misma utiliazando <b>Javascript</b>, hasta lograr dar vida a aplicaciones un tanto más complejas integrando distintas tecnologías, como <b>Mongo Express Node & React</b>.</h3>
                        <PrevPortfolio projects={projects} />
                        <div className="portfolio-main__content-git__btn">
                            <Link to='/portfolio'><Button type="primary" size='large'>Ver más <ArrowRightOutlined /></Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Spin indicator={antIcon} />
        )
    }
}

function PrevPortfolio(props) {

    const { projects } = props;

    return (
        <div className='prev-portfolio'>
            {projects.map((item, index) => ( 
                    <Image
                        className='prev-portfolio_img'
                        preview={false}
                        width={110}
                        key={index}
                        src={item.img}
                        alt={item.title}
                    />
            ))}
        </div>
    )
}

export default Portfolio;