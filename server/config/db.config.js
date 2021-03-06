module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "carrent",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+01:00', // for writing to database
  };