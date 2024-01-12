var rememberChecked = $("input:checkbox[id=saveID]:checked").val();
$(document).ready(function () {
	rememberChecked = 'N'
	$('#saveID').change(function () {
		if ($('#saveID').is(":checked")) {
			rememberChecked = 'Y'
			console.log(rememberChecked);
		} else {
			rememberChecked = 'N'
			console.log(rememberChecked);
			alert("체크박스 해제");
		}
	})

	window.onkeydown = (e) => {
			if (e.code == 'Enter') {
				login();
			}
		}

})

function login() {
	var userId = document.getElementById('userId').value;
	var userPwd = document.getElementById('userPwd').value;

	const params = JSON.stringify({
		"userId" : userId,
		"userPwd" : userPwd,
		"saveId" : rememberChecked
	})

	fetch('/userLogin.mng',{
		method : "POST",
		headers : {
			"Content-Type": "application/json",
		},
		body : params,
	})
	.then((data) => data.text())
	.then((data) => {
		if (data == "EMPTY USER") {
			alert('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.')
			window.location.href = '/login.do';
		} else {
			window.location.href = '/main.do';
		}
	})
}

