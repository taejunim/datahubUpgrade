function openPassword(className) {
    $('input[name='+className+']').toggleClass('active');
    if ($('input[name='+className+']').hasClass('active') == true) {
        $(className).addClass('activeEyes');
        $('input[name='+className+']').attr('type','text');
    } else {
        $('input[name='+className+']').removeClass('activeEyes');
        $('input[name='+className+']').attr('type','password');
    }
}
$(document).ready(() => {

    $('#update_user').click(() => {
        let userPwdNow = $('input[name=userPwdNow]').val();
        let userPwd = $('input[name=userPwd]').val();
        let userPwCheck = $('input[name=userPwCheck]').val();
        var strData = $("#joinForm").serializeObject();
        if (!isStringValue(userPwdNow)) {
            alert("현재 비밀번호를 입력해주세요.");
            return false;
        }
        if (!isStringValue(userPwd) || !isStringValue(userPwCheck)) {
            alert("비밀번호 또는 비밀번호확인을 입력해주세요.");
            return false;
        }
        if(!pwdEq(userPwd,userPwCheck)) {
            alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
            return false;
        }
        if (pwdEq(userPwdNow,userPwd)) {
            alert("현재 비밀번호와 다르게 변경해주세요.")
            return false;
        }
        let isTrue = confirm("수정하시겠습니까?");
        console.log(isTrue);
        if (!isTrue) {
            console.log(isTrue);
            return false;
        }
        $.ajax({
            type: "POST",
            url: "/updateUser.json",
            data: JSON.stringify(strData),
            success: function (data){
                if (data.message === "success") {
                    alert("수정이 완료되었습니다.");
                    window.location.href = '/main.do';
                } else if (data.message === "not found"){
                    alert("현재 비밀번호가 다릅니다. 다시 입력해 주세요.");
                } else {
                    alert("수정이 완료되지 않았습니다. 잠시 후 다시 시도해주세요.");
                }
            },
            async: false
        });
    })
})
function pwdEq(pwd,pwdCheck) {
    if (pwd != pwdCheck) {
        return false;
    }
    return true;
}
function isStringValue(val) {
    return !!val?.trim()
}