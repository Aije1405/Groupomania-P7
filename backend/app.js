const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");


const app = express();

app.use(bodyParser.json());
app.use (helmet()); // L'application utilise toutes les protections helmet

module.exports = app;
