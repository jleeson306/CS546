
const session=require('express-session')
const express = require("express")
const bcrypt = require('bcrypt')
const userCollection = require('../data/usersCollection')

 
 const app = express.Router();
 
  async function validateUsername(username) //returns true if userCollection.getUser returns without issue, false otherwise
  {
	  try
	  {
		  await userCollection.getUser(username)
		  return true;
	  }
	  catch(e)
	  {
		  return false;
	  }
  }

	const validatePassword = async function(username, password)
	{
		if (typeof username !== 'string') throw "Username is not defined!"
		if (typeof password !== 'string') throw "Password is not defined!"
		if (await validateUsername(username))
		{
			let user = await userCollection.getUser(username)
			return bcrypt.compareSync(password,user.userPasswordHashed)
		}
	}

  app.post("/login",async (req,res) => {
	  if (await validateUsername(req.body.username) && await validatePassword(req.body.username,req.body.password))
	  {

		 // console.log(req.body.username)
		req.session.username = req.body.username;
		req.session.name = 'AuthCookie'
		return res.redirect('/profiles/' + req.session.username)
	  }
	  else
	  {
		 res.render("watB/frontPage",{ css: ['frontPage'] ,error: "Invalid login info"})
	  }
  });
	app.post("/signUp",async (req,res)=> {
		if (!(await validateUsername(req.body.username))) //make sure user doesn't exist
		{
			try { //attempt to add user
				await userCollection.createUser(req.body.firstName,req.body.lastName, req.body.username, req.body.birthday, req.body.email, req.body.gender, req.body.password);
			}
			catch (e)
			{
				res.render("watB/frontPage",{ css: ['frontPage'] ,error: "Invalid signin info: "+e.toString()})
				return;
			}
				req.session.username = req.body.username;
				return res.redirect("/profiles/" +req.body.username)
		}
		else
		{
			res.render("watB/frontPage",{ css: ['frontPage'] ,error: "This user already exists!"}) 
		}
	});
	app.get('/logout', async (req, res) => {
		req.session.destroy();
		res.clearCookie("AuthCookie");
		res.redirect("/");
	});
	app.get("/averageStats", async (req,res) =>{
		res.send(await userCollection.getAverageStats());
	})
	
	module.exports=app;