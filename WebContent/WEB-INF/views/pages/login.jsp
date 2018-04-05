<<<<<<< HEAD
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="<c:url value="/resources/static/default/css/login.css" />"
	rel="stylesheet">
</head>
<body>

<div id="loginBcg"><div class="loginOverlay"></div></div>

<div id="loginSection">
	<div class="loginContainer">
		<h2>This is a Login Page</h2>
		
		<c:if test="${not empty error}">
			<div class="error">${error}</div>
		</c:if>
		<c:if test="${not empty msg}">
			<div class="msg">${msg}</div>
		</c:if>
		<form method="POST" action="<c:url value='/login' />" id="loginForm">
			<div class="loginFormField">
				<label path="username">
					<s:message code="ninja.username" text="Username" />
				</label>
				<span class="input-icon"><i class="fa fa-user" aria-hidden="true"></i></span>
				<input type="text" name="username" value=''/>
			</div>
			<div class="loginFormField">
				<label path="password">
					<s:message code="ninja.password" text="Password" />
				</label>
				<span class="input-icon"><i class="fa fa-key" aria-hidden="true"></i></span>
				<input type="password" name="password" />
			</div>
			<div class="loginFormField">
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
				<button id="loginBtn" class="submit formButton" type="submit">
					<s:message code="ninja.login" text="Login" />
				</button>
			</div>
		</form>
		
		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<c:url value="/logout" var="logoutUrl" />
			<form id="logout" action="${logoutUrl}" method="post" >
			  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			  <input type="submit" value="Logout" />
			</form>
			<button id="clear">Clear localStorage</button>
		</c:if>
	</div>
</div>

</body>
=======
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="<c:url value="/resources/static/default/css/login.css" />"
	rel="stylesheet">
</head>
<body>

<div id="loginBcg"><div class="loginOverlay"></div></div>

<div id="loginSection">
	<div class="loginContainer">
		<h2>This is a Login Page</h2>
		
		<c:if test="${not empty error}">
			<div class="error">${error}</div>
		</c:if>
		<c:if test="${not empty msg}">
			<div class="msg">${msg}</div>
		</c:if>
		<form method="POST" action="<c:url value='/login' />" id="loginForm">
			<div class="loginFormField">
				<label path="username">
					<s:message code="ninja.username" text="Username" />
				</label>
				<span class="input-icon"><i class="fa fa-user" aria-hidden="true"></i></span>
				<input type="text" name="username" value=''/>
			</div>
			<div class="loginFormField">
				<label path="password">
					<s:message code="ninja.password" text="Password" />
				</label>
				<span class="input-icon"><i class="fa fa-key" aria-hidden="true"></i></span>
				<input type="password" name="password" />
			</div>
			<div class="loginFormField">
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
				<button id="loginBtn" class="submit formButton" type="submit">
					<s:message code="ninja.login" text="Login" />
				</button>
			</div>
		</form>
		
		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<c:url value="/logout" var="logoutUrl" />
			<form id="logout" action="${logoutUrl}" method="post" >
			  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			  <input type="submit" value="Logout" />
			</form>
			<button id="clear">Clear localStorage</button>
		</c:if>
	</div>
</div>

</body>
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
</html>