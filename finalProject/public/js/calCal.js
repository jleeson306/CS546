let appID = "a2ee4f48";
let appKey = "c8fb3e81d5b0e9ec8d19202952e56d3c";

$(document).ready(function(){	
	$('#foodResults').children().hide()
	$('#foodResults').hide();
	$('#calSearch').submit((event) => {
        event.preventDefault();
		let term = $('#foodTerm').val();
		if(term.trim() == "") {
			alert("Search Term must contain letters");
		}
		else{
			let url = "https://api.nutritionix.com/v1_1/search/" + term + "?results=0:1&fields=*&appId=" + appID + "&appKey=" + appKey;
			$.get(url, function(data) {
				if(data.hits.length == 0) {
					alert("No foods were found");
				}
				else {
					$('#foodResults').empty();
					$('#foodResults').show();
					let foodStats = data.hits[0].fields;
					let foodName = term;
					let foodCal = "Unknown";
					let foodWat = "Unknown";
					let foodToF = "Unknown";
					let foodSod = "Unknown";
					let foodSug = "Unknown";
					let foodSvW = "Unknown";
					
					try {
						if("item_name" in foodStats) {
							if(foodStats.item_name === null || foodStats.item_name === undefined) {}
							else {foodName = foodStats.item_name;}
						}
					}catch(e){}
					try {
						if("nf_calories" in foodStats) {
							if(foodStats.nf_calories === null || foodStats.nf_calories === undefined) {}
							else {foodCal = foodStats.nf_calories;}
						}
					}catch(e){}
					try {
						if("nf_water_grams" in foodStats) {
							if(foodStats.nf_water_grams === null || foodStats.nf_water_grams === undefined) {}
							else {foodWat = foodStats.nf_water_grams + " grams";}
						}
					}catch(e){}
					try {
						if("nf_total_fat" in foodStats) {
							if(foodStats.nf_total_fat === null || foodStats.nf_total_fat === undefined) {}
							else {foodToF = foodStats.nf_total_fat + " grams";}
						}
					}catch(e){}
					try {
						if("nf_sodium" in foodStats) {
							if(foodStats.nf_sodium === null || foodStats.nf_sodium === undefined) {}
							else {foodSod = foodStats.nf_sodium + " milligram";}
						}
					}catch(e){}
					try {
						if("nf_sugars" in foodStats) {
							if(foodStats.nf_sugars === null || foodStats.nf_sugars === undefined) {}
							else {foodSug = foodStats.nf_sugars + " grams";}
						}
					}catch(e){}
					try {
						if("nf_serving_weight_grams" in foodStats) {
							if(foodStats.nf_serving_weight_grams === null || foodStats.nf_serving_weight_grams === undefined) {}
							else {foodSvW = foodStats.nf_serving_weight_grams + " grams";}
						}
					}catch(e){}
					
					let cList = $('#foodResults');
					let h1 = $('<h1/>').text(foodName).appendTo(cList);
					let dl = $('<dl/>').appendTo(cList);
					let dt1 = $('<dt/>').text("Calories").appendTo(dl);
					let ddCal = $('<dd/>').text(foodCal).appendTo(dl);
					let dt2 = $('<dt/>').text("Water").appendTo(dl);
					let ddWat = $('<dd/>').text(foodWat).appendTo(dl);
					let dt3 = $('<dt/>').text("Total Fat").appendTo(dl);
					let ddToF = $('<dd/>').text(foodToF).appendTo(dl);
					let dt4 = $('<dt/>').text("Sodium").appendTo(dl);
					let ddSod = $('<dd/>').text(foodSod).appendTo(dl);
					let dt5 = $('<dt/>').text("Sugar").appendTo(dl);
					let ddSug = $('<dd/>').text(foodSug).appendTo(dl);
					let dt6 = $('<dt/>').text("Serving Weight").appendTo(dl);
					let ddSbW = $('<dd/>').text(foodSvW).appendTo(dl);
					
					$('#foodResults').show();
				}
			});
		}
	});
});

/*
				else {
					$('#foodResults').empty();
					$('#foodResults').show();
					let foodStats = data.hits[0].fields;
					let foodName = term;
					let foodCal = "Unknown";
					let foodWat = "Unknown";
					let foodToF = "Unknown";
					let foodSod = "Unknown";
					let foodSug = "Unknown";
					let foodSvW = "Unknown";
					
					try {
						if("item_name" in foodStats) {
							if(foodStats.item_name === null || foodStats.item_name === undefined) {}
							else {foodName = foodStats.item_name;}
						}
					}catch(e){}
					try {
						if("nf_calories" in foodStats) {
							if(foodStats.nf_calories === null || foodStats.nf_calories === undefined) {}
							else {foodCal = foodStats.nf_calories;}
						}
					}catch(e){}
					try {
						if("nf_water_grams" in foodStats) {
							if(foodStats.nf_water_grams === null || foodStats.nf_water_grams === undefined) {}
							else {foodWat = foodStats.nf_water_grams;}
						}
					}catch(e){}
					try {
						if("nf_total_fat" in foodStats) {
							if(foodStats.nf_total_fat === null || foodStats.nf_total_fat === undefined) {}
							else {foodToF = foodStats.nf_total_fat;}
						}
					}catch(e){}
					try {
						if("nf_sodium" in foodStats) {
							if(foodStats.nf_sodium === null || foodStats.nf_sodium === undefined) {}
							else {foodSod = foodStats.nf_sodium;}
						}
					}catch(e){}
					try {
						if("nf_sugars" in foodStats) {
							if(foodStats.nf_sugars === null || foodStats.nf_sugars === undefined) {}
							else {foodSug = foodStats.nf_sugars;}
						}
					}catch(e){}
					try {
						if("nf_serving_weight_grams" in foodStats) {
							if(foodStats.nf_serving_weight_grams === null || foodStats.nf_serving_weight_grams === undefined) {}
							else {foodSvW = foodStats.nf_serving_weight_grams;}
						}
					}catch(e){}
					
					let cList = $('#foodResults');
					let h1 = $('<h1/>').text(foodName).appendTo(cList);
					let dl = $('<dl/>').appendTo(cList);
					let dt1 = $('<dt/>').text("Calories").appendTo(dl);
					let ddCal = $('<dd/>').text(foodCal).appendTo(dl);
					let dt1 = $('<dt/>').text("Water").appendTo(dl);
					let ddCal = $('<dd/>').text(foodWat + " grams").appendTo(dl);
					let dt1 = $('<dt/>').text("Total Fat").appendTo(dl);
					let ddCal = $('<dd/>').text(foodToF).appendTo(dl);
					let dt1 = $('<dt/>').text("Sodium").appendTo(dl);
					let ddCal = $('<dd/>').text(foodSod).appendTo(dl);
					let dt1 = $('<dt/>').text("Sugar").appendTo(dl);
					let ddCal = $('<dd/>').text(foodSug).appendTo(dl);
					let dt1 = $('<dt/>').text("Serving Weight").appendTo(dl);
					let ddCal = $('<dd/>').text(foodSvW + "grams").appendTo(dl);
					
					$('#foodResults').show();
					
*/