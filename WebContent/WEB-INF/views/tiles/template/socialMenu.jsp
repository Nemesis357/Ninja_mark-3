<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value='/static/default/css/socialMenu.css' />"
	rel="stylesheet"></link>
</head>
<body>
	<div id="fb-root"></div>
	<script>
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id))
				return;
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>
	<div class="share-buttons cn-wrapper">
		<ul>
			<li><a class="twitter-share-button"
				href="#"> <span aria-hidden="true"
					class="icon-twitter" data-js="twitter-share"></span></a></li></li>
			<li><a href="#"><span aria-hidden="true"
					class="icon-facebook" data-js="facebook-share"></span></a></li>
			<li><a href="#"><span aria-hidden="true"
					class="icon-google-plus"></span></a></li>
			<li><a href="#"><span aria-hidden="true" class="icon-reddit"></span></a></li>
		</ul>
		<button class="triggerSocial">
			<span aria-hidden="true" class="icon-share"></span>
		</button>
	</div>
	
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/socialShare.js' />"></script>
</body>
</html>