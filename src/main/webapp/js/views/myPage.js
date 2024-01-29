function openPassword(className,className1) {
    $('input[name='+className+']').toggleClass('active');
    if ($('input[name='+className+']').hasClass('active') == true) {
        $('.'+className1).addClass('activeEyes');
        $('input[name='+className+']').attr('type','text');
    } else {
        $('.'+className1).removeClass('activeEyes');
        $('input[name='+className+']').attr('type','password');
    }
}
$(document).ready(() => {

    $('#update_user').click(() => {
        let userPwdNow = $('input[name=userPwdNow]').val();
        let userPwd = $('input[name=userPwd]').val();
        let userPwCheck = $('input[name=userPwCheck]').val();
        var strData = $("#joinForm").serializeObject();
        // validation
        if (!isStringValue(userPwdNow)) {
            $('.userPwdNow').addClass("visibility-visible").text('* 현재 비밀번호를 입력해주세요.');
            $(this).focus();
            return false;
        }
        if (isStringValue($('input[name=userPwd]').val()) || isStringValue($('input[name=userPwCheck]').val())) {
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
            if (pwdEq(userPwdNow,userPwd)) {
                $('.userPwd').addClass("visibility-visible").text('* 현재 비밀번호와 다르게 입력해주세요.');
                $(this).focus();
                return false;
            }
        }
        MsgBox.Confirm("updateAsk", () => {
            $.ajax({
                type: "POST",
                url: "/updateUser.json",
                data: JSON.stringify(strData),
                contentType: "application/json",
                success: function (data){
                    if (data.message === "success") {
                        MsgBox.Alert("update",
                            () => window.location.href = '/main.do');
                    } else if (data.message === "not found"){
                        $('.userPwdNow').addClass("visibility-visible").text('* 비밀번호가 일치하지 않습니다.');
                        $(this).focus();
                        return false;
                    } else {
                        MsgBox.Alert("error");
                    }
                },
                async: false
            })
        },false);
    })
    $('#delete_user').click(() => {
        let userPwdNow = $('input[name=userPwdNow]').val();
        var strData = $("#joinForm").serializeObject();
        if (!isStringValue(userPwdNow)) {
            $('.userPwdNow').addClass("visibility-visible").text('* 현재 비밀번호를 입력해주세요.');
            $(this).focus();
            return false;
        }
        MsgBox.Confirm("deleteAsk",() => {
            $.ajax({
                type: "POST",
                url: "/deleteUser.json",
                data: JSON.stringify(strData),
                contentType: "application/json",
                success: function (data){
                    console.log("data : " + data);
                    if (data.message === "success") {
                        MsgBox.Alert("delete",
                            () => window.location.href = '/main.do');
                    } else if (data.message === "not found"){
                        $('.userPwdNow').addClass("visibility-visible").text('* 비밀번호가 일치하지 않습니다.');
                    } else {
                        MsgBox.Alert("error");
                    }
                },
                async: false
            })
        },false);
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