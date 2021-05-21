const express = require('express');
const userData = require("../data/usersCollection");
const commentData = require("../data/commentsCollection");
const teams = require("../data/teamsCollection")
const teamsColl = require('../config/mongoCollections').teamsCollection;
const { ObjectID } = require('bson');
const clansRoute=require("./clans")

const router = express.Router();

router.use("/clans",clansRoute)

// Render the profile with a given displayName
// Comments are filled in using client-side javascript and ajax requests
router.get('/', async (req, res) => {
    if(req.session && req.session.username){
        res.redirect(`profiles/${req.session.username}`);
        return;
    }
    else{
        res.redirect('/');
        return;
    }
});

router.get('/:userDisplayName', async (req, res) => {
    let user;
    try{
        user = await userData.getUser(req.params.userDisplayName);
    }
    catch(e){
        res.status(404).render('layouts/error', {layout: false, errorCode: '404', errorMessage: 'User not found'});
        return;
    }
    if(user == null){
        res.status(404).render('layouts/error', {layout: false, errorCode: '404', errorMessage: 'User not found'});
        return;
    }
    let sendObj = {/*layout: false, */userDisplayName: user.userDisplayName};
    if(req.session && req.session.username&& req.session.username == req.params.userDisplayName){
        sendObj.loggedIn = true;
    }
    if(user.userPrivacy == "true" && !sendObj.loggedIn){
        res.status(403).render('layouts/error', {layout: false, errorCode: '403', errorMessage: 'You cannot view that user'});
        return;
    }
    if(user.userFirstName && typeof(user.userFirstName) === 'string') sendObj.userFirstName = user.userFirstName;
    if(user.userLastName && typeof(user.userLastName) === 'string') sendObj.userLastName = user.userLastName;
    if(user.userBirthday && (user.userBirthday instanceof Date)) sendObj.userBirthday = `${user.userBirthday.getUTCMonth()+1}/${user.userBirthday.getUTCDate()}/${user.userBirthday.getUTCFullYear()}`;
    if(user.userGender && typeof(user.userGender) === 'string') sendObj.userGender = user.userGender;
    if(user.userBio && typeof(user.userBio) === 'string') sendObj.userBio = user.userBio;
    if(user.userTeam && typeof(user.userTeam) === 'string') sendObj.userTeam = user.userTeam;
    if(user.userGoal && typeof(user.userGoal) === 'string') sendObj.userGoal = user.userGoal;
    let totalWater = 0;
    let totalSteps = 0;
    let caloriesBurnt = 0;
    if(user.dailyStats){
        user.dailyStats.forEach(day => {
            if(day.waterConsumed){
                totalWater += day.waterConsumed;
            }
            if(day.stepsTaken){
                totalSteps += day.stepsTaken;
            }
            if(day.dailyActivities){
                day.dailyActivities.forEach(activity => {
                    if(activity.caloriesBurnt){
                        caloriesBurnt += activity.caloriesBurnt;
                    }
                });
            }
        });
    }
    sendObj.totalWater = totalWater;
    sendObj.totalSteps = totalSteps;
    sendObj.caloriesBurnt = caloriesBurnt;
    sendObj.css = ["profiles"]
    sendObj.title = `${req.params.userDisplayName} - Waterboy`;
    res.render("watB/profile", sendObj);
});

// Middleware for checking if a request is done through ajax
// This might be unsafe?? apparently postman can spoof being an ajax request
const isAjax = function(req, res, next){
    if (req.xhr){
        next();
    }
    else{
        res.status(403).render('layouts/error', {errorCode: '403', errorMessage: 'You do not have access to this content'});
    }
}

// For getting raw user data
// Uses middleware to make sure it is an ajax request
// Returns user data in json format, only available if logged in
// to he account they are trying to access
router.get("/:userDisplayName/data", isAjax, async (req, res) => {
    if(req.session && req.session.username && req.session.username == req.params.userDisplayName){
        let user;
        try{
            user = await userData.getUser(req.params.userDisplayName);
        }
        catch(e){
            res.status(404).render('layouts/error', {layout:false, errorCode: 404, errorMessage: "Content not found."});
            return;
        }
        // NEVER save password into client-side js or cookies
        delete user.userPasswordHashed;
        delete user.userComments;
        delete user.dailyActivities;
        res.json(user);
    }
    else{
        res.status(403).render('layouts/error', {layout:false, errorCode: 403, errorMessage: "Cannot access this content"});
    }
});

router.get("/:userDisplayName/comments/:isTeam", isAjax, async (req, res) =>{
    let user;
    if(req.params.userDisplayName.trim() == ""){
        res.status(400).render('layouts/error', {layout:false, errorCode: 404, errorMessage: "Content not found."});
        return;
    }
    try{
		if (req.params.isTeam === "true")
		{
			user = await teams.getTeam(req.params.userDisplayName);
		}
		else
		{
			user = await userData.getUser(req.params.userDisplayName);
		}
    }
    catch(e){
        res.status(404).render('layouts/error', {layout:false, errorCode: 404, errorMessage: "Content not found."});
        return;
    }
    if(user && user.userComments && Array.isArray(user.userComments)){
        res.json(user.userComments);
        return;
    }
    res.json([]);
});

router.put("/:userDisplayName", async(req, res) => {
    if(!req.body){
        res.status(400).send();
        return;
    }
    if(req.session && req.session.username && req.session.username == req.params.userDisplayName){
        let sendObj = req.body;
		
		let team = sendObj.userTeam //too lazy to type sendObj.userTeam everytime lmao
        if (team.trim().length === 0){
            try{
			    await teams.removeMember(req.session.username, (await userData.getUser(req.session.username)).userTeam);
            }
            catch(e){
                sendObj.userTeam = "";
            }
		}
		else{
            try{
			    let clan = await (await teamsColl()).findOne({teamName:team}) //here, we update the team, creating a new team if necessary. We do this before the userData updates so addMember will remove our user from the old team
                if (clan == null)
                {
                    await teams.createTeam(team);
                    await teams.addMember(req.session.username,team)
                }
                else
                {
                    await teams.addMember(req.session.username,team)
                }
            }
            catch(e)
            {
                res.status(500).render("watB/error",{ error: e.toString() });
                return;
		    }
        }
        let updatedUser = null;
		try {
            updatedUser = await userData.updateAny(sendObj, req.params.userDisplayName);
            delete updatedUser.userPasswordHashed;
            delete updatedUser.userEmail;
            delete updatedUser.userComments;
            delete updatedUser.dailyActivities;
		}
		catch(e)
		{
			res.status(500).render("watB/error",{error: e.toString()})
            return;
		}
        res.status(200).json(updatedUser);
    }
    else{
        res.status(403).send();
    }
});

module.exports = router;