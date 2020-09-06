const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");
const multer = require("../middleware/multer-configuration");

const postCtrl = require("../controllers/post");//importation logique métier

//routes des messages postés
router.put("/update", auth, multer, postCtrl.update)
router.post("/create", auth, multer, postCtrl.create);
router.delete("/delete", postCtrl.delete)
router.get("/", auth, postCtrl.listMsg);

module.exports = router; 
