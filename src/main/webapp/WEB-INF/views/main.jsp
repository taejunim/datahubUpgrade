<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:49 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<script type="text/javascript" src="/js/views/main.js"></script>
<script>
	var totalCnt ='${totalBuilding.totalCnt}';
	var normalCnt ='${totalBuilding.yCnt}';
	var abnomalCnt ='${totalBuilding.nCnt}';
</script>
<div class="main w100p h93p">
    <div class="left">
        <div class="card">
            <div class="display-column wh100 gap04v">
                <div class="font-20 font-bold font-white">Building info</div>
                <div class="font-14 font-white">building suummary</div>
                <div class="display-row wh100">
                    <div class="sm-card display-column">
                        <div class="icon-total"></div>
                        <div class="font-20 font-white">${totalBuilding.totalCnt}</div>
                        <div class="font-14 font-white">Total Building</div>
                        <div class="font-10 font-orange">총 EV 주차장 수요 대상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_normal"></div>
                        <div class="font-20 font-white">${totalBuilding.yCnt}</div>
                        <div class="font-14 font-white">Normal Building</div>
                        <div class="font-10 font-normal">EV 주차장 수요 정상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">${totalBuilding.nCnt}</div>
                        <div class="font-14 font-white">Abnormal Building</div>
                        <div class="font-10 font-abnormal">EV 주차장 수요 비정상 건물 수</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card w100p">
            <div class="display-row-center w100p h20p">
                <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
                <div class="font-lightGray font-12">시 기준으로 집계</div>
            </div>
            <div class="display-row w100p h80p" id="code_code">
                <table class="table type1 wh100">
                    <colgroup>
                        <col width="5%">
                        <col width="20%">
                        <col width="20%">
                        <col width="45%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>지역</th>
                        <th>부적합/총</th>
                        <th>Popularity</th>
                        <th>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>01</td>
                        <td>제주시</td>
                        <td>${totalBuilding.jejuNCnt}/${totalBuilding.jujuCnt}</td>
                        <td>
                            <progress class="progress progress-orange" value="${totalBuilding.jejuNPercent}" min="0" max="100"></progress>
                        </td>
                        <td>
                            <div class="percent-orange-box w90p h70p font-12">${totalBuilding.jejuNPercent}%</div>
                        </td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>서귀포시</td>
                        <td>${totalBuilding.seogwipoNCnt}/${totalBuilding.seogwipoCnt}</td>
                        <td>
                            <progress class="progress progress-blue" value="${totalBuilding.seogwipoNPercent}" min="0" max="100"></progress>
                        </td>
                        <td>
                            <div class="percent-blue-box w90p h70p font-12">${totalBuilding.seogwipoNPercent}%</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card">
            <div class="display-row-center w100p h20p">
                <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 적합 현황</div>
                <div class="font-lightGray font-12">시 기준으로 집계</div>
            </div>
            <div class="display-row w100p h80p">
                <table class="table type1 wh100">
                    <colgroup>
                        <col width="5%">
                        <col width="20%">
                        <col width="20%">
                        <col width="45%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>지역</th>
                        <th>적합/총</th>
                        <th>Popularity</th>
                        <th>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>01</td>
                        <td>제주시</td>
                        <td>${totalBuilding.jejuYCnt}/${totalBuilding.jujuCnt}</td>
                        <td>
                            <progress class="progress progress-orange" value="${totalBuilding.jejuYPercent}" min="0" max="100"></progress>
                        </td>
                        <td>
                            <div class="percent-orange-box w90p h70p font-12">${totalBuilding.jejuYPercent}%</div>
                        </td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td>서귀포시</td>
                        <td>${totalBuilding.seogwipoYCnt}/${totalBuilding.seogwipoCnt}</td>
                        <td>
                            <progress class="progress progress-blue" value="${totalBuilding.seogwipoYPercent}" min="0" max="100"></progress>
                        </td>
                        <td>
                            <div class="percent-blue-box w90p h70p font-12">${totalBuilding.seogwipoYPercent}%</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card  display-row gap0" style="height: 16vw;">
            <div class="display-column w80p h100p">
                <div class="font-white font-18">EV 주차장 수요 대상 건물 적합/부적합</div>
                <div id="mainChart" class="chartdiv"></div>
            </div>
            <div class="display-column w20p gap03v">
                <div class="display-row gap0 wh100 text-right">
                    <div class="font-lightGray font-14 w45p">총 건물</div>
                    <div class="font-lightGray font-14 font-bold w55p">${totalBuilding.totalCnt} 대</div>
                </div>
                <div class="display-row gap0 wh100 text-right">
                    <div class="font-lightGray font-14 w45p">적합</div>
                    <div class="font-lightGray font-14 font-bold w55p">${totalBuilding.yCnt} 대</div>
                </div>
                <div class="display-row gap0 wh100 text-right">
                    <div class="font-lightGray font-14 w45p">부적합</div>
                    <div class="font-lightGray font-14 font-bold w55p ">${totalBuilding.nCnt} 대</div>
                </div>
            </div>
        </div>
    </div>
    <div class="line"></div>
    <div class="right">
        <div class="card">
            <div class="display-column wh100 gap04v">
                <div class="font-20 font-bold font-white">EV Charger Info</div>
                <div class="font-14 font-white">EV Charger suummary</div>
                <div class="display-row wh100">
                    <div class="sm-card display-column">
                        <div class="icon-total"></div>
                        <div class="font-20 font-white">${totalCharger.totalCharger}</div>
                        <div class="font-14 font-white">Total EV</div>
                        <div class="font-10 font-orange">총 EV 충전기 대수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_normal"></div>
                        <div class="font-20 font-white">${totalCharger.fastCharger}</div>
                        <div class="font-14 font-white">Total Fast EV</div>
                        <div class="font-10 font-normal">총 급속 EV 충전기 대수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_normal"></div>
                        <div class="font-20 font-white">${totalCharger.publicFastCharger}</div>
                        <div class="font-14 font-white">Public Fast EV</div>
                        <div class="font-10 font-abnormal">개방형 급속 EV 충전기 대수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_normal"></div>
                        <div class="font-20 font-white">${totalCharger.privateFastCharger}</div>
                        <div class="font-14 font-white">Private Fast EV</div>
                        <div class="font-10 font-abnormal">비개방형 급속 EV 충전기 대수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">${totalCharger.slowCharger}</div>
                        <div class="font-14 font-white">Total Slow EV</div>
                        <div class="font-10 font-abnormal">총 완속 EV 충전기 대수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">${totalCharger.publicSlowCharger}</div>
                        <div class="font-14 font-white">Public Slow EV</div>
                        <div class="font-10 font-abnormal">개방형 완속 EV 충전기 대수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">${totalCharger.privateSlowCharger}</div>
                        <div class="font-14 font-white">Private Slow EV</div>
                        <div class="font-10 font-abnormal">비개방형 완속 EV 충전기 대수</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group w100p gap1v">
            <div class="group-column wh100 gap15h">
                <div class="card h25p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">지역별 EV 충전기 고장 현황</div>
                        <div class="form-check form-check-inline ">
                            <input class="form-check-input" type="radio" name="bb" id="1" value="option1" checked>
                            <label class="form-check-label" for="1">전체</label>
                        </div>
                        <div class="form-check form-check-inline ">
                            <input class="form-check-input" type="radio" name="bb" id="2" value="option2">
                            <label class="form-check-label" for="2">급속</label>
                        </div>
                        <div class="form-check form-check-inline ">
                            <input class="form-check-input" type="radio" name="bb" id="3" value="option3">
                            <label class="form-check-label" for="3">완속</label>
                        </div>
                        <div class="font-lightGray font-12 ">시 기준으로 집계</div>
                    </div>
                    <div class="display-row w100p h80p" id="bb">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="20%">
                                <col width="45%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>지역</th>
                                <th>고장/총</th>
                                <th>Popularity</th>
                                <th>%</th>
                            </tr>
                            </thead>
                            <tbody id="aa">
                            <tr>
                                <td>01</td>
                                <td>제주시</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-orange" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-orange-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>제주시</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-blue" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-blue-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card h25p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">지역별 EV 충전기 미사용 현황</div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="22" id="4" value="option1" checked>
                            <label class="form-check-label" for="4">전체</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="22" id="5" value="option2">
                            <label class="form-check-label" for="5">급속</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="22" id="6" value="option3">
                            <label class="form-check-label" for="6">완속</label>
                        </div>
                        <div class="font-lightGray font-12">최근 3개월 미사용</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="20%">
                                <col width="45%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>지역</th>
                                <th>미사용/총</th>
                                <th>Popularity</th>
                                <th>%</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>제주시</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-orange" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-orange-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>제주시</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-blue" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-blue-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card h25p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">업체별 EV 충전기 미사용 현황</div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="33" id="7" value="option1" checked>
                            <label class="form-check-label" for="7">전체</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="33" id="8" value="option2">
                            <label class="form-check-label" for="8">급속</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="33" id="9" value="option3">
                            <label class="form-check-label" for="9">완속</label>
                        </div>
                        <div class="font-lightGray font-12">최근 3개월 미사용</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="20%">
                                <col width="45%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>업체명</th>
                                <th>미사용/총</th>
                                <th>Popularity</th>
                                <th>%</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>SK 시그넷</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-orange" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-orange-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>중앙제어</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-blue" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-blue-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card h25p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">업체별 EV 충전기 고장 현황</div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="44" id="10" value="option1" checked>
                            <label class="form-check-label" for="10">전체</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="44" id="11" value="option2">
                            <label class="form-check-label" for="11">급속</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="44" id="12" value="option3">
                            <label class="form-check-label" for="12">완속</label>
                        </div>
                        <div class="font-lightGray font-12">업체별 기준 집계</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="20%">
                                <col width="45%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>업체명</th>
                                <th>고장/총</th>
                                <th>Popularity</th>
                                <th>%</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>SK 시그넷</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-orange" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-orange-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>중앙제어</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-blue" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-blue-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="group-column wh100 gap15h">
                <div class="card h25p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">업체별 EV 충전기 설치 현황</div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="55" id="13" value="option1" checked>
                            <label class="form-check-label" for="13">전체</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="55" id="14" value="option2">
                            <label class="form-check-label" for="14">급속</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="55" id="15" value="option3">
                            <label class="form-check-label" for="15">완속</label>
                        </div>
                        <div class="font-lightGray font-12">시 기준으로 집계</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="20%">
                                <col width="20%">
                                <col width="45%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>업체</th>
                                <th>설치</th>
                                <th>Popularity</th>
                                <th>%</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>SK 시그넷</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-orange" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-orange-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>중앙제어</td>
                                <td>46/100</td>
                                <td>
                                    <progress class="progress progress-blue" value="46" min="0" max="100"></progress>
                                </td>
                                <td>
                                    <div class="percent-blue-box w90p h70p font-12">46%</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card h40p click" data-title="미사용 TOP EV 충전기"
                     data-code="001" data-toggle="modal" data-target="#table_popup">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">미사용 TOP EV 충전기</div>
                        <div class="font-lightGray font-12">미사용일은 금일 기준</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100 ">
                            <colgroup>
                                <col width="5%">
                                <col width="25%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="25%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>충전기명</th>
                                <th>지역</th>
                                <th>충전 구분</th>
                                <th>미사용일</th>
                                <th>마지막 사용일시</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card h40p click" data-title="고장 TOP EV 충전기"
                     data-code="002" data-toggle="modal" data-target="#table_popup">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">고장 TOP EV 충전기</div>
                        <div class="font-lightGray font-12">고장일은 금일 기준</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <div class="table-loading hidden">
                            <img src="/images/loading.gif" alt="로딩이미지" style="filter: invert(1);width: 3rem;height: 3rem;">
                        </div>
                        <table class="table type1 wh100" id="datatable">
                            <colgroup>
                                <col width="5%">
                                <col width="25%">
                                <col width="15%">
                                <col width="15%">
                                <col width="15%">
                                <col width="25%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>충전기명</th>
                                <th>지역</th>
                                <th>충전 구분</th>
                                <th>고장일</th>
                                <th>마지막 사용일시</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>별빛누리공원</td>
                                <td>제주시</td>
                                <td>급속</td>
                                <td>93일</td>
                                <td>2023-09-20 12:11:11</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
