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

	if (userId === "" || userPwd === "") {
		MsgBox.Alert('');
		return false;
	}

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
				MsgBox.Alert('loginFail', function (){
					location.href = "<c:url value='/login.do'>" });
			} else {
				window.location.href = '/main.do';
			}
		})
}

