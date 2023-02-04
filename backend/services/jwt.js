const jwt = require('jwt-simple');
const moment = require('moment');

exports.accessToken = function(user) {
    const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        createToken: moment().unix(),
        exp: moment().add(2, 'hours').unix()
    };

    return jwt.encode(payload, process.env.SECRET);
};

exports.refreshToken = function(user) {
    const payload = {
        id: user.id,
        exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, process.env.SECRET)
}

exports.decodeToken = function(token) {
    return jwt.decode(token, process.env.SECRET, true);
}