const express = require("express");
const app = express();
const morgan = require("morgan");
const contactRoute = require("./routes/contact.route");
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 8000;
const conn = process.env.CONN_STR;

mongoose
  .connect(conn, {
    UseNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB Connection Successful ! :)");
  });
app.use(express.json());
app.use(morgan("dev"));

app.use("/identify", contactRoute);

app.listen(port, () => {
  console.log("listening on  port 8000");
});
