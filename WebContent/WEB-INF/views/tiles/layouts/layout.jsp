<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title><tiles:getAsString name="title" /></title>
<link href="<c:url value='/resources/static/default/css/main.css' />"
	rel="stylesheet"></link>
<link rel="stylesheet" href="<s:theme code='stylesheet'/>"
	type="text/css" />
<link
	href="<c:url value='/static/default/css/inc/font-awesome.min.css' />"
	rel="stylesheet"></link>
<link
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
	rel="stylesheet">
	
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/jquery-3.2.1.min.js' />"></script>
</head>
<body>

	<div id="loading">
	  <img id="loading-image" src="<c:url value='/static/default/img/startUp/ajax-loader.gif' />" alt="Loading..." />
	</div>

	<div id="settingsMenu">
		<tiles:insertAttribute name="settingsMenu" />
	</div>
	
	<div id="mainMenu">
		<tiles:insertAttribute name="mainMenu" />
	</div>
	
	<div id="site-content"> <tiles:insertAttribute
		name="body" /> </div>

	<div id="socialMenu">
		<tiles:insertAttribute name="socialMenu" />
	</div>
	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"
		type="text/javascript"></script>
	<script type="text/javascript" src="<c:url value='/static/default/js/lib/jquery-3.2.1.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/static/default/js/app.js' />" ></script>
	<script language="javascript" type="text/javascript">
	     $(window).on("load", function() {
		     $('#loading').hide();
		  });
	</script>
</body>
</html>