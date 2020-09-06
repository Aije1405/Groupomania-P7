const express = require("express"); //importation d'express
const router = express.Router(); //importation router express
const bouncer = require ("express-bouncer")(15000, 900000, 3); //Importation de express bouncer qui permet de contrer les attaques de force brute.
//Si mot de passe erronné au bout de 3 fois, il y a un délai compris entre 15s et 15mn avant de pouvoir se reconnecter.

const userCtrl = require("../controllers/user"); //importation logique métier - controller user

const auth = require("../middleware/authorization");

router.post("/signup", userCtrl.signup);
router.post("/login", bouncer.block, userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.put('/update',auth, userCtrl.changePwd);
router.delete('/delete', auth, userCtrl.deleteProfile);

module.exports = router;