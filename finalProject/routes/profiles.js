const express = require('express');
const userData = require("../data/usersCollection");
const commentData = require("../data/commentsCollection");
const { ObjectID } = require('bson');
const router = express.Router();

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
    if(user.userFirstName && typeof(user.userFirstName) === 'string') sendObj.userFirstName = user.userFirstName;
    if(user.userLastName && typeof(user.userLastName) === 'string') sendObj.userLastName = user.userLastName;
    if(user.userBirthday && (user.userBirthday instanceof Date)) sendObj.userBirthday = `${user.userBirthday.getUTCMonth()+1}/${user.userBirthday.getUTCDate()}/${user.userBirthday.getUTCFullYear()}`;
    if(user.userGender && typeof(user.userGender) === 'string') sendObj.userGender = user.userGender;
    if(user.userBio && typeof(user.userBio) === 'string') sendObj.userBio = user.userBio;
    if(user.userTeam && typeof(user.userTeam) === 'string') sendObj.userTeam = user.userTeam;
    if(req.session && req.session.username&& req.session.username == req.params.userDisplayName){
        sendObj.loggedIn = true;
    }
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
    res.render("watB/profile", sendObj);
    return;
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
        const user = await userData.getUser(req.params.userDisplayName);
        // NEVER save password into client-side js or cookies
        delete user.userPasswordHashed;
        delete user.userComments;
        delete user.dailyActivities;
        res.json(user);
        return;
    }
    res.json({});
});

router.get("/:userDisplayName/comments", isAjax, async (req, res) =>{
    const user = await userData.getUser(req.params.userDisplayName);
    if(user && user.userComments && Array.isArray(user.userComments)){
        res.json(user.userComments);
        return;
    }
    res.json([]);
});

// TODO
router.put("/:userDisplayName", async(req, res) => {
    if(req.session && req.session.username && req.session.username == req.params.userDisplayName && req.body){
        let sendObj = req.body;
        let updatedUser = await userData.updateAny(sendObj, req.params.userDisplayName);
        delete updatedUser.userPasswordHashed;
        delete updatedUser.userEmail;
        delete updatedUser.userComments;
        delete updatedUser.dailyActivities;
        res.status(200).json(updatedUser);
    }
    res.status(403).send();
});

module.exports = router;