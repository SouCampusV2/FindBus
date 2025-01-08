/*
* All filed is null, bcs i used parser and not all field was filled
* */
const {DataTypes} = require("sequelize")
const sequelize = require("./../db.connection")

const Trip = sequelize.define('trips', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    route_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trip_headsign: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trip_long_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    // Other model options go here
    timestamps: false
});

module.exports = Trip