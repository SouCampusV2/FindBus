/*
* All filed is null, bcs i used parser and not all field was filled
* */
const {DataTypes} = require("sequelize")
const sequelize = require("./../db.connection")

const Route = sequelize.define('routes', {
    // Model attributes are defined here
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    bus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    route_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    // Other model options go here
    timestamps: false
});

module.exports = Route