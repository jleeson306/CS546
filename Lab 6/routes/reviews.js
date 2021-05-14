const express = require('express');
const router = express.Router();
const reviewData = require('../data/reviews');
const bookData = require('../data/books');

router.get('/', async function(req, res) {
	try {
		res.send("there is no base, must provide some id");
	}catch(e){
		res.status(500).send();
	}
});
router.get('/:id', async function(req, res) {
	try {
		let id = req.params.id;
		let p = await bookData.getReviews(id);
		res.status(200).json(p);
	}catch(e){
		res.status(404).send(e);
	}
});
router.get('/review/:id', async function(req, res) {
	try {
		let id = req.params.id;
		let p = await reviewData.readReviewsID(id);
		res.status(200).json(p);
	}catch(e){
		res.status(404).send(e);
	}
});
router.post('/:id', async function(req, res) {
	const uRevData = req.body;
	let id = req.params.id;
	if(!uRevData.title){
		res.status(400).json({ error: "You must provide a title" });
		return;
	}
	if(!uRevData.reviewer){
		res.status(400).json({ error: "You must provide a reviewer" });
		return;
	}
	if(!uRevData.rating){
		res.status(400).json({ error: "You must provide a rating" });
		return;
	}
	if(!uRevData.dateOfReview){
		res.status(400).json({ error: "You must provide a dateOfReview" });
		return;
	}
	if(!uRevData.review){
		res.status(400).json({ error: "You must provide a review" });
		return;
	}
	try {
		let p = await reviewData.createReviews(id, uRevData.title, uRevData.reviewer, uRevData.rating, uRevData.dateOfReview, uRevData.review);
		res.status(200).json(p);
	}catch(e){
		console.log(e);
		res.status(404).send(e);
	}
});
router.delete('/:id', async function(req, res) {
	try {
		let id = req.params.id;
		let p = await reviewData.deleteReviews(id);
		res.status(200).json(p);
	}catch(e){
		res.status(404).send(e);
	}
});

module.exports = router;