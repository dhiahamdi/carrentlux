const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: '+01:00', // for writing to database
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.User = require("./User.model.js")(sequelize, Sequelize);
db.Car = require("./Car.model.js")(sequelize, Sequelize);


//Associations


module.exports = db;