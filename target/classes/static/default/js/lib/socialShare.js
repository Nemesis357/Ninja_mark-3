<<<<<<< HEAD
var twitterShare = document.querySelector('[data-js="twitter-share"]');

twitterShare.onclick = function(e) {
	e.preventDefault();
	var twitterWindow = window.open('https://twitter.com/share?url='
			+ document.URL, 'twitter-popup', 'height=350,width=600');
	if (twitterWindow.focus) {
		twitterWindow.focus();
	}
	return false;
}

var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function(e) {
	e.preventDefault();
	console.log(document.URL);
	var facebookWindow = window.open(
			'https://www.facebook.com/sharer/sharer.php?u=' + document.URL,
			'facebook-popup', 'height=350,width=600');
	if (facebookWindow.focus) {
		facebookWindow.focus();
	}
	return false;
=======
var twitterShare = document.querySelector('[data-js="twitter-share"]');

twitterShare.onclick = function(e) {
	e.preventDefault();
	var twitterWindow = window.open('https://twitter.com/share?url='
			+ document.URL, 'twitter-popup', 'height=350,width=600');
	if (twitterWindow.focus) {
		twitterWindow.focus();
	}
	return false;
}

var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function(e) {
	e.preventDefault();
	console.log(document.URL);
	var facebookWindow = window.open(
			'https://www.facebook.com/sharer/sharer.php?u=' + document.URL,
			'facebook-popup', 'height=350,width=600');
	if (facebookWindow.focus) {
		facebookWindow.focus();
	}
	return false;
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
}