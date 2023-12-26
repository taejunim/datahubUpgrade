<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:52 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>
<!DOCTYPE html>
<html>
<head>
  <c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}" />
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <link rel="stylesheet" href="<c:url value="/css/reset.css" />">
  <link rel="stylesheet" href="<c:url value="/css/layout.css" />">
  <link rel="stylesheet" href="<c:url value="/css/common.css" />">
  <link rel="stylesheet" href="<c:url value="/css/main.css" />">
  <link rel="stylesheet" href="<c:url value="/css/custom.css" />">
  <script src="<c:url value="/js/jquery/jQuery.js"/>"></script>
  <script src="<c:url value="/js/common.js"/>"></script>
</head>
<body class="hold-transition skin-blue sidebar-mini">
  <div class="wrap-loading display-none">
    <div><img src="<c:url value='/images/loading.gif'/>"  alt ="로딩이미지"/></div>
  </div>
  <div class="wrapper">
    <tiles:insertAttribute name="sidebar"/>

    <div class="content-wrapper wh100">
      <tiles:insertAttribute name="header"/>
      <tiles:insertAttribute name="content"/>
    </div>
  </div>
</body>
</html>
