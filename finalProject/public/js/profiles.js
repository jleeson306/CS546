let currentMetric;
let totalWater;

const edit = function(event){
    let profileDiv = $('#profile-div');
    $('#edit-button').animate({opacity: 0}, 200, function(){
        $('#edit-button').hide();
    });
    profileDiv.animate({height: 0}, 300, 'swing', function(){
            profileDiv.children().hide();
            profileDiv.hide();
            profileDiv.css({height: 'auto'});
            let userDeferral = $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `${window.location.pathname}/data`,
            method: 'get',
            dataType: 'json',
        });
        userDeferral.done(function(user){
            let formDiv = $('#form-div');
            let dateObj = user.userBirthday;
            $('#firstName-field').val(`${user.userFirstName || ""}`);
            $('#lastName-field').val(`${user.userLastName || ""}`);
            $('#email-field').val(`${user.userEmail}`)
            $('#gender-field').val(`${user.userGender || ""}`);
            $('#birthday-field').val(dateObj.slice(0,10));
            $('#team-field').val(`${user.userTeam || ""}`);
            $('#bio-field').val(`${user.userBio || ""}`);
			$("#privacy-field").prop("checked",(user.userPrivacy) === "true");
			$("#goal-field").val(`${user.userGoal || ""}`)
            formDiv.show();
            let newHeight = formDiv.height();
            formDiv.css({height: 0});
            formDiv.animate({height: newHeight}, 300, 'swing');
            formDiv.css({height: 'auto'});
        });
    });
}

const updateUser = function(event){
    event.preventDefault();
    $('#user-sidebar').append(`<img class="loading_icon" src="/img/loading_ripple.gif">`);
    if($('#email-field').val().trim() == ""){
        alert("Email cannot be empty");
        $('#user-sidebar').children('.loading_icon').hide();
        return;
    }
    let sendObj = {
        userFirstName: $('#firstName-field').val(),
        userLastName: $('#lastName-field').val(),
        userBirthday: $('#birthday-field').val(),
        userGender: $('#gender-field').val(),
        userTeam: $('#team-field').val(),
        userBio: $('#bio-field').val(),
		userGoal: $('#goal-field').val(),
		userPrivacy: $("#privacy-field").prop("checked")
    };
    let updateDeferral = $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: window.location.pathname,
        type: "PUT",
        data: sendObj
    });
    updateDeferral.done(function(user){
        $('#user-sidebar').children('.loading_icon').hide();
        $('real-name').text(`${user.userFirstName} ${user.userLastName}`);
        $('#gender').text(user.userGender);
        let bday = "";
        let dateObj = new Date(user.userBirthday);
        if(dateObj instanceof Date){
            bday = `${dateObj.getUTCMonth()+1}/${dateObj.getUTCDate()}/${dateObj.getUTCFullYear()}`;
        }
        $('#birthday').text(bday);
        $('#team').text(user.userTeam);
        $('#bio').text(user.userBio);
        $('#goal').text(user.userGoal);
        cancelUpdate();
    });
    updateDeferral.fail(function(){
        alert("Must be logged in to update user");
        $('#user-sidebar').children('.loading_icon').hide();
    });
}

const cancelUpdate = function(){
    let formDiv = $('#form-div');
    formDiv.animate({height: 0}, 300, 'swing', function(){
        formDiv.hide();
        formDiv.css({height: 'auto'});
        let profileDiv = $('#profile-div');
        profileDiv.children().show();
        profileDiv.show();
        let newHeight = profileDiv.height();
        profileDiv.css({height: 0});
        profileDiv.animate({height: newHeight}, 300, 'swing');
    });
    $('#edit-button').show();
    $('#edit-button').animate({opacity: 1}, 200);
}

const submitComment = function(){
    let commentField = $('#comment-field');
    let user = window.location.pathname.split('/');
    user = user[user.length-1];
    $.post('/comments', {message: commentField.val(), receivingUser: user, isTeam: $("#clanInfo").length > 0}, function(comment){
        $('#no-comments').remove();
        $('#comments-list').append($(`<li id="${comment._id}" class="comment">[${comment.date}] <a href="/profiles/${comment.userDisplayName}">${comment.userDisplayName}</a>: ${comment.message}</li>`))
    })
    .fail(function(){
        alert("Only logged in users can post comments");
    });
}

const convertVolume = function(){
    if(currentMetric != $('#metrics').val()){
        if(currentMetric == "Gallons"){
            totalWater = totalWater*3.785;
        }
        else if(currentMetric == "Blue Whales"){
            totalWater = totalWater*2831.7;
        }
        if($('#metrics').val() == "Gallons"){
            totalWater = totalWater/3.785;
        }
        else if($('#metrics').val() == "Blue Whales"){
            totalWater = totalWater/2831.7;
        }
        currentMetric = $('#metrics').val();
    }
    $('#total-water').text(totalWater);
}


$(document).ready(function(){

    $('#form-div').hide();
    currentMetric = "Liters";
    totalWater = parseFloat($('#total-water').text());
    convertVolume();
    $.get(`${window.location.pathname}/comments/${$("#clanInfo").length > 0}`, function(commentIDs){
        let comments= $('#comments-list');
        if(commentIDs == null || !Array.isArray(commentIDs) || commentIDs.length == 0){
            comments.append($(`<li id="no-comments" class="comment">No comments. Be the first to leave one!</li>`));
            return;
        }
        $.each(commentIDs, function(index, commentID){
            comments.append($(`<li id="${commentID}" class="comment"></li>`));
            $.get(`/comments/${commentID}`, function(comment){
                // make sure to do checking first
                $(`#${comment._id}`).append(`[${comment.date}] <a href="/profiles/${comment.userDisplayName}">${comment.userDisplayName}</a>: ${comment.message}`);
            });
        });
    });
//Leo wrote this :japanese_goblin:
//given text from teams.Collection.interactClan, translates it to something to more user friendly
let translateText = (response) => {
	if (response === "join") {
		return ("Join Clan!")
	}
	else if (response == "leave")
	{
		return ("Leave Clan!")
	}
	else if (response == "peace")
	{
		return ("End War!")
	}
	else if (response =="war")
	{
		return ("Declare War!");
	}
}

$("#clanButton").text(translateText($("#clanButton").text()))


$("#joinClan").submit(() => {
	event.preventDefault();
	$.post("joinClan",{teamName: $("#display-name").text()}, (response) => {
		if (response != 0)
		{
			$("#clanButton").text(translateText(response))
			location.reload();
	}}
	)
})
    $('#edit-button').click(edit);
    $('#cancel-button').click(cancelUpdate);
    $('#edit-form').submit(updateUser);
    $('#comment-submit').click(submitComment);
    $('#metrics').change(convertVolume);
});

