//imports
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let models = require("../models/indexSeq");

module.exports ={
    isAdmin:function(user){
        return true
    }
}
