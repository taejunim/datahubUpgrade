<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/19/23
  Time: 5:16 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>데이터허브 고도화</title>
    <link rel="stylesheet" href="<c:url value="/css/reset.css" />">
    <link rel="stylesheet" href="<c:url value="/css/layout.css" />">
    <link rel="stylesheet" href="<c:url value="/css/common.css" />">
    <link rel="stylesheet" href="<c:url value="/css/main.css" />">
    <link rel="stylesheet" href="<c:url value="/css/plugins/bootstrap/bootstrap.min.css" />">

    <script src="<c:url value="/js/jquery/jQuery.js"/>"></script>
    <script src="<c:url value="/js/common.js"/>"></script>
    <script src="<c:url value='/js/plugins/datetimepicker/datetimepicker.full.min.js' />"></script>
    <script src="<c:url value="/js/plugins/bootstrap/bootstrap.bundle.min.js"/>"></script>
</head>
<body>
<div class="wrap-loading hidden">
    <div><img src="<c:url value='/images/loading.gif'/>"  alt ="로딩이미지" style="filter: invert(1);width: 9rem;height: 9rem;"/></div>
</div>
<tiles:insertAttribute name="content" />
<!-- confirm -->
<tiles:insertAttribute name="confirm"/>
</body>
</html>