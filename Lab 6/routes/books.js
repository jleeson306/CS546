const express = require('express');
const router = express.Router();
const bookData = require('../data/books');

router.get('/', async function(req, res) {
	try {
		let p = await bookData.readBooks();
		res.status(200).json(p);
	}catch(e){
		res.status(500).send(e);
	}
});
router.get('/:id', async function(req, res) {
	try {
		let id = req.params.id;
		let p = await bookData.readBooksID(id);
		res.status(200).json(p);
	}catch(e){
		res.status(500).send(e);
	}
});
router.delete('/:id', async function(req, res) {
	try {
		let id = req.params.id;
		let p = await bookData.deleteBooks(id);
		res.status(200).json({"bookID": id, "deleted": true});
	}catch(e){
		res.status(404).send(e);
	}
});
router.post('/', async function(req, res) {
	const ubookData = req.body;
	if(!ubookData.title){
		res.status(400).json({ error: "You must provide a title" });
		return;
	}
	if(!ubookData.author){
		res.status(400).json({ error: "You must provide a author" });
		return;
	}
	if(!ubookData.genre){
		res.status(400).json({ error: "You must provide a genre" });
		return;
	}
	if(!ubookData.datePublished){
		res.status(400).json({ error: "You must provide a datePublished" });
		return;
	}
	if(!ubookData.summary){
		res.status(400).json({ error: "You must provide a summary" });
		return;
	}
	try {
		let p = await bookData.createBooks(ubookData.title, ubookData.author, ubookData.genre, ubookData.datePublished, ubookData.summary);
		res.status(200).json(p);
	}catch(e){
		res.status(404).send(e);
	}
});
router.put('/:id', async function(req, res) {
	const ubookData = req.body;
	let id = req.params.id;
	if(!ubookData.title){
		res.status(400).json({ error: "You must provide a title" });
		return;
	}
	if(!ubookData.author){
		res.status(400).json({ error: "You must provide a author" });
		return;
	}
	if(!ubookData.genre){
		res.status(400).json({ error: "You must provide a genre" });
		return;
	}
	if(!ubookData.datePublished){
		res.status(400).json({ error: "You must provide a datePublished" });
		return;
	}
	if(!ubookData.summary){
		res.status(400).json({ error: "You must provide a summary" });
		return;
	}
	try {
		let p = await bookData.updateBooks(id, ubookData.title, ubookData.author, ubookData.genre, ubookData.datePublished, ubookData.summary);
		res.status(200).json(p);
	}catch(e){
		console.log(e);
		res.status(404).send(e);
	}
});

router.patch('/:id', async function(req, res) {
	const ubookData = req.body;
	let id = req.params.id;
	let t = 1;
	let a = 1;
	let g = 1;
	let d = 1;
	let s = 1;
	if(!ubookData.title){
		t = 0;
	}
	if(!ubookData.author){
		a = 0;
	}
	if(!ubookData.genre){
		g = 0;
	}
	if(!ubookData.datePublished){
		d = 0;
	}
	if(!ubookData.summary){
		s = 0;
	}
	if(t+a+g+d+s < 1) {
		res.status(400).json({ error: "You must provide at least one field to change" });
		return;
	}
	try {
		if(t == 1) {await bookData.changeT(id, ubookData.title)}
		if(a == 1) {await bookData.changeA(id, ubookData.author)}
		if(g == 1) {await bookData.changeG(id, ubookData.genre)}
		if(d == 1) {await bookData.changeD(id, ubookData.datePublished)}
		if(s == 1) {await bookData.changeS(id, ubookData.summary)}
		let p = await bookData.readBooksID(id);
		res.status(200).json(p);
	}catch(e){
		console.log(e);
		res.status(404).send(e);
	}
});
/*
{
	"title": "The Shining",
	"author": {
		"authorFirstName": "Stephen",
		"authorLastName": "King"
	},
	"genre": ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
	"datePublished": "01/28/1977",
	"summary": "suuuuuu"
}
*/

module.exports = router;