const express = require('express');
const app = express();
const axios = require('axios');
const router = express.Router();
//const configRoutes = require('./routes');
//configRoutes(app);
//for some reason the routes were being odd, it kept saying it couldn't find them even though I had the directories correct
//so I just did it all in app.js, which a TA said was fine to do so on slack

async function getShows(){
  const { data } = await axios.get('http://api.tvmaze.com/shows');
  return data;
}
async function getShowsId(id){
  const { data } = await axios.get(url);
  return data;
}

app.get('/shows', async function(req, res) {
	try{
		const showdata = await getShows();
		res.json(showdata);
	}catch(e){
		res.status(500).send(e);
	}
});

app.get('/shows/:id', async function(req, res) {
	try{
		url = 'http://api.tvmaze.com/shows/' + req.params.id;
		const showdata = await getShowsId(url);
		res.json(showdata);
	}catch(e){
		res.status(404).send({ error: "Show unable to be found, make sure the given id is a positive number." });
	}
});

let bio =   "My name is James Leeson, I am currently a junior CS major at Stevens Institute of Technology. \n " +
			"I was uncertain exactly what you meant by two paragraphs seperated by an endline character, did you mean two sentences? \n " +
			"I hope so, as I probably won't actually write two whole paragraphs, as I am still having trouble with this id thing. \n " +
			"Oh shoot, right biography, I like long walks on the beach, and other nondescript and generic things.";

let aboutMeRet = 
{
	"name": "James Leeson",
	"cwid": "10433450",
	"biography": bio,
	"favoriteShows": ["Sherlock", "Poirot", "Avatar the Last Airbender", "Spice & Wolf"]
}

app.get('/aboutme', function(req, res) {
	try{
		res.json(aboutMeRet);
	}catch(e){
		res.status(500).send(e);
	}
});

app.get('/', function(req, res) {
	res.send('This is the home page, available routes are /aboutme, /shows, and /shows/:id');
});

app.get('*', function(req, res) {
	res.json({ error: 'This route does not exist, routes that do exist are /shows, /shows/:id, and /aboutme' });
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

//404 if id doesn't exist