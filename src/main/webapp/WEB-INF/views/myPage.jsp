<%--
  Created by IntelliJ IDEA.
  User: kim-useong
  Date: 2024/01/18
  Time: 4:20 오후
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<div class="myPage_container wh100">
    <div class="frame">
        <div class="topBox wh100">
            <div class="loginType">
                <div class="">
                    <div class="type">MyPage</div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="bottomBox">
                <form id="joinForm" class="loginInfo w70p h80p">
                    <div class="joinFrame ">
                        <label class="font-white font-s14 h25p">아이디</label>
                        <input type="text" class="inputBox w100p h55p font-opacity" placeholder="아이디" name="userId" maxlength="20" readonly value="${myPage.userId}"/>
                        <div class="req userId h20p"></div>
                    </div>
                    <div class="joinFrame ">
                        <label class="font-white font-s14 h25p">현재 비밀번호</label>
                        <div class="inputBox">
                            <input type="password" class="font-opacity" placeholder="현재 비밀번호" name="userPwdNow"  maxlength="20"/>
                            <div class="icon_eyes myPage_image1" onclick="openPassword('userPwdNow','myPage_image1')"></div>
                        </div>
                        <div class="req userPwdNow h20p"></div>
                    </div>
                    <div class="joinFrame ">
                        <label class="font-white font-s14 h25p">새 비밀번호</label>
                        <div class="inputBox">
                            <input type="password" class="font-opacity" placeholder="새 비밀번호" name="userPwd"  maxlength="20"/>
                            <div class="icon_eyes myPage_image2" onclick="openPassword('userPwd','myPage_image2')"></div>
                        </div>
                        <div class="req userPwd h20p"></div>
                    </div>
                    <div class="joinFrame ">
                        <label class="font-white font-s14 h25p">새 비밀번호 확인</label>
                        <div class="inputBox">
                            <input type="password" class="font-opacity" placeholder="비밀번호 확인" name="userPwCheck"  maxlength="20"/>
                            <div class="icon_eyes myPage_image3" onclick="openPassword('userPwCheck','myPage_image3')"></div>
                        </div>
                        <div class="req userPwCheck h20p"></div>
                    </div>
                    <div class="joinFrame ">
                        <label class="font-white font-s14 h25p">이름</label>
                        <input type="text" class="inputBox w100p h55p font-opacity" placeholder="이름" name="userName" maxlength="20" value="${myPage.userName}"/>
                        <div class="req userName h20p"></div>
                    </div>
                    <div class="joinFrame ">
                        <label class="font-white font-s14 h25p">휴대폰 번호</label>
                        <input type="text" class="inputBox w100p h55p font-opacity" placeholder="-를 빼고 입력해 주세요." maxlength="13"
                               onkeyup="this.value = formatPhone(this.value);" name="userPhone" value="${myPage.userPhone}"/>
                        <div class="req userPhone h20p"></div>
                    </div>
                </form>
                <div class="w100p h20p joinBtn">
                    <button type="button" class="loginBtn p5 mt20 font-white w30p h50p" id="update_user">수정</button>
                    <button type="submit" class="loginBtn p5 mt20 font-white w30p h50p" id="delete_user">회원탈퇴</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<c:url value='/js/views/myPage.js'/>"></script>