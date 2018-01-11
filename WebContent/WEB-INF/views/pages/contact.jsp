<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value='/resources/static/default/css/contact.css' />"	rel="stylesheet"></link>
<link href="<s:theme code='submitButton'/>" rel="stylesheet">
<%-- <link rel="stylesheet" href="<s:theme code='stylesheet'/>" type="text/css" /> --%>
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />

	<div id="bodyBackground">
		<s:theme code='contactBackground'/>
		<div class="overlay"></div>
	</div>

	<div id="formWindow">
		<div class="formContainer">
			<h2>
				<s:message code="ninja.contactMe" text="Contact me" />
			</h2>
			<%-- 			<form action="/project-ninja/submit" method="POST"> --%>
			<form:form method="POST" onsubmit="return false" id="submitForm">
				<div class="formField formName">
					<form:label path="name">
						<s:message code="ninja.name" text="Name" />
					</form:label>
					<span class="input-icon"><i class="fa fa-user" aria-hidden="true"></i></span>
					<form:input path="name" type="text" />
				</div>
				<div class="formField">
					<form:label path="company">
						<s:message code="ninja.company" text="Company" />
					</form:label>
					<span class="input-icon"><i class="fa fa-building-o" aria-hidden="true"></i></span>
					<form:input path="company" type="text" />
				</div>
				<div class="formField formEmail">
					<form:label path="email">
						<s:message code="ninja.email" text="Email" />
					</form:label>
					<span class="input-icon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
					<form:input path="email" type="email" />
				</div>
				<div class="formField formMessage">
					<form:label path="message" for="message">
						<s:message code="ninja.message" text="Message" />...
					</form:label>
					<form:textarea path="message"></form:textarea>
				</div>
				<div class="formField formBtnGroup">
					<button id="submit" class="submit formButton submitDisable">
						<s:message code="ninja.submit" text="Submit" />
<!-- 						<i class="fa fa-check" aria-hidden="true"></i> -->
					</button>
					
					<button id="listMessages" class="loadMes formButton">
						<s:message code="ninja.listMessages" text="List Messages" />
					</button>					
				</div>
			</form:form>
		</div>
	</div>
<%-- 	<div>Name: ${name}</div> --%>
<%-- 	<div>Company: ${company}</div> --%>
<%-- 	<div>Email: ${email}</div> --%>
<%-- 	<div>Message: ${message}</div> --%>















<%-- 	<script type="text/javascript" --%>
<%-- 		src="<c:url value='/static/default/js/lib/jquery-3.2.1.min.js' />"></script> --%>
	<script type="text/javascript"
		src="<c:url value='/resources/static/default/js/lib/submitButton.js' />"></script>
</body>
</html>