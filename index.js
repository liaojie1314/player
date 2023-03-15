const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    code: 200,
    msg: "hello",
  });
});
app.get("/test", (req, res) => {
  res.json({
    code: 200,
    msg: "test",
  });
});

app.get("/lhy", (req, res) => {
  res.json({
    code: 200,
    msg: "lhy shi dashabi",
    data: {
      name: "lhy",
      age: 21,
      gender: "女"
    }
  });
});
