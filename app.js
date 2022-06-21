

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = process.env.MongoUrl || "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

mongoose.connect(uri)
    .then(() => console.log('Connection to MongoDB successful'))
    .catch((err) => console.error(err, 'Error'));
mongoose.Promise = global.Promise;

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    res.send({ status: 200, mesaage: "Comet github server up" });
})

app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (e) => {
    console.log("Server Stated at http://localhost:" + PORT);
});