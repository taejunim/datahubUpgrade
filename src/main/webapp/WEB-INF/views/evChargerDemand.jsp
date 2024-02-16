<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:49 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<link rel="stylesheet" href="<c:url value='/css/plugins/openlayer/ol.css' />">
<script src="<c:url value='/js/plugins/openlayer/ol.js'/>"></script>
<script src="<c:url value='/js/plugins/openlayer/proj4.js'/>"></script>
<script src="<c:url value='/js/plugins/openlayer/DatahubMapObject.js'/>"></script>
<script type="text/javascript" src="/js/views/evChargerDemand.js"></script>
<div class="columnWrap">
    <div class="frame h6p">
        <div class="title wh100">
            <div class="font-white font-18">주차장 수요 대상 건물</div>
            <div class="font-gray font-12">EV 주차장 수 적합/부적합</div>
        </div>
    </div>
    <div class="frame h10p">
        <div class="wh100">
            <div class="searchFrame w80p h100p">
                <div class="w20p">
                    <label class="">지역</label>
                    <div class="group w80p">
                        <div class="selectBox w100p">
                            <div class="group-prepend w40p">
                                <label  class="group-text" for="">시</label>
                            </div>
                            <div class="w60p">
                                <select id="searchRegion" class="form-control" >
                                    <option value="">전체</option>
                                    <option value="01">제주시</option>
                                    <option value="02">서귀포시</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w20p">
                    <label class="">주용도</label>
                    <div class="group w80p">
                        <div class="selectBox w100p">
                            <div class="group-prepend w40p">
                                <label  class="group-text" for="">건물 용도</label>
                            </div>
                            <div class="w60p">
                                <select id="searchBuildingPurposeCode" class="form-control">
                                    <option value="">전체</option>
                                    <option value="02000">공동주택</option>
                                    <option value="10000">교육연구시설</option>
                                    <option value="14000">업무시설</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w20p">
                    <label class="">적합 판단</label>
                    <div class="group w80p">
                        <div class="selectBox w100p">
                            <div class="group-prepend w40p">
                                <label  class="group-text" for="">적합/부적합</label>
                            </div>
                            <div class="w60p">
                                <select id="searchSuitability" class="form-control">
                                    <option value="">전체</option>
                                    <option value="Y">적합</option>
                                    <option value="N">부적합</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w30p">
                    <label class="">건축허가일</label>
                    <div class="group w80p">
                        <div class="group w45p">
                            <input type="text" name="searchPermissionDateFrom" id="searchPermissionDateFrom" class="dateTime datepickerStart w100p icon_calendar"
                                   placeholder="날짜" readonly>
                        </div>
                        <span class="font-32 font-white">~</span>
                        <div class="group w45p">
                            <input type="text" name="searchPermissionDateTo" id="searchPermissionDateTo" class="dateTime datepickerEnd w100p icon_calendar"
                                   placeholder="날짜" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttonFrame w20p h100p font-white gap1rem">
                <button type="button" class="btn-black w40p h60p font-18" data-toggle="modal" data-target="#exampleModalCenter" onclick="history.go(0);">초기화</button>
                <button type="button" class="btn-black w40p h60p font-18" id="searchButton">검색</button>
                <button type="button" class="btn-black w40p h60p font-18" id="excelBtn"></button>
            </div>
        </div>
    </div>
    <div class="h80p w100p">
        <table id="dataTable" class="table type2 w100p"> </table>
    </div>
</div>

<!-- Modal -->
<div id="buildingDetail" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Parking Lot Demand Detail Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body display-column gap05v">
                <div class="h15p w100p">
                    <div class="content-box">건축물 상세정보</div>
                </div>
                <div class="h30p w100p">
                    <table class="table type3">
                        <colgroup>
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                            <col width="10%">
                            <col width="15%">
                            <col width="25%">
                            <col width="10%">
                            <col width="10%">
                        </colgroup>
                        <tr>
                            <th>건물 명</th>
                            <td colspan="3" id="buildingName">-</td>
                            <th>주소(지번)</th>
                            <td id="address">-</td>
                            <th>건축주</th>
                            <td>-</td>
                        </tr>
                        <tr>
                            <th>건축 허가일</th>
                            <td colspan="3" id="permissionDate">-</td>
                            <th>건축 준공일</th>
                            <td id="completionDate">-</td>
                            <th>층수</th>
                            <td id="floors">-</td>
                        </tr>
                        <tr>
                            <th>구분</th>
                            <td id="buildingTypeName">-</td>
                            <th>주용도</th>
                            <td id="buildingPurposeName">-</td>
                            <th>건물 면적</th>
                            <td id="buildingArea">- ㎡</td>
                            <th>시설 면적</th>
                            <td id="totalArea">- ㎡</td>
                        </tr>
                        <tr>
                            <th>대지 면적</th>
                            <td id="platArea">- ㎡</td>
                            <th>설치 EV 충전기</th>
                            <td id="chargerCount">-</td>
                            <th>EV 충전기(설치/기준)</th>
                            <td>
                                <div class="display-row">
                                    <div class="" id="chargerStandard">-</div>
                                    <div class="judgment-box font-red" id="suitability">부적합</div>
                                </div>
                            </td>
                            <th>주차면</th>
                            <td id="parkingCount">-</td>
                        </tr>
                        <tr>
                            <th>산정법</th>
                            <td colspan="7">
                                <span class="font-green" id="areaStandard">✓</span>건축물 용도에 따른 주차장 설치 대수 산정은 건축 주용도가 공장 일때, 시설 면적 350㎡ 당 1대를 기준으로 산정한다.<br>
                                <span class="font-green" id="fastChargerStandard">✓</span>전기차 충전기 설치 기준이 2대 이상이면 급속 1대를 필수로 설치한다.(설치 기준이 1대 일 경우 급속/완속 구분없이 설치 가능)<br>
                                <span class="font-red" id="parkingCountStandard">✗</span>친환경자동차법 따라 주차단위구획 총수를 기준으로 50면수 이상인 신축건물은 총 주차면수의 5% 이상, 기축건물(법 시행일 이전 건축허가를 받은 시설)은<br>
                                2% 이상의 전기차 충전기를 설치해야 한다.
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="h60p w100p">
                    <div class="content-box display-column gap04v">
                        <div class="">건축물 지도 정보</div>
                        <div class="display-row w100p">
                            <div class="w45p h22rem" id="vMap"></div>
                            <div class="w45p h22rem" id="vMap3d"></div>
                        </div>
                    </div>
                </div>
                <div class="h15p w100p">
                    <div class="content-box">건축물 충전기 정보</div>
                    <div class="h30p w100p">
                        <table class="table type3" id="chargerTable">
                            <thead>
                                <tr>
                                    <th>충전기 명</th>
                                    <th>충전 구분</th>
                                    <th>개방 구분</th>
                                    <th>업체</th>
                                    <th>상태</th>
                                    <th>최근 사용일</th>
                                    <!-- 추가적인 컬럼들 -->
                                </tr>
                            </thead>
                            <tbody>
                            <!-- 여기에 동적으로 추가될 행들 -->
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
