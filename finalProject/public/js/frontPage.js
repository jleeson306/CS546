$(document).ready(function()
	{	 
		$(".entryForm").css("display","none");
		$(".formToggle").on("click",()=>{$(event.target).siblings().css("display", $(event.target).siblings().css("display") === "none"? "inline" : "none")}) //toggle between inline and none
		$(".formToggle").hover(()=>{$(event.target).css("background","cyan")}, //while hovering
							  () => {$(event.target).css("background","none")} //when we stop hovering
		);
		$("form").submit(()=>{
			$("#errorMessage").css("display","none")
			console.log($("#errorMessage"))
			let input = $(event.target).serializeArray() //serialized array of input data
			for (let i = 0; i < input.length; ++i) 
			{
				if (input[i].value === "") //if a value is not filled out for either form, warn the user
				{
					alert("Incomplete " + $(event.target).prop("name") + " form!")
					event.preventDefault();
					return;
				}
			}
		})
		$.get("/averageStats", (data) => {
			$("#totalSteps").text(data.totalSteps)
			$("#totalWater").text(data.totalWater)
			$("#totalCalories").text(data.totalCalories)
			$("#averageCalories").text(data.averageCalories)

		})
	});