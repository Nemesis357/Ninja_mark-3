<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value='/static/default/css/mainMenu.css' />"
	rel="stylesheet"></link>
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
	<!-- 	<link rel="stylesheet" -->
	<!-- 		href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"> -->

	<nav class="menu"> <input type="checkbox" href="#"
		class="menu-open" name="menu-open" id="menu-open" /> <label
		class="menu-open-button" for="menu-open"> <span
		class="hamburger hamburger-1"></span> <span
		class="hamburger hamburger-2"></span> <span
		class="hamburger hamburger-3"></span>
	</label> <a href="#" class="menu-item"> <i class="fa fa-bar-chart"></i>
	</a> <a href="#" class="menu-item"> <i class="fa fa-plus"></i>
	</a> <a href="${contextPath}/contact" class="menu-item"> <i class="fa fa-envelope"></i>
	</a> <a href="${contextPath}/about" class="menu-item"> <i class="fa fa-user" aria-hidden="true"></i>
	</a> <a href="${contextPath}/home" class="menu-item"> <i class="fa fa-home" aria-hidden="true"></i>
	</a> </nav>


	<!-- filters -->
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> <defs>
	<filter id="shadowed-goo"> <feGaussianBlur in="SourceGraphic"
		result="blur" stdDeviation="10" /> <feColorMatrix in="blur"
		mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
		result="goo" /> <feGaussianBlur in="goo" stdDeviation="3"
		result="shadow" /> <feColorMatrix in="shadow" mode="matrix"
		values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
	<feOffset in="shadow" dx="1" dy="1" result="shadow" /> <feBlend
		in2="shadow" in="goo" result="goo" /> <feBlend in2="goo"
		in="SourceGraphic" result="mix" /> </filter> <filter id="goo"> <feGaussianBlur
		in="SourceGraphic" result="blur" stdDeviation="10" /> <feColorMatrix
		in="blur" mode="matrix"
		values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
	<feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> </defs> </svg>
</body>
</html>