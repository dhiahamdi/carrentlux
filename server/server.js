const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./model");

db.sequelize.sync({ force: true }).then(() => {
    const car_rep = require('./controller/Car.controller')
    const user_rep = require('./controller/User.controller')

    user_rep.load_dataset()
    car_rep.load_dataset()
})

require("./route/user.route")(app);
require("./route/car.route")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running ..."));