<%--
  Created by IntelliJ IDEA.
  User: jimang
  Date: 12/26/23
  Time: 11:49 오전
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/tags.jspf"%>
<c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}" />

<!-- 알림창 -->
<div class="modal" id="msg_popup" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="text-align: center;"></div>
            <div class="modal-footer custom-footer" id="btn_confirm">
                <button type="button" id="confirm_yes" class="btn btn-theme" data-dismiss="modal" >확인</button>
                <button type="button" id="confirm_no"class="btn btn-default" data-dismiss="modal">취소</button>
            </div>
            <div class="modal-footer custom-footer" id="btn_alert">
                <button type="button" id="alert_ok"class="btn btn-theme" data-dismiss="modal" >확인</button>
            </div>
        </div>
    </div>
</div>

<!-- 메인 - 테이블창 -->
<div class="modal" id="table_popup" tabindex="-2" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="text-align: center;height: 60vh;">
                <div class="font-14 pd1rme text-right font-gray"><span class="font-14" id="codeText"></span>은 금일 기준</div>
                <table class="table type1 wh100 datatable"></table>
            </div>
            <div class="modal-footer custom-footer">
                <button type="button" class="btn btn-theme excelBtn" id="excelBtn"></button>
                <button type="button" class="btn btn-default" data-dismiss="modal" >확인</button>
            </div>
        </div>
    </div>
</div>
