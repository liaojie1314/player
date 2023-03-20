const express = require("express");
//解决跨域问题
const cors = require("cors");
const bodyParser = require('body-parser');
const apiRouter = require('./module/api');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});