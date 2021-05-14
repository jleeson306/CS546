//$(document).on("click", "a", function(e){
//	e.preventDefault();
//});

$(document).ready(function(){	
	$.get('http://api.tvmaze.com/shows', function(data) {
		$('#showList').show();
		$('#show').hide()
		$('#homeLink').hide();
		let cList = $('ul');
		//alert(data[1]._links.self.href);
		$.each(data, function(i) {
			let li = $('<li/>').appendTo(cList);
			let ah = $('<a/>').text(data[i].name).addClass("ha").attr("href", data[i]._links.self.href).appendTo(li);
		});
	});
	$(document).on("click", "a.ha", function(e){
		e.preventDefault();
		$('#showList').hide();
		$('#homeLink').show();
		$('div').empty();
		let myLink = $(this).attr("href");
		$.get(myLink, function(data) {
			let showName = "N/A";
			let showImg = "/public/no_image.jpeg";
			let showLang = "N/A";
			let showGen = "N/A"
			let showRate = "N/A";
			let showNet = "N/A";
			let showSum = "N/A";
			if("name" in data) {
				if(data.name === null || data.name === undefined) {}
				else {showName = data.name;}
			}
			try {
				if("medium" in data.image) {
					if(data.image.medium === null || data.image.medium === undefined) {}
					else {showImg = data.image.medium;}
				}
			}catch(e){}
			if("language" in data) {
				if(data.language === null || data.language === undefined) {}
				else {showLang = data.language;}
			}
			if("genres" in data) {
				if(data.genres === null || data.genres === undefined) {}
				else {showGen = data.genres;}
			}
			try {
			if("average" in data.rating) {
				if(data.rating.average === null || data.rating.average === undefined) {}
				else {showRate = data.rating.average;}
			}
			}catch(e){}
			try {
				if("name" in data.network) {
					if(data.network.name === null || data.network.name === undefined) {}
					else {showNet = data.network.name;}
				}
			}catch(e){}
			if("summary" in data) {
				if(data.summary === null || data.summary === undefined) {}
				else {showSum = data.summary;}
			}
			let cList = $('div');
			let h1 = $('<h1/>').text(showName).appendTo(cList);
			let img = $('<img/>').attr("src", showImg).appendTo(cList);
			let dl = $('<dl/>').appendTo(cList);
			let dt1 = $('<dt/>').text("Language").appendTo(dl);
			let lilang = $('<dd/>').text(showLang).appendTo(dl);
			let dt2 = $('<dt/>').text("Genres").appendTo(dl);
			let ul = $('<ul/>').appendTo(dl);
			$.each(showGen, function(i) {
				let liA = $('<dd/>').text(showGen[i]).appendTo(ul);
			});
			let dt3 = $('<dt/>').text("Average Rating").appendTo(dl);
			let lirat = $('<d/>').text(showRate).appendTo(dl);
			let dt4 = $('<dt/>').text("Network").appendTo(dl);
			let linet = $('<d/>').text(showNet).appendTo(dl);
			let dt5 = $('<dt/>').text("Summary").appendTo(dl);
			let lisum = $('<d/>').text(showSum).appendTo(dl);
		});
		$('#show').show();
	});
	$(document).on("click", "a.car", function(e){
		e.preventDefault();
		location.reload();
	});
	$("form").submit(function(e){
		e.preventDefault();
		let x = $("form").serializeArray();
		let term = x[0].value;
		if(term.trim() == "") {
			alert("Search Term must contain letters");
		}
		else{
			let url = "http://api.tvmaze.com/search/shows?q=" + term;
			$.get(url, function(data) {
				if(data.length == 0) {
					alert("No shows were found");
				}
				else {
					$('ul').empty();
					$('#showList').show();
					$('#homeLink').show();
					$('#show').hide()
					let cList = $('ul');
					$.each(data, function(i) {
						let li = $('<li/>').appendTo(cList);
						let ah = $('<a/>').text(data[i].show.name).addClass("ha").attr("href", data[i].show._links.self.href).appendTo(li);
					});
				}
			});
		}
	});
});


//$('#show').show()
//$('#homeLink').show();
//$('#show').hide()

	//$("button").click(function(){
	//	console.log("but");
	//	$('#show').show()
	//});