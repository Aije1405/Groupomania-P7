const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
require('dotenv').config()



const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

//résolution erreur CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

//parse les corps de requête
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use (helmet()); // L'application utilise toutes les protections helmet

//middleware
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
