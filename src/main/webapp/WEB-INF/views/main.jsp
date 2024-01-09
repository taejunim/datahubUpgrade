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

<div class="main wh100">
    <div class="left">
        <div class="card h22p">
            <div class="display-column wh100 gap04v">
                <div class="font-20 font-bold font-white">Building info</div>
                <div class="font-14 font-white">building suummary</div>
                <div class="display-row wh100">
                    <div class="sm-card display-column">
                        <div class="icon-total"></div>
                        <div class="font-20 font-white"><c:out value="${buildingInfo.totalBuilding}"/></div>
                        <div class="font-14 font-white">Total Building</div>
                        <div class="font-10 font-orange">총 EV 주차장 수요 대상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_normal"></div>
                        <div class="font-20 font-white"><c:out value="${buildingInfo.normalBuilding}"/></div>
                        <div class="font-14 font-white">Normal Building</div>
                        <div class="font-10 font-normal">EV 주차장 수요 정상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white"><c:out value="${buildingInfo.abnormalBuilding}"/></div>
                        <div class="font-14 font-white">Abnormal Building</div>
                        <div class="font-10 font-abnormal">EV 주차장 수요 비정상 건물 수</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card h20p w100p">
            <div class="display-row-center w100p h20p">
                <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
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
                        <th>부적합/총</th>
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
                            <progress class="w90p h15p progress-orange" value="50" min="0" max="100"></progress>
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
                            <progress class="w90p h15p progress-blue" value="20" min="0" max="100"></progress>
                        </td>
                        <td>
                            <div class="percent-blue-box w90p h70p font-12">46%</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card h20p">
            <div class="display-row-center w100p h20p">
                <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
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
                        <th>부적합/총</th>
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
                            <progress class="w90p h15p progress-orange" value="50" min="0" max="100"></progress>
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
                            <progress class="w90p h15p progress-blue" value="20" min="0" max="100"></progress>
                        </td>
                        <td>
                            <div class="percent-blue-box w90p h70p font-12">46%</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card h28p display-row gap0">
            <div class="display-column w80p" style="height: 100%">
                <div class="font-white font-18">EV 주차장 수요 대상 건물 적합/부적합</div>
                <div id="mainChart" class="chartdiv"></div><%--차트영역--%>
            </div>
            <div class="display-column w20p gap03v">
                <div class="display-row gap0 wh100 text-right">
                    <div class="font-lightGray font-14 w40p">총 건물</div>
                    <div class="font-lightGray font-14 font-bold w60p">7000 대</div>
                </div>
                <div class="display-row gap0 wh100 text-right">
                    <div class="font-lightGray font-14 w40p">적합</div>
                    <div class="font-lightGray font-14 font-bold w60p">4000 대</div>
                </div>
                <div class="display-row gap0 wh100 text-right">
                    <div class="font-lightGray font-14 w40p">부적합</div>
                    <div class="font-lightGray font-14 font-bold w60p ">3000 대</div>
                </div>
            </div>
        </div>
    </div>
    <div class="line"></div>
    <div class="right">
        <div class="card h22p">
            <div class="display-column wh100 gap04v">
                <div class="font-20 font-bold font-white">EV Charger Info</div>
                <div class="font-14 font-white">EV Charger suummary</div>
                <div class="display-row wh100">
                    <div class="sm-card display-column">
                        <div class="icon-total"></div>
                        <div class="font-20 font-white">1,100</div>
                        <div class="font-14 font-white">Total Building</div>
                        <div class="font-10 font-orange">총 EV 주차장 수요 대상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_normal"></div>
                        <div class="font-20 font-white">891</div>
                        <div class="font-14 font-white">Normal Building</div>
                        <div class="font-10 font-normal">EV 주차장 수요 정상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">109</div>
                        <div class="font-14 font-white">Abnormal Building</div>
                        <div class="font-10 font-abnormal">EV 주차장 수요 비정상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">109</div>
                        <div class="font-14 font-white">Abnormal Building</div>
                        <div class="font-10 font-abnormal">EV 주차장 수요 비정상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">109</div>
                        <div class="font-14 font-white">Abnormal Building</div>
                        <div class="font-10 font-abnormal">EV 주차장 수요 비정상 건물 수</div>
                    </div>
                    <div class="sm-card display-column">
                        <div class="icon_abnormal"></div>
                        <div class="font-20 font-white">109</div>
                        <div class="font-14 font-white">Abnormal Building</div>
                        <div class="font-10 font-abnormal">EV 주차장 수요 비정상 건물 수</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group w100p h73p gap1v">
            <div class="group-column wh100 gap15h">
                <div class="card h25p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
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
                                <th>부적합/총</th>
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
                                    <progress class="w90p h15p progress-orange" value="50" min="0" max="100"></progress>
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
                                    <progress class="w90p h15p progress-blue" value="20" min="0" max="100"></progress>
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
                        <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
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
                                <th>부적합/총</th>
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
                                    <progress class="w90p h15p progress-orange" value="50" min="0" max="100"></progress>
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
                                    <progress class="w90p h15p progress-blue" value="20" min="0" max="100"></progress>
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
                        <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
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
                                <th>부적합/총</th>
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
                                    <progress class="w90p h15p progress-orange" value="50" min="0" max="100"></progress>
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
                                    <progress class="w90p h15p progress-blue" value="20" min="0" max="100"></progress>
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
                        <div class="font-white font-18">지역별 EV 주차장 수요 대상 건물 부적합 현황</div>
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
                                <th>부적합/총</th>
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
                                    <progress class="w90p h15p progress-orange" value="50" min="0" max="100"></progress>
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
                                    <progress class="w90p h15p progress-blue" value="20" min="0" max="100"></progress>
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
                <div class="card h50p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">미사용 TOP EV 충전기</div>
                        <div class="font-lightGray font-12">미사용일은 금일 기준</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="25%">
                                <col width="15%">
                                <col width="10%">
                                <col width="15%">
                                <col width="30%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>충전기명</th>
                                <th>지역</th>
                                <th>구분</th>
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
                <div class="card h50p">
                    <div class="display-row-center w100p h20p">
                        <div class="font-white font-18">미사용 TOP EV 충전기</div>
                        <div class="font-lightGray font-12">미사용일은 금일 기준</div>
                    </div>
                    <div class="display-row w100p h80p">
                        <table class="table type1 wh100">
                            <colgroup>
                                <col width="5%">
                                <col width="25%">
                                <col width="15%">
                                <col width="10%">
                                <col width="15%">
                                <col width="30%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>충전기명</th>
                                <th>지역</th>
                                <th>구분</th>
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
            </div>
        </div>
    </div>
</div>