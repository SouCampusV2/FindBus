const {DataTypes} = require("sequelize")
const sequelize = require("./../db.connection")

const Region = sequelize.define('zone_areas', {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
    timestamps: false
});

module.exports = Region