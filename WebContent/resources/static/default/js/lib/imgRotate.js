<<<<<<< HEAD
$(window).on("load", function() {

	var imgArray = $(".about_section_1 img");
	
	$(imgArray[0]).addClass("activeImage");
	
	setTimeout(function() {
		spinnerLoop();
	}, 3000)

	function spinnerLoop() {
	    var i;
	    for (i = 0; i < imgArray.length - 1; i++) {
	    	spinner(i);
	    }
	}
	function spinner(i) {
	    var x = imgArray[i];
	    setTimeout(function() {
			$(".activeImage").css("transform", "rotateY(+2160deg)").removeClass("activeImage").next().css("transform", "rotateY(+1080deg)").addClass("activeImage");
		}, i * 3000);
	}
	
})
=======
$(window).on("load", function() {

	var imgArray = $(".about_section_1 img");
	
	$(imgArray[0]).addClass("activeImage");
	
	setTimeout(function() {
		spinnerLoop();
	}, 3000)

	function spinnerLoop() {
	    var i;
	    for (i = 0; i < imgArray.length - 1; i++) {
	    	spinner(i);
	    }
	}
	function spinner(i) {
	    var x = imgArray[i];
	    setTimeout(function() {
			$(".activeImage").css("transform", "rotateY(+2160deg)").removeClass("activeImage").next().css("transform", "rotateY(+1080deg)").addClass("activeImage");
		}, i * 3000);
	}
	
})
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
