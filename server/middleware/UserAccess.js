const jwt = require('jsonwebtoken');
const jwt_config = require("../config/keys.config");

exports.verifyAll = (req, res, next) => {
    const token = req.header('carrent-tkn');

    if (!token)
        return res.status(401).send({message:"Access-Denied"});

    try {
        const verified = jwt.verify(token, jwt_config.secret);
        req.user = verified;
        next();

    } catch (error) {
        res.status(401).send({message:"invalid-token"});
    }
};






