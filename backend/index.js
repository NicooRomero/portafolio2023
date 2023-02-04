const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

// create server
const app = express();
// db connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// access control config
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// routes /api/v1/
const api = process.env.API_URL;
app.use(`${api}/auth`, require('./routes/auth'));
app.use(`${api}/user`, require('./routes/user'));
app.use(`${api}/menu`, require('./routes/menu'));
app.use(`${api}/categoria`, require('./routes/categoria'));
app.use(`${api}/cursos`, require('./routes/curso'));
app.use(`${api}/portfolio`, require('./routes/portfolio'));
app.use(`${api}/posts`, require('./routes/posts'));

// app port
const port = process.env.PORT

app.listen(port, '0.0.0.0', () => {
    console.log(`### Server is run in port ${port} ###`);
})