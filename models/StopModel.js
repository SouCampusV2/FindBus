/*
* All filed is null, bcs i used parser and not all field was filled
* */
const {DataTypes} = require("sequelize")
const sequelize = require("./../db.connection")

const Stop = sequelize.define('stops', {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    stop_code: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    stop_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stop_lat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stop_lon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zone_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stop_area: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    stop_desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lest_x: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lest_y: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zone_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authority: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    // Other model options go here
    timestamps: false
});

module.exports = Stop