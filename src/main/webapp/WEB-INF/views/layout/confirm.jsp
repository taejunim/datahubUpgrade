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

<!-- Modal -->
<div class="modal" id="msg_popup" tabindex="-1" role="dialog">
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