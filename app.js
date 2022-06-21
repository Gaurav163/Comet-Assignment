require("dotenv").config();
const express = require("express");
const app = express();

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