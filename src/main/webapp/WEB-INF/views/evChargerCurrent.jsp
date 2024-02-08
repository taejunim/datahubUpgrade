<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:49 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<!-- 지도 관련 -->
<link rel="stylesheet" href="<c:url value='/css/plugins/openlayer/ol.css' />">
<script src="<c:url value='/js/plugins/openlayer/ol.js'/>"></script>
<script src="<c:url value='/js/plugins/openlayer/proj4.js'/>"></script>
<script src="<c:url value='/js/plugins/openlayer/DatahubMapObject.js'/>"></script>

<script src="<c:url value="/js/views/evChargerCurrent.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/css/evChargerCurrent.css" />">
<div class="rowWrap">
    <%-- 검색 --%>
    <div class="left">
        <div class="top w100p h10p">
            <div class="display-column justify-content-evenly h100p mt-1">
                <div class="display-row w100p h60p justify-content-evenly gap1rem">
                    <div class="searchBox w80p h70p">
                        <span class="icon_search w10p h100p"></span>
                        <input type="text" class="wh100" placeholder="검색어를 입력해주세요" />
                    </div>
                    <button type="button" class="w20p h70p btn-black font-white" id="searchButton">Search</button>
                </div>
            </div>
        </div>
        <div class="middle scroll">
            <div class="search-list-form"></div>
        </div>
        <%--하단바--%>
        <div class="bottom">
            <div class="font-white font-20"><span id="searchListCount" class="font-20"></span> results</div>
        </div>
    </div>
    <%--    지도화면--%>
    <div class="right">
        <div class="font-white font-20 w100p h5p pd1rme">EV Charger Location Info</div>
        <div class="map w100p h95p">
            <div id="vMap"></div>
            <div class="layer-radio-form">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="mapControlRadio" id="locationRadio" checked>
                    <label class="form-check-label" for="locationRadio">
                        EV 충전기 위치
                    </label>
                </div>
                <div class="form-check form-check-inline ">
                    <input class="form-check-input" type="radio" name="mapControlRadio" id="distributionRadio">
                    <label class="form-check-label" for="distributionRadio">
                        EV 충전기 설치 대수 대비 이용시간
                    </label>
                </div>
            </div>
            <div class="layer-group location-layer-component hidden">
                <div class="gray-layer w100p h50p">
                    <div class="display-column align-items-start wh100">
                        <div class="font-white font-18 display-info">EV Charger Info
                            <a href="#" id="EvChargerReport" class="display-print" title="레포트 출력">
                                <img src="<c:url value='/images/iconmonstr-printer-4.svg'/>" alt="레포트출력"/>
                                <p>레포트 출력</p>
                            </a>
                            <%--                            <button id="EvChargerReport" class="printingBtn">레포트 출력</button>--%>
                        </div>
                        <div class="display-column h95p">
                            <table class="table type4">
                                <tr>
                                    <th>충전기 명</th>
                                    <td id="chargerName"></td>
                                    <th>업체</th>
                                    <td>중앙제어</td>
                                </tr>
                                <tr>
                                    <th>개방 구분</th>
                                    <td>개방형</td>
                                    <th>총 충전 시간</th>
                                    <td>17시간</td>
                                </tr>
                                <tr>
                                    <th>총 충전 횟수</th>
                                    <td>21회</td>
                                </tr>
                                <tr>
                                    <th>도로명 주소</th>
                                    <td colspan="3" id="chargerAddress"></td>
                                </tr>
                            </table>
                            <div class="line"></div>
                            <table class="table type4">
                                <tr>
                                    <th>충전 구분</th>
                                    <td>급속(100kW)</td>
                                    <th>충전 상태</th>
                                    <td>사용 가능</td>
                                </tr>
                                <tr>
                                    <th>충전 타입</th>
                                    <td>DC 차데모</td>
                                    <td>AC 3상</td>
                                    <td>DC 콤보</td>
                                </tr>
                                <tr>
                                    <td colspan="4" style="text-align: -webkit-center;">
                                        <div class="dash-line"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>충전 구분</th>
                                    <td>급속(100kW)</td>
                                    <th>충전 상태</th>
                                    <td>사용중</td>
                                </tr>
                                <tr>
                                    <th>충전 타입</th>
                                    <td>DC 차데모</td>
                                    <td>AC 3상</td>
                                    <td>DC 콤보</td>
                                </tr>
                            </table>
                            <div class="line"></div>
                            <table class="table type4-3">
                                <tr>
                                    <td colspan="4" class="font-10">최근 3개월 이용 현황</td>
                                </tr>
                                <tr>
                                    <th>충전 일시</th>
                                    <td>2023.12.11.</td>
                                    <th>충전 시간</th>
                                    <td>128분</td>
                                </tr>
                                <tr>
                                    <th>충전 일시</th>
                                    <td>2023.12.11.</td>
                                    <th>충전 시간</th>
                                    <td>128분</td>
                                </tr>
                                <tr>
                                    <th>충전 일시</th>
                                    <td>2023.12.11.</td>
                                    <th>충전 시간</th>
                                    <td>128분</td>
                                </tr>
                                <tr>
                                    <th>충전 일시</th>
                                    <td>2023.12.11.</td>
                                    <th>충전 시간</th>
                                    <td>128분</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="gray-layer h25p">
                    <div class="display-column align-items-start wh100 h100p">
                        <div class="font-white font-18">EV Charger USE Time/Count</div>
                        <div class="CurrentChart" id="CurrentChart"></div> <%--차트영역--%>
                    </div>
                </div>
                <div class="gray-layer h25p">
                    <div class="display-column align-items-start wh100 h100p">
                        <div class="font-white font-18">EV Charger USE Time/Count</div>
                        <div class="CurrentChart" id="CurrentChart1"></div> <%--차트영역--%>
                    </div>
                </div>
            </div>
            <div class="layer-group distribution-layer-component hidden">
                <div class="gray-layer w100p h100p">
                    <div class="display-column align-items-start wh100">
                        <div class="font-white font-18" style="display: flex; justify-content: space-between; width: 100%;">충전기 이용 상세 정보</div>
                        <div class="display-column h95p">
                            <div class="display-column align-items-start wh100 h100p">
                                <table class="table type4 w100p">
                                    <tr>
                                        <th class="text-left">충전기 대수 대비 이용시간(분)</th>
                                        <td class="text-center">42.9</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">건별 평균 이용시간(분)</th>
                                        <td class="text-center">23</td>
                                    </tr>
                                </table>
                                <div class="line"></div>
                                <table class="table type4 w100p">
                                    <tr>
                                        <th colspan="2" class="text-left">충전기 대수(대)</th>
                                        <td colspan="2" class="text-center">30</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">총 이용시간(분)</th>
                                        <td class="text-center">1,288</td>
                                        <th class="text-left">총 이용횟수</th>
                                        <td class="text-center">154</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="line"></div>
                            <div class="display-column align-items-start wh100 h100p">
                                <div class="font-white font-14">충전기 목록</div>
                                <table id="dataTable2" class="table type4-3 w100p"> </table>
                            </div>
                            <div class="display-column align-items-start wh100 h100p">
                                <div class="font-white font-14">운영사 점유 비율</div>
                                <div class="CurrentChart" id="CurrentChart2"></div> <%--차트영역--%>
                            </div>
                            <div class="display-column align-items-start wh100 h100p">
                                <div class="font-white font-14">충전기 설치 대수/이용 건수 대비 이용시간</div>
                                <div class="CurrentChart wh100" id="CurrentChart3"></div> <%--차트영역--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="report-wrap" style="position: absolute;">
    <div class="report-body">
        <div class="page" style="display: none;">
            <h3 class="report-title">제주도내 전기차 충전기 구축현황(‘23. 11월말)</h3>
            <p class="evReportTable-caption"><strong>충전기 구축현황(누적)</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                (단위: 기)</p>
            <table class="report-table evReportTable1">
                <thead>
                <tr>
                    <th rowspan="2" colspan="2" width="20%">구분</th>
                    <th rowspan="2" width="15%">계</th>
                    <th colspan="3" width="45%" style="border-bottom: 1px dotted #B9B9B9 ">공용충전기</th>
                    <th rowspan="2" width="20%" style="border-right: none">비공용충전기</th>
                </tr>
                <tr>
                    <th>소계</th>
                    <th>급속</th>
                    <th>완속</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colspan="2">합계</td>
                    <td>25,898</td>
                    <td>7,413</td>
                    <td>2,055</td>
                    <td>5,358</td>
                    <td>18,485</td>
                </tr>
                <tr>
                    <td rowspan="3" style="border-bottom: none;">실적</td>
                    <td>2023년</td>
                    <td>3,406</td>
                    <td>1,550</td>
                    <td>260</td>
                    <td>1,290</td>
                    <td>1,856</td>
                </tr>
                <tr>
                    <td>2023년</td>
                    <td>3,406</td>
                    <td>1,550</td>
                    <td>260</td>
                    <td>1,290</td>
                    <td>1,856</td>
                </tr>
                <tr>
                    <td>2023년</td>
                    <td>3,406</td>
                    <td>1,550</td>
                    <td>260</td>
                    <td>1,290</td>
                    <td>1,856</td>
                </tr>
                </tbody>
            </table>
            <p class="evReportTable-caption-bottom">* 전국 공용충전기 현황: 총273,659기(급속 32,346, 완속 241,313) / 무공해차통합누리집 기준</p>
            <strong class="evReportTable-caption" style="text-align: left;">&nbsp;&nbsp;< 공용충전기 현황[기관별] - [계] 7,413기 ></strong>
            <table class="report-table evReportTable2">
                <thead>
                <tr>
                    <th>구 분</th>
                    <th>도</th>
                    <th>환경부</th>
                    <th>한전</th>
                    <th>도 출자 <br>출연기관</th>
                    <th>민간충전사업자</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>충전기</td>
                    <td>648기<br>
                        (급404, 완244)</td>
                    <td>342기(급)</td>
                    <td>521기<br>
                        (급296, 완225)</td>
                    <td>14기(급)</td>
                    <td>5,888기<br>
                        (급999, 완4,889)</td>
                </tr>
                <tr>
                    <td>관리방법</td>
                    <td>위탁관리<br>
                        (제주에너지공사)</td>
                    <td>위탁관리<br>(한국자동차환경협회)</td>
                    <td>위탁관리<br>
                        (로지시스)</td>
                    <td>자체관리</td>
                    <td>자체관리</td>
                </tr>
                <tr>
                    <td>충전요금</td>
                    <td>320원</td>
                    <td>(50kWh) 324.4원<br>
                        (100kWh) 346.2원</td>
                    <td>(50kWh) 324.4원<br>
                        (100kWh) 347.2원</td>
                    <td>320원</td>
                    <td>(급속) 320~480원<br>
                        (완속) 280~480원</td>
                </tr>
                </tbody>
            </table>
            <p class="evReportTable-caption-bottom">** 전국 공용충전기 현황: 총273,659기(급속 32,346, 완속 241,313) / 무공해차통합누리집 기준<br>
                *** 도 구축 전기버스 충전기 대수: 41기 (총 도 운영 충전기 대수: 689기)</p>
            <strong class="evReportTable-caption" style="text-align: left; font-weight: bold">집중형(스테이션) 충전기 구축 현황</strong>
            <p class="evReportTable-caption" style="text-align: left; padding-top: 5px;">&nbsp;&nbsp;&nbsp;&nbsp;< 급속충전시설 5기 이상 운영 충전소 - 34개소, 급속 307기 ></p>
            <table class="report-table evReportTable3">
                <thead>
                <tr>
                    <th width="5%">연<br>번</th>
                    <th width="35%">장 소 명</th>
                    <th width="10%">급속<br>충전기 수</th>
                    <th width="5%">연<br>번</th>
                    <th width="35%">장 소 명</th>
                    <th width="10%">급속<br>충전기 수</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>제주도청 1청사</td>
                    <td>7</td>
                    <td>9</td>
                    <td>이마트 신제주점</td>
                    <td>16</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>제주시청</td>
                    <td>6</td>
                    <td>10</td>
                    <td>이마트 탑동점</td>
                    <td>16</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>제주국제공항</td>
                    <td>10</td>
                    <td>11</td>
                    <td>성산항 야외 주차장</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>종합경기장</td>
                    <td>6</td>
                    <td>12</td>
                    <td>신라호텔</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>표선해수욕장</td>
                    <td>5</td>
                    <td>13</td>
                    <td>중앙공영주차장</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>한림체육관</td>
                    <td>5</td>
                    <td>14</td>
                    <td>농업기술원</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>신재생에너지홍보관</td>
                    <td>7</td>
                    <td>15</td>
                    <td>모로왓제2공영주차장</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>이마트 서귀포점</td>
                    <td>12</td>
                    <td>1</td>
                    <td>개인택시조합</td>
                    <td>6</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<form id="reportForm" style="display: none;"></form>
<script type="text/javascript">
	$('#EvChargerReport').click(function () {
		$('.page').show();
		printReport().then($('.page').hide());
	});
	const printReport = async () => {
		var form = $("#reportForm");
		var url = "/EvCharger.mng";
		var target = "제주도내 전기차 충전기 구축현황";
		let captureDiv = document.getElementsByClassName('page')[0];
		let captureCanvas;
		var img = new Image;
		console.log(captureDiv);
		await html2canvas(captureDiv, {
			scale:4,
			useCORS : true
		}).then(canvas => {
			captureCanvas = canvas.toDataURL('image/png');

			img.src = captureCanvas;
			img.crossOrigin = 'Anonymous';
			console.log("captureCanvas : " + img);
		})

		window.open(url,target);

		form.attr('action', url);
		form.attr('target', target); // window.open 타이틀과 매칭 되어야함
		form.attr('method', 'post');
		form.append('<input type="text" name="capture" value="'+img.src+'">');

		form.submit();
		form.empty();
	}

	const domtoiamge = async () => {

	}
</script>