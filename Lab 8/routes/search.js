const express = require('express');
const router = express.Router();
const axios = require('axios');
//const reviewData = require('../data/reviews');
//const bookData = require('../data/books');

router.get('/', async function(req, res) {
	try {
		res.status(404).send({ error: "You shouldn't be here bro, like go search with the stuff I made. Kinda rude." });
	}catch(e){
		res.status(500).send({ error: "lol what, wtf did you do? or I guess wtf did I do? sorry just try again or something" });
	}
});
async function getShowsTerm(url){
  const { data } = await axios.get(url);
  return data;
}
router.post('/', async function(req, res) {
	let searchData = req.body;
	if(!searchData.searchTerm){
		let totRes = {
			searchTerm: searchData.searchTerm,
			shows: ["error"],
			rFound: false,
			uError: true
		};
		res.status(400).render('search/searchResult', totRes);
		return;
	}
	else if(searchData.searchTerm.trim() == "") {
		let totRes = {
			searchTerm: searchData.searchTerm,
			shows: ["error"],
			rFound: false,
			uError: true
		};
		res.status(400).render('search/searchResult', totRes);
		return;
	}
	else {
		try{
			url = 'http://api.tvmaze.com/search/shows?q=' + searchData.searchTerm;
			const showData = await getShowsTerm(url);
			let cutData = showData;
			let doesReal = true;
			if(showData.length > 20) {
				cutData = showData.slice(0, 20);
			}
			if(showData.length == 0) {
				doesReal = false;
			}
			let strData = cutData;
			for (let i = 0; i < cutData.length; i++) {
				strData[i] = JSON.stringify(cutData[i]);
			} 
			let totRes = {
				searchTerm: searchData.searchTerm,
				shows: strData,
				rFound: doesReal,
				uError: false
			};
			res.render('search/searchResult', totRes);
		}catch(e){
			res.status(500).send({ error: "Unknown error, please try again." });
		}
	}
});
/*
  app.post('/', function(req, res){
	let body = req.body;
	
	let res_body = {
		searchTerm: body.searchTerm
	};
	
	res.render('search/searchResult', res_body);
  });
*/

module.exports = router;