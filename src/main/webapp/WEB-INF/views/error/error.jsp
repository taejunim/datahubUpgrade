<%--
  Created by IntelliJ IDEA.
  User: kim-useong
  Date: 1/24/24
  Time: 11:05 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
    .row {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .page-error{
        position: absolute;
        top: 40%;
        left: 40%;
        width: 15%;
        height: 12%;
        margin-top: -25px;
    }
    .font-red {
        color:#ff444b;
    }
</style>
<div class="row">
    <div class="col-md-12 page-error">
        <div class="number font-red">${statusCode}</div>
        <div class="details">
            <h3>${message}</h3>
            <p>
                <a href="javascript:history.back();"> [HOME] </a>을 클릭하시면, 홈으로 돌아갑니다.
            </p>
        </div>
    </div>
</div>