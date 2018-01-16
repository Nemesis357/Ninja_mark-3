<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link
	href="<c:url value='/resources/static/default/css/socialMenu.css' />"
	rel="stylesheet"></link>
</head>
<body>
	<div id="fb-root"></div>
	<script>
		// 		facebook share
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id))
				return;
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		// 		twitter share
		window.twttr = (function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
			if (d.getElementById(id))
				return t;
			js = d.createElement(s);
			js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);

			t._e = [];
			t.ready = function(f) {
				t._e.push(f);
			};

			return t;
		}(document, "script", "twitter-wjs"));
	</script>

	<div class="shareMenuSlider">
		<div class="shareBtn shareFacebook">
			<div class="fb-share-button" data-href="https://nenadniko.com"
				data-layout="button" data-size="large" data-mobile-iframe="true">
				<a class="fb-xfbml-parse-ignore" target="_blank"
					href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnenadniko.com%2F&amp;src=sdkpreparse">Share</a>
			</div>
		</div>
		<div class="shareBtn shareGoogle">
			<div class="g-plus" data-action="share" data-annotation="bubble"
				data-height="24" data-href="http://nenadniko.com/"></div>
		</div>
		<div class="shareBtn shareTwitter">
			<a class="twitter-share-button" href="https://twitter.com/intent/"
				data-size="large"> Tweet</a>
		</div>
		<div class="shareBtn sharePinterest">
			<a href="https://www.pinterest.com/pin/create/button/"
				data-pin-do="buttonBookmark" data-pin-tall="true"> </a>
		</div>
		<div class="shareBtn shareReddit">
			<a href="//www.reddit.com/submit"
				onclick="window.location = '//www.reddit.com/submit?url=' + encodeURIComponent(window.location); return false">
				<img src="//www.redditstatic.com/spreddit7.gif"
				alt="submit to reddit" border="0" />
			</a>
		</div>
		<div class="shareActivator">
			<i class="fa fa-share-alt" aria-hidden="true"></i>
		</div>
	</div>
	<script type="text/javascript" async defer
		src="//assets.pinterest.com/js/pinit.js"></script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script type="text/javascript"
		src="<c:url value='/resources/static/default/js/lib/socialShare.js' />"></script>
</body>
</html>