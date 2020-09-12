const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");
const multer = require("../middleware/multer-configuration");

const postCtrl = require("../controllers/message");//importation logique métier

//routes des messages postés
router.put("/", auth, multer, postCtrl.update)
router.post("/create", auth, multer, postCtrl.create);
router.post("/delete", postCtrl.delete)
router.get("/", auth, postCtrl.listMsg);
router.get("/:id", auth, postCtrl.getMessage);

module.exports = router; 
