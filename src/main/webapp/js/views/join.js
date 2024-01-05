function login() {
	let userId = document.getElementById('userId').value;
	let userPwd = document.getElementById('userPwd').value;
	let userName = document.getElementById('userName').value;
	let userBirth = document.getElementById('userBirth').value;
	let userPhone = document.getElementById('userPhone').value;

	fetch('/join.mng',{
		method : "POST",
		headers : {
			"Content-Type": "application/json",
		},
		body : JSON.stringify({
			userId : userId,
			userPwd : userPwd,
			userName : userName,
			userBirth : userBirth,
			userPhone : userPhone
		}),
	})
	.then((data) => console.log(data))
	.then(window.location.href = '/login.do')
}

