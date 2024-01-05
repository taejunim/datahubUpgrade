<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/19/23
  Time: 5:25 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>
<script type="text/javascript" src="/js/views/login.js"></script>
<div class="loginPage">
    <div class="loginHeader">
        <div class="leftFrame">
            <h1 class="">
                <div class=" wh100">LOGO</div>
            </h1>
        </div>
        <div class="rightFrame">
            <h1 class="">
                <div class=" wh100">HOME</div>
            </h1>
            <h1 class="">
                <div class=" wh100">SIGNUP</div>
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
                            <input type="text" class="idBox font-opacity" placeholder="EMAIL ID / USER NAME" name="userId" id="userId"/>
                            <input type="password" class="pwBox font-opacity" placeholder="PASSWORD" name="userPwd" id="userPwd"/>
                        </div>
                        <div class="rememberAccount">
                            <div class="check">
                                <input type="checkbox" id="saveID" value="N">
                                <label class="w16rem h16rem font-white font-12" for="saveID">Remember</label>
                            </div>
                            <div class="font-white font-12">Forget Password</div>
                        </div>
                        <div class="loginBtn p5 mt20 font-white"
<%--                             onclick="location.href='<c:url value="/main.do"/>'" --%>
                             id="login">LOGIN</div>
                        <div class="h20p font-12 font-white letter-spacing0">Not a member? Sign up now</div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>