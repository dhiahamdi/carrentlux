const db = require("../model");
const db_user = db.User;
const jwt = require('jsonwebtoken');
const jwt_config = require("../config/keys.config");
const data_set = require("../constant/user_dataset");



exports.load_dataset = () => {
    db_user.create(data_set.data).then((data) => {
        return data;
    })
}

exports.login = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    db_user.findOne({ where: { email: email } }).then(user => {

        if (!user) {
            res.status(401).json({
                message: 'email or password is incorrect',
            });
        } else {
            user.comparePasswords(password, (error, isMatch) => {

                if (isMatch && !error) {
                    const token = jwt.sign(
                        {
                            id: user.id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                        },
                        jwt_config.secret, {},
                    );


                    res.header('carrent-tkn', token).send({
                        success: true,
                        token: `${token}`,
                        user: {
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                        },
                    });
                } else {

                    res.status(401).json({
                        message: 'email or password is incorrect',
                    });
                }
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while try to login"
        });
    });
};

exports.checkUser = (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(401).json({
            message: 'utilisateur introuvable',
        });

    } else {
        res.send(user);
    }

};