$(document).ready(
		function() {

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

			
			 

		});
