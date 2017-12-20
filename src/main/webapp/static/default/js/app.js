$(document).ready(function() {

	// Settings Menu Logic
	$(document).on('click', '#settingsMenuToggle > i', function() {
		$("#settingsMenuToggle").toggleClass("active");
		$("#settingsMenu").toggleClass("active");
	})

	// Social Menu Logic
	var button = document.querySelector('.triggerSocial'), items = document
			.querySelectorAll('li');
	var openCloseMenu = function() {
		for (i = 0; i < items.length; i++) {
			items[i].classList.toggle('slideout');
		}
	}
	button.onclick = openCloseMenu;


	
    //	Slide in on scrol (for listed messages in contact page)
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.ninja').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, slide it in */
            if( bottom_of_window > bottom_of_object ){
                $(this).css("left", "0");
            }
            
        }); 
    
    });
	
	
	// About social animation
//    $(document).on("mouseover", ".nav-elem", function() {
//    	console.log($(this));
//    	coneole.log($(this).offset());
//    })
    
    $(".nav-elem").on({
        mouseenter: function () {
        	$(".animation").css("left", $(this).offset().left + "px");
        },
        mouseleave: function () {
        	$(".animation").css("left", "-500px");
        }
    });
	
	
	
	//Random color on hover (About page)
    $(".logo-img").on({
        mouseenter: function () {
        	var randColor = Math.floor(Math.random()*16777215).toString(16);
        	$(this).css("background-color", "#" + randColor);
        },
        mouseleave: function () {
        	$(this).css("background-color", "initial");
        }
    });
	
	
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
});
