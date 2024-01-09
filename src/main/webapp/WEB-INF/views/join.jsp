<%--
  Created by IntelliJ IDEA.
  User: kim-useong
  Date: 2023/12/24
  Time: 12:06 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf" %>

<div class="loginPage">
    <div class="loginHeader">
        <div class="leftFrame">
            <h1 class="">
                <div class=" wh100">LOGO</div>
            </h1>
        </div>
        <div class="rightFrame">
<%--            <h1 class="">--%>
<%--                <button type="button" class="btn wh100 font-white">HOME</button>--%>
<%--            </h1>--%>
            <h1 class="">
                <button type="button" class="btn wh100 font-white" onclick="location.href='<c:url value="/login.do"/>'">LOGIN</button>
            </h1>
        </div>
    </div>
    <div class="loginBox wh100">
        <div class="frame">
            <div class="topBox wh100">
                <div class="loginType">
                    <div class="">
                        <div class="type">회원가입</div>
                        <div class="line"></div>
                    </div>
                </div>
                <div class="bottomBox">
                    <form id="joinForm" class="loginInfo w70p h80p">
                        <div class="joinFrame ">
                            <label class="font-white font-s14 h25p">아이디</label>
                            <input type="text" class="inputBox w100p h55p font-opacity" placeholder="아이디" name="userId" maxlength="20" />
                            <div class="req userId h20p"></div>
                        </div>
                        <div class="joinFrame ">
                            <label class="font-white font-s14 h25p">비밀번호</label>
                            <input type="password" class="inputBox w100p h55p font-opacity" placeholder="비밀번호" name="userPwd"  maxlength="20"/>
                            <div class="req userPwd h20p"></div>
                        </div>
                        <div class="joinFrame ">
                            <label class="font-white font-s14 h25p">비밀번호 확인</label>
                            <input type="password" class="inputBox w100p h55p font-opacity" placeholder="비밀번호" name="userPwCheck" maxlength="20"/>
                            <div class="req userPwCheck h20p"></div>

                        </div>
                        <div class="joinFrame ">
                            <label class="font-white font-s14 h25p">이름</label>
                            <input type="text" class="inputBox w100p h55p font-opacity" placeholder="이름" name="userName" maxlength="20"/>
                            <div class="req userName h20p"></div>
                        </div>
                        <div class="joinFrame ">
                            <label class="font-white font-s14 h25p">휴대폰 번호</label>
                            <input type="text" class="inputBox w100p h55p font-opacity" placeholder="-를 빼고 입력해 주세요." maxlength="13"
                                   onkeyup="this.value = formatPhone(this.value);" name="userPhone" />
                            <div class="req userPhone h20p"></div>
                        </div>
                    </form>
                    <div class="w100p h20p joinBtn">
                        <button type="submit" class="loginBtn p5 mt20 font-white w50p h50p" id="" onclick="return fnJoin();">가입</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/views/join.js"></script>
