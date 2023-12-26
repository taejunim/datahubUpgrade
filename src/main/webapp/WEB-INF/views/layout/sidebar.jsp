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
        <div class="menuActive font-lightGray">
            <div class="dashboard"></div>
            <div class="">Dashboard</div>
        </div>
        <div class="font-lightGray">
            <div class="evDemand"></div>
            <div class="">EV Charger Demand</div>
        </div>
        <div class="font-lightGray">
            <div class="evCurrent"></div>
            <div class="">EV Charger Current</div>
        </div>
        <div class="font-lightGray">
            <div class="userInfo"></div>
            <div class="">User</div>
        </div>
        <div class="font-lightGray">
            <div class="setting"></div>
            <div class="">Settings</div>
        </div>
        <div class="font-lightGray">
            <div class="signout"></div>
            <div class="">Signout</div>
        </div>
    </div>
    <div class="line"></div>
</div>
