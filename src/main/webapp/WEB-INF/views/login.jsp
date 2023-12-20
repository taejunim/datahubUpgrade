<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/19/23
  Time: 5:25 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>
<div class="loginPage">
    <div class="loginHeader">
        <div class="leftFrame">
            <h1 class="logo">
                <div class="logoName">LOGO</div>
            </h1>
        </div>
        <div class="rightFrame">
            <h1 class="home">
                <div class="homeButton">HOME</div>
            </h1>
            <h1 class="signUp">
                <div class="signUpButton">SIGNUP</div>
            </h1>
        </div>
    </div>
    <form action="<c:url value="/"/>" method="post" id="loginForm" class="form-horizontal">
        <div class="loginBox">
            <div class="frame">
                <div class="topBox">
                    <div class="loginType">
                        <div class="type">
                            <div style="left: 67px; top: 26px; color: white; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word; ">EMAIL ID </div>
                            <div style="width: 68px; height: 0px; left: 235px; top: 560px; border: 1px rgba(255, 255, 255, 0.70) solid"></div>
                        </div>
                        <div class="type">
                            <div style="left: 67px; top: 26px; color: white; font-size: 20px; font-family: Inter; font-weight: 400; word-wrap: break-word">EMAIL ID </div>
                            <div style="width: 68px; height: 0px; left: 235px; top: 560px; border: 1px rgba(255, 255, 255, 0.70) solid"></div>
                        </div>

                    </div>
                    <div class="bottomBox">
                    </div>
                </div>
            </div>
            <%--            <h2 class="boxTitle">LOGIN</h2>--%>
<%--            <div class="inlineWrap mt50 ml15p">--%>
<%--                <label for="userLoginId" class="w20p">아이디</label>--%>
<%--                <input type="text" name="userLoginId"  id="userLoginId" class="w50p">--%>
<%--            </div>--%>
<%--            <div class="inlineWrap mt20 ml15p">--%>
<%--                <label for="userPwd" class="w20p">비밀번호</label>--%>
<%--                <input type="password" name="userPwd" id="userPwd" class="w50p">--%>
<%--            </div>--%>
<%--            <div class="inlineWrap ml15p">--%>
<%--                <label for="saveID" class="ml20p checkboxLabel">--%>
<%--                    <input type="checkbox" name="saveID" id="saveID" >아이디 저장--%>
<%--                </label>--%>
<%--            </div>--%>
<%--            <div class="ml15p">--%>
<%--                <button class="btn btn-navy btncenter w50p mt20 ml20p loginBtn" id="loginButton"> 로그인</button>--%>
<%--                <p class="font-red loginFail"> </p>--%>
<%--            </div>--%>
        </div>
    </form>
</div>
