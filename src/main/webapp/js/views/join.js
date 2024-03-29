

// 등록 체크
function fnDataValidation(){

	// validation
	if (!isId($('input[name=userId]').val())) {
		$('.userId').addClass("visibility-visible").text('* 영문자 또는 숫자'
			+ ' 6~20자를 입력해주세요');
		$(this).focus();
		return false;
	}

	if (!isPassword($('input[name=userPwd]').val())) {
		$('.userPwd').addClass("visibility-visible").text('* 8 ~ 16자 영문, 숫자 조합을'
			+ ' 입력해주세요.');
		$(this).focus();
		return false;
	}

	if ($('input[name=userPwd]').val() != $('input[name=userPwCheck]').val()) {
		$('.userPwCheck').addClass("visibility-visible").text('* 입력하신 비밀번호와 일치하지 않습니다.');
		$(this).focus();
		return false;
	}

	if (!isCorrect($('input[name=userName]').val())) {
		$('.userName').addClass("visibility-visible").text('* 한글만 입력만 입력해주세요');
		$(this).focus();
		return false;
	}

	if ($('input[name=userPhone]').val().length < 10) {
		$('.userPhone').addClass("visibility-visible").text('* 다시 확인하여 주세요.');
		$(this).focus();
		return false;
	}

	// 아이디 중복 체크
	$.ajax({
		type: "POST",
		url: "/selectUser.json",
		data: JSON.stringify({ userId: $('input[name=userId]').val() }),
		contentType: "application/json",
		processData: false,
		success: function (data, textStatus, jqXHR){
			// 등록된 아이디 false
			if (data.userId != null && data.userId != "") {
				$('.userId').addClass("visibility-visible").text('* 이미 등록된 아이디 입니다.');
				$('input[name=userId]').focus();

				return false;
			} else {
				var strData = $("#joinForm").serializeObject();

				fnInsert(strData);
			}
		},
		async: false
	});
	return false;
}

// 등록
function fnInsert(strData) {
	$.ajax({
		type: "POST",
		url: "/join.json",
		data: JSON.stringify(strData),
		contentType: "application/json",
		success: function (data, textStatus, jqXHR){
			if (data.result === "success") {
				MsgBox.Alert('join', function (){
					location.href = "<c:url value='/login.do'>" });
			} else {
				MsgBox.Alert();
			}
		},
		async: false
	});
}
