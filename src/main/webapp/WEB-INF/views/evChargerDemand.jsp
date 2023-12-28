<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:49 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<div class="innerWrap wh100">
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
                    <div class="input-group w100p">
                        <div class="selectBox w45p">
                            <div class="input-group-prepend w40p">
                                <label  class="input-group-text" for="">시</label>
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
                            <div class="input-group-prepend w40p">
                                <label  class="input-group-text" for="">읍면동</label>
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
                    <div class="input-group w100p">
                        <div class="selectBox w100p">
                            <div class="input-group-prepend w40p">
                                <label  class="input-group-text" for="">적합/부적합</label>
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
                    <div class="input-group w100p">
                        <div class="input-group w45p">
                            <input type="text" name="schStartDt" id="schStartDt" class="dateTime datepickerStart w100p calendar"
                                   placeholder="날짜" readonly>
                        </div>
                        <span class="font-32 font-white">~</span>
                        <div class="input-group w45p">
                            <input type="text" name="schStartDt" id="schEndDt" class="dateTime datepickerEnd w100p calendar"
                                   placeholder="날짜" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttonFrame w20p h100p font-white">
                <button type="button" class="btn btn-black w40p h50p">초기화</button>
                <button type="button" class="btn btn-black w40p h50p">검색</button>
            </div>
        </div>
    </div>
    <table id="datatable" class="frame h77p type1"> </table>
</div>