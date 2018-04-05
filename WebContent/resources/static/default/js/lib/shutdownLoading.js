<<<<<<< HEAD
$(window).on("load", function() {

	console.log("Loaded!")
	
	$("#shutdown").append("<div class='textAnim anim1'>Unauthorized entry detected</div>");
	$("#shutdown").append("<div class='textAnim anim2'>Notifying authority... &#10004;</div>");
	setTimeout(function() {
		$("#shutdown").append("<div class='textAnim anim2'>Downloading user meta data.... &#10004;</div>");
	}, 3000)
	setTimeout(function() {
		$("#shutdown").append("<div class='textAnim anim2'>Uploading <p>Nemesis</p> Virus...... &#10004;</div>");
	}, 7000)
	setTimeout(function() {
		$("#shutdown").append("<div class='textAnim anim2'>Have a nice day</div>");
	}, 10000)
	
	
	setTimeout(function() {
		$("#shutdown .textAnim").remove();
		$(".area").remove();
		$("#shutdown").append("<div class='area areaLg'><a href='/project-ninja-mk-1/home'> &#10008; </a></div>");
	}, 18000)
=======
$(window).on("load", function() {

	console.log("Loaded!")
	
	$("#shutdown").append("<div class='textAnim anim1'>Unauthorized entry detected</div>");
	$("#shutdown").append("<div class='textAnim anim2'>Notifying authority... &#10004;</div>");
	setTimeout(function() {
		$("#shutdown").append("<div class='textAnim anim2'>Downloading user meta data.... &#10004;</div>");
	}, 3000)
	setTimeout(function() {
		$("#shutdown").append("<div class='textAnim anim2'>Uploading <p>Nemesis</p> Virus...... &#10004;</div>");
	}, 7000)
	setTimeout(function() {
		$("#shutdown").append("<div class='textAnim anim2'>Have a nice day</div>");
	}, 10000)
	
	
	setTimeout(function() {
		$("#shutdown .textAnim").remove();
		$(".area").remove();
		$("#shutdown").append("<div class='area areaLg'><a href='/project-ninja-mk-1/home'> &#10008; </a></div>");
	}, 18000)
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
})