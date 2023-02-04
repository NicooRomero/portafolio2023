import React, { useState, useEffect } from 'react';
import { GetPortfolio } from '../../../api/portfolio';
import PortfolioList from '../../../components/Admin/Portfolio/PortfolioList/PortfolioList';

const Portfolio = () => {
    const [ proyects, setProyect ] = useState([]);
    const [ reloadProyects, setReloadProyects ] = useState(false);

    useEffect(() => {
        GetPortfolio()
            .then(response => {
                setProyect(response.data.projectsList)
            })
            setReloadProyects(false)
    }, [reloadProyects]);


    return ( 
        <div className="portfolio">
            <PortfolioList proyects={proyects} setReloadProyects={setReloadProyects} />
        </div>
    );
}

export default Portfolio;