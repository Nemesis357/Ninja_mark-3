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
	<div class="share-buttons cn-wrapper">
		<ul>
			<li><a href="#"><span aria-hidden="true"
					class="icon-twitter"></span></a></li>
			<li><a href="#"><span aria-hidden="true"
					class="icon-facebook"></span></a></li>
			<li><a href="#"><span aria-hidden="true"
					class="icon-google-plus"></span></a></li>
			<li><a href="#"><span aria-hidden="true" class="icon-reddit"></span></a></li>
		</ul>
		<button class="triggerSocial">
			<span aria-hidden="true" class="icon-share"></span>
		</button>
	</div>
</body>
</html>