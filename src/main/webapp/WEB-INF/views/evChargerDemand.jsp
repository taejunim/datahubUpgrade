<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:49 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<div class="columnWrap w100p h95p">
    <div class="frame h6p">
        <div class="title wh100">
            <div class="font-white font-16">주차장 수요 대상 건물</div>
            <div class="font-gray font-12">EV 주차장 수 적합/부적합</div>
        </div>
    </div>
    <div class="frame h13p">
        <div class="wh100">
            <div class="searchFrame w80p h100p">
                <div class="w40p">
                    <label class="">지역</label>
                    <div class="group w100p">
                        <div class="selectBox w45p">
                            <div class="group-prepend w40p">
                                <label  class="group-text" for="">시</label>
                            </div>
                            <div class="w60p">
                                <select  class="form-control" data-minimum-results-for-search="Infinity">
                                    <option>전체</option>
                                    <option>제주시</option>
                                    <option>서귀포시</option>
                                </select>
                            </div>
                        </div>
                        <div class="selectBox w45p">
                            <div class="group-prepend w40p">
                                <label  class="group-text" for="">읍면동</label>
                            </div>
                            <div class="w60p">
                                <select class="form-control" data-minimum-results-for-search="Infinity">
                                    <option>전체</option>
                                    <option>동홍동</option>
                                    <option>이도이동</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w20p">
                    <label class="">적합 판단</label>
                    <div class="group w100p">
                        <div class="selectBox w100p">
                            <div class="group-prepend w40p">
                                <label  class="group-text" for="">적합/부적합</label>
                            </div>
                            <div class="w60p">
                                <select  class="form-control" data-minimum-results-for-search="Infinity">
                                    <option>전체</option>
                                    <option>적합</option>
                                    <option>부적합</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w30p">
                    <label class="">건축허가일</label>
                    <div class="group w100p">
                        <div class="group w45p">
                            <input type="text" name="" id="" class="dateTime datepickerStart w100p icon_calendar"
                                   placeholder="날짜" readonly>
                        </div>
                        <span class="font-32 font-white">~</span>
                        <div class="group w45p">
                            <input type="text" name="" id="" class="dateTime datepickerEnd w100p icon_calendar"
                                   placeholder="날짜" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttonFrame w20p h100p font-white">
                <button type="button" class="btn-black w40p h50p" data-toggle="modal" data-target="#exampleModalCenter">초기화</button>
                <button type="button" class="btn-black w40p h50p" data-toggle="modal" data-target=".modal">검색</button>
            </div>
        </div>
    </div>
    <div class="frame h78p display-column">
        <table id="datatable" class="table type2 w95p">
            <colgroup>
                <col width="20%">
                <col width="15%">
                <col width="15%">
                <col width="10%">
                <col width="10%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>건물 명</th>
                <th>적합 판단</th>
                <th>지역</th>
                <th>주용도</th>
                <th>구분</th>
                <th>건축허가일</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-green">적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            <tr>
                <td>산학융합원</td>
                <td>
                    <div class="">
                        <div class="judgment-box font-red">부적합</div>
                    </div>
                </td>
                <td>제주시</td>
                <td>공동주택(아파트)</td>
                <td>공공</td>
                <td>2023-09-20</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- Modal -->
<div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog demand-modal" role="document">
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
                            <col width="20%">
                            <col width="10%">
                            <col width="15%">
                        </colgroup>
                        <tr>
                            <th>건물 명</th>
                            <td colspan="3">제주산학융합지구 제2동 기업연구관</td>
                            <th>도로명 주소</th>
                            <td>제주특별자치도 제주시 첨단로8길40</td>
                            <th>허가일</th>
                            <td>2018-04-11</td>
                        </tr>
                        <tr>
                            <th>주용도</th>
                            <td>공장</td>
                            <th>구분</th>
                            <td>공공</td>
                            <th>층수</th>
                            <td>지하 1층, 지상 3층</td>
                            <th>시설 면적</th>
                            <td>3,264.15㎡</td>
                        </tr>
                        <tr>
                            <th>대지 면적</th>
                            <td>-</td>
                            <th>건물 면적</th>
                            <td>1,100.49㎡</td>
                            <th>주차면</th>
                            <td>51</td>
                            <th>EV 충전기(설치/기준)</th>
                            <td>
                                <div class="display-row">
                                    <div class="">1/3</div>
                                    <div class="judgment-box font-red">부적합</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>산정법</th>
                            <td colspan="7">
                                ✓건축물 용도에 따른 주차장 설치 대수 산정은 건축 주용도가 공장 일때, 시설 면적 350㎡ 당 1대를 기준으로 산정한다.<br>
                                ✗친환경자동차법 따라 주차단위구획 총수를 기준으로 50면수 이상인 신축건물은 총 주차면수의 5% 이상, 기축건물(법 시행일 이전 건축허가를 받은 시설)은<br>
                                2% 이상의 전기차 충전기를 설치해야 한다.
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="h60p w100p">
                    <div class="content-box display-column gap04v">
                        <div class="">건축물 지도 정보</div>
                        <div class="display-row w100p">
                            <div class="icon_eyes w45p h50vh"></div>
                            <div class="icon_eyes w45p h50vh"></div>
                        </div>
                    </div>
                </div>
                <div class="h15p w100p">
                    <div class="content-box">건축물 상세정보</div>
                </div>

            </div>
        </div>
    </div>
</div>
