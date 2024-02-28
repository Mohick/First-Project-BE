// config cors server for frontend
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
module.exports = corsOptions;
