const TimeModel = require("./TimeModel")
const TripModel = require("./TripModel")
const RouteModel = require("./RouteModel")
const StopModel = require("./StopModel")
const RegionModel = require("./RegionModel")

TripModel.hasMany(TimeModel, {
    foreignKey: "trip_id"
})

TripModel.belongsTo(RouteModel, {
    foreignKey: "route_id"
})

TimeModel.belongsTo(TripModel, {
    foreignKey: {
        name: 'trip_id'
    },
})

TimeModel.belongsTo(StopModel, {
    foreignKey: {
        name: 'stop_id'
    },
})

StopModel.hasMany(TimeModel, {
    foreignKey: "stop_id"
})

StopModel.belongsTo(RegionModel, {
    foreignKey: "stop_area"
})

