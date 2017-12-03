<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"> -->
<!-- <title>Insert title here</title> -->
<link href="<c:url value='/static/default/css/settingsMenu.css' />"
	rel="stylesheet"></link>

</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />

	<div id="settingsMenuInner">
		<p class="settingsMenuTitle"><s:message code="ninja.themeSelect" text="Select theme" />:</p>
		<ul>
			<li class="rebelGalaxy hvr-bounce-to-bottom"><a href="?theme=rebelGalaxy"><i class="fa fa-space-shuttle" aria-hidden="true"></i>rebelGalaxy</a></li>
			<li class="businessBoring hvr-bounce-to-bottom"><a href="?theme=businessBoring"><i class="fa fa-briefcase" aria-hidden="true"></i>businessBoring</a></li>
			<li class="springNature hvr-bounce-to-bottom"><a href="?theme=springNature"><i class="fa fa-sun-o" aria-hidden="true"></i>springNature</a></li>
		</ul>
		<p class="settingsMenuTitle"><s:message code="ninja.languageSelect" text="Select language" />:</p>
		<ul>
			<li class="hvr-bounce-to-top"><a href="?lang=en"><img src="<c:url value='/static/default/img/flag-england.png' />"><s:message code="ninja.languageEn"
						text="English" /></a></li>
			<li class="hvr-bounce-to-top"><a href="?lang=sr"><img src="<c:url value='/static/default/img/flag-serbia.png' />"><s:message code="ninja.languageSr"
						text="Serbian" /></a></li>
		</ul>
	</div>
	<span id="settingsMenuToggle"><i class="fa fa-cog"
		aria-hidden="true"></i></span>
	<%-- 	Current Locale : ${pageContext.response.locale} --%>
</body>
</html>