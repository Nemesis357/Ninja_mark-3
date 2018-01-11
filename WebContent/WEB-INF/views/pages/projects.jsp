<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value="/resources/static/default/css/projects.css" />"
	rel="stylesheet">
<%-- 	<link href="<s:theme code='projectsBackground'/>" rel="stylesheet"> --%>
</head>
<body>
	<%-- <li class="animated_link3"><a href="#"><span data-title="LINK 3 - 3D Flip">LINK 3 - 3D Flip</span></a></li> --%>

	<div class="projectsContainer">
		<div class="projectsContent">

			<h2 class="projectsHeading">
				<s:message code="ninja.projectsHeading"
					text="My projects... So far..." />
			</h2>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/dentist.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://www.goganikolic.com/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/restaurant.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-08/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/doctorCare.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-2/index.html"
							target="_blank" class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/library.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-3/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/yacht.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-10/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/revision.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-5/#" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/designmodo.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-09/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/portfolio_2.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/portfolio/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>

			<div class="tiles">
				<div class="tile" data-scale="1.6"
					data-image="<c:url value="/static/default/img/projects/portfolio_1.png" />"></div>
				<div class="projects-box-2">
					<div class="projectLink">
						<a href="https://nemesis357.github.io/Mark-19/" target="_blank"
							class="linkButton">Link to a project page...</a>
					</div>
				</div>
			</div>



		</div>
	</div>

	<div class="backToTop">
		<div>
			<span><i class="fa fa-arrow-left" aria-hidden="true"></i></span> <span>Back
				to Top</span>
		</div>
	</div>


	<%-- 	<script type="text/javascript" src="<c:url value='/static/default/js/lib/sketch.min.js' />"></script>  --%>
	<%--  	<script type="text/javascript" src="<c:url value='/static/default/js/lib/dat.gui.min.js' />"></script>  --%>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/zoom.js' />"></script>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/projectsScroll.js' />"></script>
</body>
</html>