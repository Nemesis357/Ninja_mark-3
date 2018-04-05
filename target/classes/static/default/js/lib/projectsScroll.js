<<<<<<< HEAD
$(document).ready(function() {
	
	$(window).scroll(function() {
		var sc = $(window).scrollTop();
		var btt = $('.backToTop');
		if(sc < 350) {
			btt.removeClass("backToTopActive");
		}else {
			btt.addClass("backToTopActive");
		}
	})
	
	$(document).on('click', '.backToTop', function (e) {
        $('html,body').animate({
            scrollTop: 0
        }, 1100);
    });
	
=======
$(document).ready(function() {
	
	$(window).scroll(function() {
		var sc = $(window).scrollTop();
		var btt = $('.backToTop');
		if(sc < 350) {
			btt.removeClass("backToTopActive");
		}else {
			btt.addClass("backToTopActive");
		}
	})
	
	$(document).on('click', '.backToTop', function (e) {
        $('html,body').animate({
            scrollTop: 0
        }, 1100);
    });
	
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
})