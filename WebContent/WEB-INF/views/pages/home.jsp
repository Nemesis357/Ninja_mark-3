<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="<c:url value="/resources/static/default/css/home.css" />"
	rel="stylesheet">
<link href="<s:theme code='homeTitle'/>" rel="stylesheet"></link>
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
	<%-- 	Current Locale : ${pageContext.response.locale} --%>
	<%-- 	<a href="${contextPath}/about">About</a> --%>
	<%-- 	<s:message code="ninja.homeTitle" text="default text" /> --%>
	
	<div id="startAnim">
		<div class="springAnim" data-text="Powered by Spring">Powered by Spring</div>
	</div>

	<div id="homeScreen"
		style="background-image: url('${contextPath}/<s:theme code="homeBackground"/>')">

		<canvas id="homeAnimation" width="800" height="800"></canvas>

		<div class="homeTitle">
			<h1 class="homeTitleEffect" data-text="Nenad Nikolic">Nenad
				Nikolic</h1>
			<h2 class="homeTitleEffect" data-text="Web Developer">Web
				Developer</h2>
			<div class="textMask">
				<svg> <defs> <mask id="mask" x="0" y="0" width="100%"
					height="100%"> <!-- alpha rectangle --> <!-- rectángulo alfa -->
				<rect id="alpha" x="0" y="0" width="100%" height="100%" /> <!-- All text that you want -->
				<!-- Coloca todo el texto que necesites --> <text id="title" x="50%"
					y="0" dy="1.58em">Nenad Nikolic</text> <text id="subtitle" x="50%"
					y="0" dy="9.8em">Web Developer</text> </mask> </defs> <!-- Apply color here! -->
				<!-- Color aquí --> <rect id="base" x="0" y="0" width="100%"
					height="100%" /> </svg>
			</div>
		</div>

		<div class="overlay"></div>
	</div>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/animatedParticles.js' />"></script>
	<%-- background="${contextPath}/<s:theme code="homeBackground"/>" --%>
</body>
</html>