//création de la connection à la base de donnée
const mysql = require("mysql");

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "Tamas2008",
    database: "groupomania"
  });
  connection.connect ((err) => {
    if (err) throw err;
    console.log ('Connecté!');
  });

  module.exports = connection;