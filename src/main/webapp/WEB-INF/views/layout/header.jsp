<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 1:50 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>

<c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}" />

<header class="w100p">
    <div class="clearfix headerWrap">
        <div class="header">
            <div class="info">
                <div>
                    <div class="alarm"></div>
                </div>
                <div>
                    <div class="userInfo"></div>
                </div>
                <div>
                    <div class="dropdown">
                        <div class="dropbtn">
                            <div class="bottom"></div>
                        </div>
<%--                        <div class="dropdown-content">--%>
<%--                            <a href="#">Settings</a>--%>
<%--                            <a href="#">Signout</a>--%>
<%--                        </div>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>