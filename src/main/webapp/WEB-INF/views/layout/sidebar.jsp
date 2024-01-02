<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 3:23 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>

<c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}" />

<div class="sideBar">
    <div class="menu">
        <div class="font-lightGray <c:if test="${fn:indexOf(path, 'main.do')>-1}">menuActive</c:if>"
             onclick="location.href='<c:url value="/main.do"/>'">
            <div class="dashboard"></div>
            <div class="">Dashboard</div>
        </div>
        <div class="font-lightGray <c:if test="${fn:indexOf(path, 'evChargerDemand.do')>-1}">menuActive</c:if>"
             onclick="location.href='<c:url value="/evChargerDemand.do"/>'">
            <div class="evDemand"></div>
            <div class="">EV Charger Demand</div>
        </div>
        <div class="font-lightGray <c:if test="${fn:indexOf(path, 'evChargerCurrent.do')>-1}">menuActive</c:if>"
            onclick="location.href='<c:url value="/evChargerCurrent.do"/>'">
            <div class="evCurrent"></div>
            <div class="">EV Charger Current</div>
        </div>
        <div class="font-lightGray <c:if test="${fn:indexOf(path, 'user.do')>-1}">menuActive</c:if>"
             onclick="location.href='<c:url value="/userInfo.do"/>'">
            <div class="userInfo"></div>
            <div class="">User</div>
        </div>
        <div class="font-lightGray <c:if test="${fn:indexOf(path, 'setting.do')>-1}">menuActive</c:if>"
             onclick="location.href='<c:url value="/Settings.do"/>'">
            <div class="setting"></div>
            <div class="">Settings</div>
        </div>
        <div class="font-lightGray" onclick="location.href='<c:url value="/logout.mng"/>'"
             onclick="location.href='<c:url value="/signout.do"/>'">
            <div class="signout"></div>
            <div class="">Signout</div>
        </div>
    </div>
    <div class="line"></div>
</div>