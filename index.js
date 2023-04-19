require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const personRoutes = require("./routes/personRoutes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

function main() {
  mongoose
    .connect(
      `mongodb+srv://${USER}:${PASSWORD}@apicluster.yotog9p.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      app.listen(3000);
      console.log("connected to mongodb");
    })
    .catch((err) => console.log(err));
}

main();
