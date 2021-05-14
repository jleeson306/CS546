const express = require('express');
const userData = require("../data/usersCollection");
const dailyStatsData = require("../data/dailyStats");
const router = express.Router();

router.get('/', async (req, res) => {
  if(req.session && req.session.username){
    res.redirect(`healthlog/${req.session.username}`);
    return;
  }
  else{
    res.redirect('/');
    return;
  }
});
//Health Log should be linked in profile
router.get('/:userDisplayName', async (req, res) => {
    try {
        const user = await userData.getUser(req.params.userDisplayName);
        // Error throw based on Error throw in profile.js
        if(user == null) throw "Error - profile not found";
        res.render('watB/healthlog', {css: ["healthlog"], userDisplayName: user.userDisplayName, dailyStats: user.dailyStats});
    } catch (e) {
        res.status(500).send();
    }
  });

  router.post('/:userDisplayName', async (req, res) => {
    console.log("Hello?");
    console.log(req.body);  
    
    const username = req.params.userDisplayName;
    const user = await userData.getUser(username);
    const calories = parseInt(req.body.calCon);
    const steps = parseInt(req.body.steps);
    const water = parseInt(req.body.water);
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
    console.log(date);
    try {
        let stat = await dailyStatsData.getDailyStat(username, date);
        stat = await dailyStatsData.updateDailyStats(username, date, calories, steps, water);
        res.render('watB/healthlog', {css: ["healthlog"], userDisplayName: username, dailyStats: user.dailyStats});
    } catch(e) {
        // res.render('watB/error', {error: e});
        try {
          const stat = await dailyStatsData.createDailyStats(username, date, calories, steps, water);
          console.log(stat);
          res.render('watB/healthlog', {css: ["healthlog"], userDisplayName: username, dailyStats: user.dailyStats});
        } catch (e) {
            res.render('watB/error', {error: e});
        }
    }
  });

module.exports = router;