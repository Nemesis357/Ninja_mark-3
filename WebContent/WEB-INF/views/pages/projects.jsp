<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link href="<c:url value="/static/default/css/projects.css" />"
		rel="stylesheet">
<%-- 	<link href="<s:theme code='projectsBackground'/>" rel="stylesheet"> --%>
</head>
<body>
	
		<h2 class="projectsHeading">
			<s:message code="ninja.projectsHeading"
	 			text="My projects... So far..." />
		</h2>

		<div class="projectHolder">
			<div class="projectBox">		
				<div class="thumb project_1">
					<a href="#"> <span>the optimist lives on</span>
					</a>
				</div>
			</div>
			<div class="projectBox">
				<div class="thumb project_2">
					<a href="#"> <span>the optimist lives on</span>
					</a>
				</div>
			</div>
			<div class="projectBox">
				<div class="thumb project_3">
					<a href="#"> <span>the optimist lives on</span>
					</a>
				</div>
			</div>
			<div class="projectBox">
				<div class="thumb project_4">
					<a href="#"> <span>the optimist lives on</span>
					</a>
				</div>
			</div>
			<div class="projectBox">
				<div class="thumb project_5">
					<a href="#"> <span>the optimist lives on</span>
					</a>
				</div>
			</div>
			<div class="projectBox">
				<div class="thumb project_6">
					<a href="#"> <span>the optimist lives on</span>
					</a>
				</div>
			</div>
		</div>


<%-- 	<script type="text/javascript" src="<c:url value='/static/default/js/lib/sketch.min.js' />"></script>  --%>
<%--  	<script type="text/javascript" src="<c:url value='/static/default/js/lib/dat.gui.min.js' />"></script>  --%>
<%--  	<script type="text/javascript" src="<c:url value='/static/default/js/lib/particles-main.js' />"></script>  --%>
</body>
</html>