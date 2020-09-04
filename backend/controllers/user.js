//import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const utils = require("../utils/jwtokenUtils");
const verifyInput = require("../utils/verifyInput");

//création d'un user
exports.signup = (req, res) => {
    // validation paramètres de la requète
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let position = req.body.position;
    let department = req.body.department;

    if (email == null || password == null || firstname == null || lastname == null || position == null || department == null) {
        res.status(400).json({ error: 'il manque un paramètre' })
    }

    // vérification inputs user
    let emailOk = verifyInput.validEmail(email);
    console.log(emailOk)
    let mdpOk = verifyInput.validPassword(password);
    console.log(mdpOk)
    let firstnameOk = verifyInput.validFirstname(firstname);
    console.log(firstnameOk)
    let lastnameOk = verifyInput.validLastname(lastname);
    console.log(lastnameOk)
    let positionOk = verifyInput.validPosition(position);
    console.log(positionOk)
    let departmentOk = verifyInput.validDepartment(department);
    console.log(departmentOk)

    if (emailOk == true && mdpOk == true && firstnameOk == true && lastnameOk == true && positionOk == true && departmentOk == true) {
        //vérification si user existe déjà
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, bcryptPassword) {
                        // création de l'user
                        const newUser = models.User.create({
                            email: email,
                            password: bcryptPassword,
                            firstname: firstname,
                            lastname: lastname,
                            position: position,
                            department: department,
                            isAdmin: false
                        })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(err => {
                                res.status(500).json({ err })
                            })
                    })
                }
                else {
                    res.status(409).json({ error: "utilisateur déjà créé" })
                }
            })
            .catch(err => { res.status(500).json({ err }) })
    } else {
        console.log("erreur survenue")
    }
};

//Login user
exports.login = (req, res) => {
    //récupération et validation des paramètres
    let email = req.body.email;
    let password = req.body.password;
    if (email == null || password == null) {
        res.status(400).json({ error: 'Il manque un paramètre' })
    }
    //Vérification si user existe
    models.User.findOne({
        where: { email: email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: user.id,
                            token: utils.generateToken(user),
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: "mot de passe invalide" });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })
};

//Profil d'un user
exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'isAdmin'],
        where: { id: id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

//modification d'un profil
exports.changePwd = (req, res) => {
    
    //récupère l'id de l'user et le nouveau password
    let userId = utils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    console.log(newPassword)
    //Vérification regex du nouveau mot de passe
    console.log('admin', verifInput.validPassword(newPassword))
    if (verifInput.validPassword(newPassword)) {
        //Vérifie qu'il est différent de l'ancien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                console.log('user trouvé', user)
                bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                    //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                    if (resComparePassword) {
                        res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                    } else {
                        bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                            models.User.update(
                                { password: bcryptNewPassword },
                                { where: { id: user.id } }
                            )
                                .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
                                .catch(err => res.status(500).json(err))
                        })
                    }
                })
            })
            .catch(err => json(err))
    } else {
        res.status(406).json({ error: 'mot de passe non valide' })
    }
}

//suppression d'un compte
exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    if (userId != null) {
        //vérification si user existe bien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                    //Delete de tous les posts de l'user même s'il y en a pas
                    models.Post
                        .destroy({
                            where: { userId: user.id }
                        })
                        .then(() => {
                            console.log('Tous les posts de cet user ont été supprimés');
                            //suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                }
                else {
                    res.status(401).json({ error: 'Cet user n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
    }
}