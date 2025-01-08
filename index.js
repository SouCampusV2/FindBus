//Entry point
const path = require("path")
require("dotenv").config()
require("./models/associations")

const cors = require("cors")
const bodyParser = require("body-parser")
const db = require('./db.connection')
const express = require("express");
const app = express();
const Pages__router = require('./routes/pages')
const Search_router = require('./routes/api/search')

app.use(cors({
    origin: "*"
}))
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use("/", express.static(path.join("front-end", "dist")))
app.use('/', Pages__router)
app.use('/api/search', Search_router)

try {
    db.authenticate();
    console.log('Connection to database has been established successfully.');
    app.listen(process.env.PORT, () => {
        console.log("Server is started")
    })
} catch (error) {
    console.log("Sorry, but we have trouble with db", error);
    process.exit();
}