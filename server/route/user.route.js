module.exports = app => {
    const data_rep = require("../controller/User.controller.js");
    const verify = require("../middleware/UserAccess.js");
    var router = require("express").Router();

    //login
    router.post("/login",data_rep.login);
    //check user token
    router.post("/checkuser", verify.verifyAll ,data_rep.checkUser);

    app.use('/api/auth',router);
};