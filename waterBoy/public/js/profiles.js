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
    console.log()
    let sendObj = {
        userFirstName: $('#firstName-field').val(),
        userLastName: $('#lastName-field').val(),
        userBirthday: $('#birthday-field').val(),
        userGender: $('#gender-field').val(),
        userTeam: $('#team-field').val(),
        userBio: $('#bio-field').val()
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
        console.log(user);
        $('#user-sidebar').children('.loading_icon').hide();
        $('real-name').text(`${user.userFirstName} ${user.userLastName}`);
        $('#gender').text(user.userGender);
        let bday = "";
        console.log(typeof(user.userBirthday));
        let dateObj = new Date(user.userBirthday);
        if(dateObj instanceof Date){
            bday = `${dateObj.getUTCMonth()+1}/${dateObj.getUTCDate()}/${dateObj.getUTCFullYear()}`;
        }
        $('#birthday').text(bday);
        $('#team').text(user.userTeam);
        $('#bio').text(user.userBio);
        cancelUpdate();
    });
    updateDeferral.fail(function(){
        alert("something went wrong");
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
    $.post('/comments', {message: commentField.val(), receivingUser: user}, function(comment){
        console.log(comment);
        $('#no-comments').remove();
        $('#comments-list').append($(`<li id="${comment._id}" class="comment">[${comment.date}] <a href="/profiles/${comment.userDisplayName}">${comment.userDisplayName}</a>: ${comment.message}</li>`))
    })
    .fail(function(){
        alert("Only logged in users can post comments");
    });
    return;
}

const convertVolume = function(){
    if(currentMetric == "Liters" && $('#metrics').val() == "Gallons"){
        currentMetric = "Gallons";
        totalWater = totalWater/3.785;
    }
    if(currentMetric == "Gallons" && $('#metrics').val() == "Liters"){
        currentMetric = "Liters";
        totalWater = totalWater * 3.785;
    }
    $('#total-water').text(totalWater);
}


$(document).ready(function(){
    $('#form-div').hide();
    currentMetric = $('#metrics').val();
    totalWater = parseFloat($('#total-water').text());
    if(currentMetric == "Gallons"){
        totalWater /= 3.785;
        $('#total-water').text(totalWater);
    }
    $.get(`${window.location.pathname}/comments`, function(commentIDs){
        let comments= $('#comments-list');
        console.log(commentIDs);
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
    $('#edit-button').click(edit);
    $('#cancel-button').click(cancelUpdate);
    $('#edit-form').submit(updateUser);
    $('#comment-submit').click(submitComment);
    $('#metrics').change(convertVolume);
});