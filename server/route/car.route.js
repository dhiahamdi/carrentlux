module.exports = app => {
    const data_rep = require("../controller/Car.controller");
    const fs_rep = require("../controller/File.controller");
    const verify = require("../middleware/UserAccess.js");
    var router = require("express").Router();

    router.post("/list",verify.verifyAll ,data_rep.list);
    router.get("/download/:name", fs_rep.download);

    app.use('/api/car',router);
};