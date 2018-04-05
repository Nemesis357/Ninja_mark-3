<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page import="java.sql.*" %> 
<%@ page import="java.io.*" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value='/resources/static/default/css/contact.css' />"	rel="stylesheet"></link>
<link href="<s:theme code='submitButton'/>" rel="stylesheet">
<%-- <link rel="stylesheet" href="<s:theme code='stylesheet'/>" type="text/css" /> --%>
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!-- Class.forName("com.mysql.jdbc.Driver").newInstance(); -->
<!-- java.sql.Connection conn; -->
<!-- conn = DriverManager.getConnection( -->
<!--  "jdbc:mysql://localhost:3306/dbname?user=blah&password=blah"); -->

<!-- jdbc:mysql://localhost:3306/nenadnik_ninja_database?user=nenadnik_admin&password=3579sunshine3579 -->
<!-- jdbc:mysql://localhost:3306/ninja_database?user=dev-user&password=admin -->
<% 
// try {
//     String connectionURL = "jdbc:mysql://localhost:3306/nenadnik_ninja_database?user=nenadnik_admin&password=3579sunshine3579";
//     Connection connection = null; 
//     Class.forName("com.mysql.cj.jdbc.Driver").newInstance(); 
//     connection = DriverManager.getConnection(connectionURL);
//     if(!connection.isClosed()) {
//          System.out.println("Successfully connected to " + "MySQL server using TCP/IP...");
//     }
//     connection.close();
// }catch(Exception ex){
// 	System.out.println("Unable to connect to database.");
// }
%>


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
					
					<c:if test="${pageContext.request.userPrincipal.name == null}">
						<a class="loadMes formButton" href="/project-ninja-mk-1/login">Log in to see messages</a>
					</c:if>
					
					<c:if test="${pageContext.request.userPrincipal.name != null}">
						<button id="listMessages" class="loadMes formButton">
							<s:message code="ninja.listMessages" text="List Messages" />
						</button>
					</c:if>
				</div>
			</form:form>
<%-- 			<form:form action="/project-ninja-mk-1/listMessages"> --%>
<%-- 			<div>${_csrf.parameterName}</div> --%>
<%-- 			<div>${_csrf.token}</div> --%>
<%-- 				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> --%>
<!-- 				<button  class="loadMes formButton" type="submit"> -->
<%-- 					<s:message code="ninja.listMessages" text="List Messages" /> --%>
<!-- 				</button>	 -->
<%-- 			</form:form> --%>
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