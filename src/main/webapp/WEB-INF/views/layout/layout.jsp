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

<link rel="stylesheet" href="<c:url value="/css/jquery/jquery-ui.min.css" />">
<link rel="stylesheet" href="<c:url value="/css/reset.css" />">
<link rel="stylesheet" href="<c:url value="/css/layout.css" />">
<link rel="stylesheet" href="<c:url value="/css/common.css" />">
<link rel="stylesheet" href="<c:url value="/css/main.css" />">
<link rel="stylesheet" href="<c:url value="/css/custom.css" />">
<link rel="stylesheet" href="<c:url value="/css/plugins/bootstrap/bootstrap.min.css" />">
<link rel="stylesheet" href="<c:url value="/css/plugins/datatables/dataTables.bootstrap.css"/>">
<link rel="stylesheet" href="<c:url value="/css/plugins/datatables/buttons.bootstrap.min.css"/>">
<link rel="stylesheet" href="<c:url value="/css/plugins/select2/select2.min.css"/>">
<link rel="stylesheet" href="<c:url value="/css/plugins/select2/select2-bootstrap4.min.css"/>">
<link rel="stylesheet" href="<c:url value="/css/plugins/datetimepicker/datetimepicker.css"/>">

<script src="<c:url value="/js/jquery/jQuery.js"/>"></script>
<script src="<c:url value="/js/jquery/jquery-ui.min.js"/>"></script>
<script src="<c:url value="/js/plugins/datatables/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/js/plugins/bootstrap/bootstrap.bundle.min.js"/>"></script>
<script src="<c:url value="/js/common.js"/>"></script>
<script src="<c:url value='/js/plugins/select2/select2.min.js' />"></script>
<script src="<c:url value='/js/plugins/datetimepicker/datetimepicker.full.min.js' />"></script>
<script src="<c:url value="/js/plugins/amcharts5/index.js"/>"></script>
<script src="<c:url value="/js/plugins/amcharts5/percent.js"/>"></script>
<script src="<c:url value="/js/plugins/amcharts5/xy.js"/>"></script>
<script src="<c:url value="/js/plugins/amcharts5/themes/Animated.js"/>"></script>
<script src="<c:url value="/js/plugins/html2canvas/html2canvas.js"/>"></script>

  <!-- 엑셀 -->
  <script src="<c:url value="/js/plugins/datatables/buttons.bootstrap.min.js"/>"></script>
  <script src="<c:url value="/js/plugins/datatables/jszip.min.js"/>"></script>
  <script src="<c:url value="/js/plugins/datatables/buttons.html5.min.js"/>"></script>
</head>
<body class="">

<div class="wrap-loading hidden">
  <div><img src="<c:url value='/images/loading.gif'/>"  alt ="로딩이미지" style="filter: invert(1);"/></div>
</div>
<div class="wrapper w100p">
  <!-- 사이드바 -->
  <tiles:insertAttribute name="sidebar"/>

  <div class="content-wrapper w85p h100p">
    <!-- 헤더 -->
    <tiles:insertAttribute name="header"/>
    <!-- 메인 -->
    <tiles:insertAttribute name="content"/>
  </div>
</div>
<!-- confirm -->
<tiles:insertAttribute name="confirm"/>

</body>
</html>
