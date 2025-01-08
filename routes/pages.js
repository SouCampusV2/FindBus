const Router = require("express").Router()
const path = require("path")
//Return vue index.html page
Router.get("/", (req,res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "..", "front-end", "dist", 'index.html'))
})

module.exports = Router