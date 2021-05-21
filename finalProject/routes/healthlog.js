const express = require('express');
const userData = require("../data/usersCollection");
const dailyStatsData = require("../data/dailyStats");
const router = express.Router();

router.get('/', async (req, res) => {
  if(req.session && req.session.username){
    res.redirect(`healthlog/${req.session.username}`);
  }
  else{
    res.redirect('/');
  }
});

const goal= 3; //daily water goal


//Health Log should be linked in profile
router.get('/:userDisplayName', async (req, res) => {
    if(req.session && req.session.username && req.session.username == req.params.userDisplayName){
      try {
          const user = await userData.getUser(req.params.userDisplayName);
          // Error throw based on Error throw in profile.js
          if(user == null) throw "Error - profile not found";
		  
		let today = new Date();
		let day = today.getDate();
		let month = today.getMonth()+1;
		if (month<10){
		  month = "0" + month;
		}
		if (day<10) {
		  day = "0" + day;
		}
		let date = today.getFullYear()+'-'+month+'-'+day;
		let whytf = false;
		try {
			let stat = await dailyStatsData.getDailyStat(req.session.username,date)
			whytf = (stat.waterConsumed >= goal)
		}
		catch(e)
		{
			//necessary catch to appease JS
		}
          res.render('watB/healthlog', {css: ["healthlog"], userDisplayName: user.userDisplayName, dailyStats: user.dailyStats, whytf:whytf});
      } catch (e) {
          res.status(500).render('layouts/error', {layout: false, errorCode: 500, errorMessage: e.toString()});
      }
    }
    else{
      res.status(403).render('layouts/error', {layout: false, errorCode: 403, errorMessage: "You do not have access to that content."});
    }
  });

  router.post('/:userDisplayName', async (req, res) => {
    const username = req.params.userDisplayName;
    const user = await userData.getUser(username);
    let calories = parseInt(req.body.calCon);
    if (Number.isNaN(calories)) {
      calories = 0;
    }
    let steps = parseInt(req.body.steps);
    if (Number.isNaN(steps)) {
      steps = 0;
    }
    let water = parseInt(req.body.water);
    if (Number.isNaN(water)) {
      water = 0;
    }
    let etype = req.body.etype;
    if (!etype) {
      etype = undefined;
    }
    const edur = req.body.edur;
    const calBurn = req.body.calBurn;
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    if (month<10){
      month = "0" + month;
    }
    if (day<10) {
      day = "0" + day;
    }
    let date = today.getFullYear()+'-'+month+'-'+day;
        let stat = null; 
		try {
			await dailyStatsData.getDailyStat(username, date); //check if stat exists
			await dailyStatsData.updateDailyStats(username, date, calories, steps, water, etype, edur, calBurn);

		}
		catch(e)
		{
			await dailyStatsData.createDailyStats(username, date, calories, steps, water, etype, edur, calBurn); //if not create it
		}
		stat = await dailyStatsData.getDailyStat(username, date);
        res.render('watB/healthlog', {css: ["healthlog"], userDisplayName: username, dailyStats: (await userData.getUser(username)).dailyStats, whytf: stat.waterConsumed >= goal});
    
  });

router.get('/:userDisplayName/data', async (req, res) => {
  if(req.session && req.session.username && req.session.username == req.params.userDisplayName){
    let user = await userData.getUser(req.params.userDisplayName);
    let dailyStats = user.dailyStats;
    res.json(dailyStats);
    return;
  }
  res.render('layouts/error', {errorCode: '403', errorMessage: 'Forbidden'});
});
module.exports = router;