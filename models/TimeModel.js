/*
* All filed is null, bcs i used parser and not all field was filled
* */
const {DataTypes} = require("sequelize")
const sequelize = require("./../db.connection")
const Time = sequelize.define('times', {
    // Model attributes are defined here
    trip_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stop_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    arrival_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    departure_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    // Other model options go here
    timestamps: false
});

module.exports = Time