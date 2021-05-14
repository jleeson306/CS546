const express = require('express');
const commentData = require("../data/commentsCollection");
const { ObjectID } = require('bson');
const { route } = require('./profiles');
const router = express.Router();

router.post('/', async (req, res) => {
    if(req.session && req.session.username){
        let comment = await commentData.createComment(req.session.username, req.body.message, req.body.receivingUser);
        if(comment == null){
            res.status(400).send();
            return;
        }
        res.status(201).json(comment);
        return;
    }
    res.status(403).send();
});

router.get('/:id', async (req, res) => {
    let comment = await commentData.getComment(req.params.id);
    if(comment == null){
        return {};
    }
    res.json(comment);
});

module.exports = router;