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

	// Contact form label moving logic
	$(document).on('focusin', '#formWindow input, #formWindow textarea', function() {
		$(this).siblings("label").addClass("label-move");
	})
	
	$(document).on('focusout', '#formWindow input, #formWindow textarea', function() {
		if( $(this).val() == "" ) {
			$(this).siblings("label").removeClass("label-move");
		}
	})
	 

});
