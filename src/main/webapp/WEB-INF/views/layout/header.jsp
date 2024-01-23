<%@ page import="datahub.common.SessionConst" %>
<%@ page import="datahub.user.dto.UserDto" %><%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 1:50 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>

<c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}" />
<%
    UserDto userDto = (UserDto) session.getAttribute(SessionConst.LOGIN_MEMBER);
    String userName = userDto.getUserName();
%>
<header class="w100p h6p">
    <div class="clearfix headerWrap">
        <div class="header">
            <div class="info">
                <div class="dropdown">
                    <button class="btn font-white dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        <span class="icon_user"></span> <%=userName%>님
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="<c:url value="/myPage.do"/>">마이페이지</a>
                        <a class="dropdown-item" onclick="MsgBox.Confirm('singout', function (){location.href='<c:url value='/logout.mng'/>'});">로그아웃
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>