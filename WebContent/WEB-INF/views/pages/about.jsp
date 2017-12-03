<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>About</title>
<%-- <link href="<c:url value="/static/default/css/app.css" />" rel="stylesheet"> --%>
<%-- <link rel="stylesheet" href="<s:theme code='stylesheet'/>" type="text/css" /> --%>
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
	<h1>About page...</h1>

<%-- 	<a href="${contextPath}">Home</a> --%>
<%-- 	<a href="${contextPath}/contact">Contact</a> --%>
	
	<br>
	

	<h2>
		<s:message code="ninja.aboutTitle" text="default text" />
	</h2>
</body>
</html>