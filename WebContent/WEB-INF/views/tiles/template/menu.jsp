<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<nav> <%-- 	<a href="${pageContext.request.contextPath}/"><img --%>
	<!-- 		class="logo" --> <%-- 		src="${pageContext.request.contextPath}/static/default/img/linux.png"></a> --%>
	<ul id="menu">
		<li><a href="${pageContext.request.contextPath}/home">Home</a></li>
		<li><a href="${pageContext.request.contextPath}/about">About</a></li>
		<li><a href="${pageContext.request.contextPath}/contact">Contact</a></li>
	</ul>

	</nav>
</body>
</html>