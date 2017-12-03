<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Contact</title>
<link href="<s:theme code='submitButton'/>" rel="stylesheet">
<%-- <link rel="stylesheet" href="<s:theme code='stylesheet'/>" type="text/css" /> --%>
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />

	<div id="bodyBackground">
		<div></div>
	</div>

	<div id="formWindow">
		<div class="formContainer">
			<h2>
				<s:message code="ninja.contactMe" text="English" />
			</h2>
			<form action="">
				<div class="formField">
					<label><s:message code="ninja.name" text="Name" /></label> <input type="text">
				</div>
				<div class="formField">
					<label><s:message code="ninja.company" text="Company" /></label> <input type="text">
				</div>
				<div class="formField">
					<label><s:message code="ninja.email" text="Email" /></label> <input type="email">
				</div>
				<div class="formField">
					<label for="message"><s:message code="ninja.message" text="Message" /></label>
					<textarea></textarea>
				</div>
				<div class="formField">
					<button id="submit" class="submit" type="button" ><s:message code="ninja.submit" text="Submit" /></button>
				</div>
			</form>
		</div>
	</div>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/jquery-3.2.1.min.js' />"></script>
	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/submitButton.js' />"></script>
</body>
</html>