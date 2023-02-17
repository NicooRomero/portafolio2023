import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://api-v1-portfolio.onrender.com'
})

export default clientAxios;