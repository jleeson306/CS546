const express = require('express');
const app = express();
const router = express.Router();
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
const bcrypt = require('bcryptjs');
const users = require('./users');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const session = require('express-session');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

let checker = function(req) {
	if(req.body['username'] === undefined) {
		return -1;
	}
	if(req.body['password'] === undefined) {
		return -1;
	}
	let orNaw = -1;
	for(let i = 0; i < users.length; i++) {
		if(req.body['username'] == users[i].username && bcrypt.compareSync(req.body['password'], users[i].hashedPassword)) {
			orNaw = i;
		}
	}
	return orNaw;
}
app.get('/', function(req, res) {
	let datt = new Date().toUTCString();
	let logger = "Date: " + datt + " Method: " + req.method + " From: " + req.originalUrl;
	if(req.session.user) {
		logger = logger + " Authenticated: true";
	}
	else {
		logger = logger + " Authenticated: false";
	}
	console.log(logger);
	if(req.session.user) {
		res.redirect('/private');
	}
	else {
		res.render('core/home');
	}
});
app.use('/logout', (req, res, next) => {
	let datt = new Date().toUTCString();
	let logger = "Date: " + datt + " Method: " + req.method + " From: " + req.originalUrl;
	if(req.session.user) {
		logger = logger + " Authenticated: true";
	}
	else {
		logger = logger + " Authenticated: false";
	}
	console.log(logger);
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});
app.get('/logout', function(req, res) {
	req.session.destroy();
	res.send("You have been loged out.");
});
app.use('/private', (req, res, next) => {
	let datt = new Date().toUTCString();
	let logger = "Date: " + datt + " Method: " + req.method + " From: " + req.originalUrl;
	if(req.session.user) {
		logger = logger + " Authenticated: true";
	}
	else {
		logger = logger + " Authenticated: false";
	}
	console.log(logger);
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});
app.get('/private', function(req, res) {
	res.render('core/private', users[req.session.myID]);
});
app.post('/login', function(req, res) {
	let datt = new Date().toUTCString();
	let logger = "Date: " + datt + " Method: " + req.method + " From: " + req.originalUrl;
	if(req.session.user) {
		logger = logger + " Authenticated: true";
	}
	else {
		logger = logger + " Authenticated: false";
	}
	console.log(logger);
	if (req.session.user) {
		res.redirect('/private');
	}
	else {
    let isGood = checker(req);
	if(isGood >= 0) {
		req.session.user = true;
		req.session.myID = isGood;
		res.redirect('/private');
	}
	else {
		res.status(401).json({error: "Incorrect username or passord"});
	}
  }
});

app.get('*', function(req, res) {
	let datt = new Date().toUTCString();
	let logger = "Date: " + datt + " Method: " + req.method + " From: " + req.originalUrl;
	if(req.session.user) {
		logger = logger + " Authenticated: true";
	}
	else {
		logger = logger + " Authenticated: false";
	}
	console.log(logger);
	res.status(404).json({error: "Route Not Found"});
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});