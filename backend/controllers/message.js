//imports
let models = require('../models');
let utils = require('../utils/jwtokenUtils');
const fs = require('fs');


//création d'un message
exports.create = (req, res) => {
    //déclaration de l'url de l'image
    let attachmentURL
    //identifier qui créé le message
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //récupération du corps du message
                let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                else {
                    attachmentURL == null
                };
                if ((content == 'null' && attachmentURL == null)) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    let date = new Date()
                    models.Message.create({
                        content: content,
                        attachement: attachmentURL,
                        UserId: user.id,
                        createdAt: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
                    })
                        .then((newMessage) => {
                            res.status(201).json(newMessage)
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
}

//afficher les message sur le mur
exports.listMsg = (req, res) => {
    models.Message.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(messages => {
            if (messages.length > null) {
                res.status(200).json(messages)
            } else {
                res.status(404).json({ error: 'Pas de messages à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

//suppression d'un message
exports.delete = (req, res) => {
    //req => userId, postId, user.isAdmin
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //vérification que le demandeur est soit l'admin soit celui qui a posté le message
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Suppression id du message :', req.body.messageId);
                models.Message
                    .findOne({
                        where: { id: req.body.messageId }
                    })
                    .then((messageFind) => {

                        if (messageFind.attachement) {
                            const filename = messageFind.attachement.split('/images/')[1];
                            console.log(filename);
                            fs.unlink(`images/${filename}`, () => {
                                models.Message
                                    .destroy({
                                        where: { id: messageFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        }
                        else {
                            models.Message
                                .destroy({
                                    where: { id: messageFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('suppression du message par utilisateur non autorisé') }
        })
        .catch(error => res.status(500).json(error));
};

//modification d'un message
exports.update = (req, res) => {
    //récupération de l'id du demandeur pour vérification
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //vérification que le demandeur est soit l'admin soit celui qui a posté le message
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Modif ok pour le message :', req.body.messageId);
                models.Message
                    .update(
                        {
                            content: req.body.newText,
                            attachement: req.body.newImg
                        },
                        { where: { id: req.body.messageId } }
                    )
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: 'modification du message par utilisateur non autorisé' })
            }
        }
        )
        .catch(error => res.status(500).json(error));
}

  