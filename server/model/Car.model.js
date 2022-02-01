module.exports = (sequelize, Sequelize) => {


    const Car = sequelize.define("car", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        make: {
            type: Sequelize.STRING,
            allowNull: false
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        plate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cost: {
            type: Sequelize.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.0
        },
        extra_km: {
            type: Sequelize.DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 0.0
        },
        status: {
            type: Sequelize.ENUM,
            values: ['available', 'unavailable'],
            allowNull: false ,
            defaultValue : 'available'
        },
        availableAt : {
            type: Sequelize.DATEONLY ,
            allowNull: false,
            defaultValue: new Date(),
        },
        img: {
            type: Sequelize.STRING,
            allowNull: true
        },


    });

    return Car;
};