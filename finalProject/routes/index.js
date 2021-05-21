const path = require('path');
const profilesRoute = require('./profiles');
const commentsRoute = require('./comments');
const frontPageRoute = require('./frontPage')
const searchRoute = require('./search');
const healthlogRoute = require('./healthlog');
const workoutvideosRoute = require('./workoutvideos');
//const commandsRoute = require('./commands');		//old testing, leaving just in case
const caloriesRoute = require('./calories');
const session=require('express-session')
const bcrypt = require('bcrypt')

const constructorMethod = (app) => {
		app.use(session({
					  name: 'AuthCookie',
					  secret: 'some secret string!',
					  resave: false,
					  saveUninitialized: true
					}))
	
  app.get('/', function(req, res) {
	  if (req.session && req.session.username)
	  {
	      return res.redirect(`profiles/${req.session.username}`);	  
	  }
	  else
	  {
		res.render('watB/frontPage', { css: ['frontPage'] });
	  }
  });



  	//app.post("/signUp", (req,res)=>  )


  
  app.use('/profiles', profilesRoute);
  app.use('/comments', commentsRoute);
  app.use('/healthlog', healthlogRoute);
  app.use('/workoutvideos', workoutvideosRoute);
  app.use('/',frontPageRoute);
  app.use('/search', searchRoute);
  //app.use('/commands', commandsRoute);			//old testing, leaving just in case
  app.use('/calories', caloriesRoute);
  app.use('/*', (req, res) => {
    res.status(404).render("watB/error",{ error: "Webpage Not Found" });
  });
};

module.exports = constructorMethod;