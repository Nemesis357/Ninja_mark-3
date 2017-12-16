<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="<c:url value="/static/default/css/about.css" />"
	rel="stylesheet">
<link href="<c:url value="/static/default/css/assets/lava.css" />"
	rel="stylesheet">
</head>
<body>
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />

	<div class="aboutContainer aboutContainerFlex">
		<div class="about_section_1">
			<%-- 			<img src="<s:theme code='aboutHero'/>" alt="Hero image"> --%>
			<s:theme code='aboutHero' />
		</div>
		<div class="about_section_2">
			<div class="sec2_box1">
				<h3 class="aboutHeading">
					<s:message code="ninja.aboutTitle1"
						text="Hello, my name is Nenad Nikolic" />
				</h3>
				<p>
					<s:message code="ninja.aboutMe1" text="Little bit about me" />
				</p>
			</div>
			<div class="sec2_box2">
				<h3 class="aboutHeading">
					<s:message code="ninja.aboutTitle2" text="Facts about me" />
				</h3>
				<p>
					<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
					<s:message code="ninja.aboutFacts1" text="Little bit about me" />
				</p>
				<p>
					<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
					<s:message code="ninja.aboutFacts2" text="Little bit about me" />
				</p>
				<p>
					<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
					<s:message code="ninja.aboutFacts3" text="Little bit about me" />
				</p>
				<p>
					<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
					<s:message code="ninja.aboutFacts4" text="Little bit about me" />
				</p>
				<p>
					<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
					<s:message code="ninja.aboutFacts5" text="Little bit about me" />
				</p>
			</div>
			<div class="sec2_box1">
				<h3 class="aboutHeading">
					<s:message code="ninja.aboutTitle3" text="Skillset" />
				</h3>

				<section class="data">
					<div class="bar-wrap">
						<label>Photoshop</label>
						<div class="bar blue" data-percentage="82"><span></span></div>
					</div>
					<div class="bar-wrap">
						<label>HTML 5</label>
						<div class="bar green" data-percentage="76"><span></span></div>
					</div>
					<div class="bar-wrap">
						<label>CSS 3</label>
						<div class="bar red" data-percentage="78"><span></span></div>
					</div>
					<div class="bar-wrap">
						<label>JavaScript</label>
						<div class="bar yellow" data-percentage="55"><span></span></div>
					</div>
					<div class="bar-wrap">
						<label>Java</label>
						<div class="bar purple" data-percentage="43"><span></span></div>
					</div>
				</section>

			</div>
		</div>
	</div>

	<div class="aboutContainer aboutContainerFlex aboutContainerInfo">
		<div class="info-box-1">
			<div class="info-skills">
				<div class="logo-img logo-spring">
					<img src="<c:url value='/static/default/img/logo/spring-1.png' />" />
				</div>
				<div class="logo-img logo-jquery">
					<img src="<c:url value='/static/default/img/logo/jquery-1.png' />" />
				</div>
				<div class="logo-img logo-sass">
					<img src="<c:url value='/static/default/img/logo/sass-1.png' />" />
				</div>
				<div class="logo-img logo-bootstrap">
					<img src="<c:url value='/static/default/img/logo/bootstrap-1.png' />" />
				</div>
			</div>
			<div class="info-tools">
				<div class="logo-img logo-eclipse">
					<img src="<c:url value='/static/default/img/logo/eclipse.jpg' />" />
				</div>
				<div class="logo-img logo-intellij">
					<img src="<c:url value='/static/default/img/logo/intellij.png' />" />
				</div>
				<div class="logo-img logo-atom">
					<img src="<c:url value='/static/default/img/logo/atom.png' />" />
				</div>
				<div class="logo-img logo-brackets">
					<img src="<c:url value='/static/default/img/logo/brackets.png' />" />
				</div>
			</div>
		</div>
		<div class="info-box-2">
			<a href="<c:url value='/downloadPDF' />"><div id="downloadPDF" class="download">
				<div class="downloadText"> <span><i class="fa fa-cloud-download" aria-hidden="true"></i>Download</span> </div>
				<div class="downloadImg"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>
			</div></a>
		</div>
	</div>
	
	<div class="aboutContainerFlex aboutContainerSocial">
		<div class="facebook nav-elem"><i class="fa fa-facebook" aria-hidden="true"></i></div>
		<div class="linkedin nav-elem"><i class="fa fa-linkedin-square" aria-hidden="true"></i></div>
		<div class="instagram nav-elem"><i class="fa fa-instagram" aria-hidden="true"></i></div>
		<div class="github nav-elem"><i class="fa fa-github" aria-hidden="true"></i></div>
		<div class="skype nav-elem"><i class="fa fa-skype" aria-hidden="true"></i></div>
		<div class="animation start-home"></div>
	</div>

	<script type="text/javascript"
		src="<c:url value='/static/default/js/lib/data.js' />"></script>
</body>
</html>