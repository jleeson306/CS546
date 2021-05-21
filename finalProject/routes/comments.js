const express = require('express');
const commentData = require("../data/commentsCollection");
const { ObjectID } = require('bson');
const { route } = require('./profiles');
const router = express.Router();

router.post('/', async (req, res) => {
    if(req.session && req.session.username){
		try{
        let comment = await commentData.createComment(req.session.username, req.body.message, req.body.receivingUser,req.body.isTeam === "true");
        if(comment == null){
            res.status(400).send();
            return;
        }
        res.status(201).json(comment);

		}
		catch(e)
		{
			res.status(500).json(e.toString())
		}
        return;
    }
	else
	{
		res.status(403).json();
	}
});

router.get('/:id', async (req, res) => {
	try{
		let comment = await commentData.getComment(req.params.id);
		if(comment == null){
			return {};
		}
		res.json(comment);
	}
		catch(e)
		{
			res.status(404).render("watB/error",{error: e.toString()})
		}
});

module.exports = router;