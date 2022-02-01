const db = require("../model");
const db_car = db.Car;
const data_set = require("../constant/car_dataset");
const car_enum = require("../constant/car_status.enum");
const op = db.Sequelize.Op;

exports.load_dataset = () => {
    db_car.bulkCreate(data_set.data).then((data) => {
        return data;
    })
}

exports.list = (req, res) => {
    let where_filter = {}
    console.log(req.body.date_rent)
    if (req.body.make)
        where_filter = { ...where_filter, make: req.body.make }
    if (req.body.model)
        where_filter = { ...where_filter, model: req.body.model }
    if (req.body.date_rent)
        where_filter = { ...where_filter, availableAt:{ [op.lte] : new Date(req.body.date_rent)}  }

    db_car.findAll({
        where: where_filter
    }).then((data) => {
        res.send(data)
    })
        .catch(e => {
            res.status(500).send({
                message: err.message || "Some error occurred while trying to load dataset !"
            });
        })
}
