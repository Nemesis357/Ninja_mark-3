$(document).ready(function() {
	
	// Startup Animation
	$(".springAnim").addClass("animated");
	
	
	  if(typeof(localStorage.getItem("welcomeShown")) != null && localStorage.getItem("welcomeShown") != "true"){
		  setTimeout(function(){
		    $(".springAnim").animate({ opacity: 1 },3000);
		    
		    setTimeout(function(){$(".springAnim").addClass("glitchEffect");}, 5000);
		    setTimeout(function(){$(".springAnim").removeClass("glitchEffect").addClass("startUpShadow");}, 7000);
		    
		    setTimeout(function(){$("#startAnim").addClass("startUpFadeOut");}, 8500);
		    setTimeout(function(){$("#startAnim").remove();}, 8700);
		    
		    
		    localStorage.setItem("welcomeShown","true");
		  }, 500);
	  }else{
		  $("#startAnim").remove();
	  }

	$("#clear").on("click",function(){
	  localStorage.clear();
	  $(this).html("CLEARED").css("color","red");
	});
	
	
	
	
	
	
	
	
	
	
	
	
	

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
	
	
//    var randomColor = Math.floor(Math.random()*16777215).toString(16);
});
