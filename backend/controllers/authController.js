const jwt = require('../services/jwt');
const moment = require('moment');
const User = require('../models/user');

function checkExToken(token) {
    const { exp } = jwt.decodeToken(token);
    const currentDate = moment().unix();

    if(currentDate > exp) return true;

    return false;
}

exports.refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    const isTokenExpired = checkExToken(refreshToken);

    if(isTokenExpired) {
        return res.status(404).send({ message: 'El refreshToken ha expirado.' });
    } else {
        const { id } = jwt.decodeToken(refreshToken);

        User.findOne({_id: id}, (err, userStored) => {
            if(err) {
                return res.status(500).send({ message: 'Error en el servidor, por favor intente más tarde.' });
            } else {
                if(!userStored) {
                    return res.status(404).send({ message: 'Usuario no encontrado.' });
                } else {
                    return res.status(200).send({ accessToken: jwt.accessToken(userStored), refreshToken: refreshToken });
                }
            }
        });;
    }
}