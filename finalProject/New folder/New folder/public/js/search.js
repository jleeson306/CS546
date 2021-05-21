$(document).ready(function(){
    $('#search').submit((event) => {
        event.preventDefault();
        $('#results').empty();
        let searchDeferral = $.get(`/search/${$('#searchTerm').val()}`, function(list){
            if(list == null || Object.keys(list).length == 0){
                $('#results').append($(`<div class="result-user"><p>No results found</p></div>`));
                return;
            }
            list.forEach(x => {
                if(typeof(x.name) === 'string' && typeof(x.type) === 'string'){
                    if(x.type && x.name && x.type == 'user'){
                        $('#results').append($(`<div class="result-user"><a href="/profiles/${x.name}">${x.name} (User)</a></div>`));
                    }
                    else if(x.type && x.name && x.type == 'clan'){
                        $('#results').append($(`<div class="result-user"><a href="/profiles/clans/${x.name}">${x.name} (Clan)</a></div>`));
                    }
                }
            });
        });
        searchDeferral.fail(function(){
            alert("Could not fulfill search request");
        });
    });
});
