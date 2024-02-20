<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<div class="wrap-loading hidden">
    <div><img src="<c:url value='/images/loading.gif'/>"  alt ="로딩이미지" style="width: 13rem;height: 13rem;"/></div>
</div>
<div class="ssoMain">
    <div class="opacity"></div>
    <div class="frame">
        <div class="content">
            <div class="card mark">
                <div class="left">
                    <div class="">
                        <span class="font-34">제주 스마트시티 데이터허브 <br> 통합 서비스 플랫폼(가제)</span>
                    </div>
                    <div class="">
                        <span class="font-24"><%=(String) session.getAttribute("userName")%> 님 <br> 방문을 환영합니다!</span>
                    </div>
                    <div class="logout-display pointer-event">
                        <span class="logout"></span>
                        <span class="font-18">로그인 화면으로 돌아가기</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="right">
                    <div class="wh100 display-row align-items-center">
                        <div class="card-box" onclick="location.href='<c:url value="/main.do"/>'">
                            <div class="charger"></div>
                            <div class="font-white font-18">전기차 충전기 수요 시스템</div>
                        </div>
                        <div class="card-box">
                            <div class="transportation"></div>
                            <div class="font-white font-18">교통약자 보호구역</div>
                        </div>
                    </div>
                    <div class="wh100 display-row align-items-center">
                        <div class="card-box gap1rem" style="background: #ffffffb3;" onclick="categoryShow();">
                            <div class="font-24 font-weight-bold">전체 서비스</div>
                            <div class="font-20 font-weight-bold">더보기</div>
                        </div>
                        <div class="card-box">
                            <div class="pm"></div>
                            <div class="font-white font-18">PM 안전 서비스</div>
                        </div>
                    </div>
                </div>
                <div class="category" style="display: none;">
                    <div class="header">
                        <div class="font-24 font-bold">전체 서비스</div>
                        <div class="close pointer-event" onclick="categoryHide();"></div>
                    </div>
                    <div class="category-list">
                        <div class="list">
                            <div class="btn" onclick="location.href='<c:url value="/main.do"/>'">전기차 충전기 수요 시스템</div>
                        </div>
                        <div class="list">
                            <div class="btn">교통약자 보호구역</div>
                            <div class="btn">PM 안전 서비스</div>
                        </div>
                        <div class="list">
                            <div class="btn">추가 연계 시스템 1</div>
                            <div class="btn">추가 연계 시스템 2</div>
                        </div>
                        <div class="list">
                            <div class="btn">추가 연계 시스템 3</div>
                            <div class="btn">추가 연계 시스템 4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	window.onbeforeunload = function () {
		$('.wrap-loading').removeClass('hidden');
	};
	$(window).load(function () {
		$('.wrap-loading').addClass('hidden');
	});

	function categoryShow() {
		$('.right').fadeOut();
		$('.category').fadeIn();
	}

	function categoryHide() {
		$('.category').fadeOut();
		$('.right').fadeIn();
	}

</script>