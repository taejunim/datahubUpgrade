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
    <script src="<c:url value="/js/jquery/jQuery.js"/>"></script>
</head>
<body>
<tiles:insertAttribute name="content" />
</body>
</html>