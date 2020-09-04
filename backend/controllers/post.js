//imports
let models = require("../models");
let utils = require("../utils/jwtokenUtils");
const fs = require('fs');


//création d'un message
exports.create = (req, res) => {
    //déclaration de l'url de l'image
    let messageImage
    //identifier qui créé le message
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'position', 'department'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //récupération du corps du post
                let messageTitle = req.body.messageTitle;
                let messageContent = req.body.messageContent;
                if (req.file != undefined) {
                    messageImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                else {
                    messageImage == null
                };
                if ((messageTitle == 'null' && messageContent == 'null' && messageImage == null)) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    models.Post.create({
                        messageTitle: messageTitle,
                        messageContent: messageContent,
                        messageImage: messageImage,
                        UserId: user.id
                    })
                        .then((newPost) => {
                            res.status(201).json(newPost)
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

//afficher les posts sur le mur
exports.listMsg = (req, res) => {
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['firstname', 'lastname', 'position', 'department']
        }],
        order: [['datePosted', 'DESC']]
    })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de message à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

//suppression d'un post
exports.delete = (req, res) => {
    //req => userId, postId, user.isAdmin
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //vérification que le demandeur est soit l'admin soit le user qui a posté 
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Suppression du post id :', req.body.postId);
                models.Post
                    .findOne({
                        where: { id: req.body.postId }
                    })
                    .then((postFind) => {

                        if (postFind.messageImage) {
                            const filename = postFind.messageImage.split('/images/')[1];
                            console.log(filename);
                            fs.unlink(`images/${filename}`, () => {
                                models.Post
                                    .destroy({
                                        where: { id: postFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        }
                        else {
                            models.Post
                                .destroy({
                                    where: { id: postFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('suppression non autorisée par cet utilisateur') }
        })
        .catch(error => res.status(500).json(error));
};

//modification d'un post
exports.update = (req, res) => {
    //récupération de l'id du demandeur pour vérification
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'email', 'firsname', 'lastname', 'position', 'department','isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //vérification que le demandeur est soit l'admin soit le user qui a posté 
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('modification réussie :', req.body.postId);
                models.Post
                    .update(
                        {
                            messageTitle: req.body.newTitle,
                            messageContent: req.body.newContent,
                            messageImage: req.body.newImage
                        },
                        { where: { id: req.body.postId } }
                    )
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: 'suppression non autorisée par cet utilisateur' })
            }
        }
        )
        .catch(error => res.status(500).json(error));
}

  