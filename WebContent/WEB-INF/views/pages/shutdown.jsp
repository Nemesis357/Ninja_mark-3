<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value='/static/default/css/shutdown.css' />"
	rel="stylesheet">
</head>
<body>
	<canvas id="shutdownCanvas"></canvas>
	
	<div id="shutdown">
		<div class="area">&#9888; warning &#9888;</div>
		
<!-- 		<div class="textAnim anim1">Unauthorized entry detected</div> -->
<!-- 		<div class="textAnim anim2">Notifying authority... &#10004;</div> -->
<!-- 		<div class="textAnim anim3">Downloading user meta data.... &#10004;</div> -->
<!-- 		<div class="textAnim anim4">Uploading <p>Nemesis</p> Virus...... &#10004;</div> -->
		
<!-- 		<div class="textAnim anim5">Have a nice day</div> -->
		
<%-- 		<span>|</span> --%>
	</div>



	<script
		src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"
		type="text/javascript"></script>
	<script type="text/javascript" src="<c:url value='/static/default/js/lib/jquery-3.2.1.min.js' />"></script>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/shutdown.js' />"></script>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/shutdownLoading.js' />"></script>
</body>
</html>