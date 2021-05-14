const express = require('express');
const router = express.Router();
const axios = require('axios');
//const bookData = require('../data/books');

router.get('/', async function(req, res) {
	try {
		res.send("shows baby baby");
	}catch(e){
		res.status(500).send();
	}
});
async function getShowsId(id){
  const { data } = await axios.get(url);
  return data;
}
router.get('/:id', async function(req, res) {
	try{
		url = 'http://api.tvmaze.com/shows/' + req.params.id;
		const showdata = await getShowsId(url);
		showdata.summary = showdata.summary.replace( /(<([^>]+)>)/ig, ''); //found this regex on geeksforgeeks, https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
		showdata.uError = false;
		res.render('search/idResult', showdata);
	}catch(e){
		let erData = {
			uError: true,
			id: req.params.id
		}
		res.status(404).render('search/idResult', erData);
	}
});

module.exports = router;