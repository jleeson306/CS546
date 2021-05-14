$(document).ready(function(){
    $('#search').submit((event) => {
        event.preventDefault();
        $('#results').empty();
        $.get(`/search/${$('#searchTerm').val()}`, function(list){
            list.forEach(x => {
                if(typeof(x.name) === 'string' && typeof(x.type) === 'string'){
                    if(x.type && x.name && x.type == 'user'){
                        $('#results').append($(`<div class="result-user"><a href="/profiles/${x.name}">${x.name} (User)</a></div>`));
                    }
                    else if(x.type && x.name && x.type == 'team'){
                        $('#results').append($(`<div class="result-user"><a href="/clans/${x.name}">${x.name} (Team)</a></div>`));
                    }
                }
            });
        });
    });
});