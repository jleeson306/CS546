const express = require('express');
const app = express();
//const router = express.Router();
//const bodyParser = require('body-parser');
const configRoutes = require('./routes');

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
//app.use('/', router);
app.use(express.json());

configRoutes(app);

app.get('/', function(req, res) {
	res.send('This is the home page, available routes are ');
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

//404 if id doesn't exist