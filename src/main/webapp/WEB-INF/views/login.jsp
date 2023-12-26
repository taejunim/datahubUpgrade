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
                <div class="logoName wh100">LOGO</div>
            </h1>
        </div>
        <div class="rightFrame">
            <h1 class="home">
                <div class="homeButton wh100">HOME</div>
            </h1>
            <h1 class="signUp">
                <div class="signUpButton wh100">SIGNUP</div>
            </h1>
        </div>
    </div>
    <form action="<c:url value="/"/>" method="post" id="loginForm" class="form-horizontal">
        <div class="loginBox wh100">
            <div class="frame">
                <div class="topBox wh100">
                    <div class="loginType">
                        <div class="">
                            <div class="type">EMAIL ID</div>
                            <div class="line"></div>
                        </div>
                        <div class="">
                            <div class="type"></div>
                            <div class=""></div>
                        </div>
                    </div>
                    <div class="bottomBox">
                        <div class="userIcon"></div>
                        <div class="line">
                            <div class=""></div>
                            <div class="font-white">or</div>
                            <div class=""></div>
                        </div>
                        <div class="loginInfo">
                            <input type="text" class="idBox font-opacity" placeholder="EMAIL ID / USER NAME"/>
                            <input type="text" class="pwBox font-opacity" placeholder="PASSWORD"/>
                        </div>
                        <div class="rememberAccount">
                            <div class="check">
                                <input type="checkbox" id="saveID">
                                <label class="w16rem h16rem font-white font-12" for="saveID">Remember</label>
                            </div>
<%--                            <label for="saveID" class="w16rem h16rem font-white font-12">--%>
<%--                                <input type="checkbox" name="saveID" id="saveID" >Remember me--%>
<%--                            </label>--%>
                            <div class="font-white font-12">Forget Password</div>
                        </div>
                        <div class="loginBtn p5 mt20 font-white" onclick="location.href='<c:url value="/main.do"/>'">LOGIN</div>
                        <div class="h20p font-12 font-white letter-spacing0">Not a member? Sign up now</div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
