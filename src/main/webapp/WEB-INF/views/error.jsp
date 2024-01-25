<%--
  Created by IntelliJ IDEA.
  User: kim-useong
  Date: 1/24/24
  Time: 11:05 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<link rel="stylesheet" href="<c:url value="/css/error.css"/>">
<div class="row">
    <div class="col-md-12 page-error">
        <div class="details">
            <h3>${message}</h3>
            <p>
                <a href="/main.do"> [HOME] </a>을 클릭하시면, 홈으로 돌아갑니다.
            </p>
        </div>
    </div>
</div>