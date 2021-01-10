const jwt = require('jsonwebtoken');
const config = require('../config/default.json')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Non auth"});
        }

        const decodedToken = jwt.verify(token, config.jwtSecret);
        req.user = decodedToken;
        next()
    } catch (e) {
        res.status(401).json({message: "Non auth"});
    }
}