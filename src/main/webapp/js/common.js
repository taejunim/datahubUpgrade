var status = false;

window.onbeforeunload = function () {
  fnStartLoadingBar();
};

$(window).on('load', function () {
  status = true;
  fnEndLoadingBar();
});

$(window).bind('pageshow', function (event) {
  if(status) {
    fnEndLoadingBar();
  }
});

$(document).ready(function() {
  // jquery 확장
  jQuery.fn.serializeObject = function() {
    var obj = null;

    try {
      // this[0].tagName이 form tag일 경우
      if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
        var arr = this.serializeArray();

        if(arr){
          obj = {};
          jQuery.each(arr, function() {

            // obj의 key값은 arr의 name, obj의 value는 value값
            obj[this.name] = this.value;

          });
        }
      }
    }catch(e) {
      console.log(e.message);
    }finally  {}
    return obj;
  };

  /*************************************
   *             Date Picker            *
   *************************************/
  $(function () {
    jQuery.datetimepicker.setLocale('kr');
    // 년월일 날짜달력
    $('.datepickerStart').datetimepicker({
      format: 'Y.m.d',
      lang: 'kr',
      defaultDate:new Date(),
      onShow: function (ct) {
        this.setOptions({
          maxDate: $('.datepickerEnd').val() ? $('.datepickerEnd').val() : new Date(),
        })
      },
      timepicker: false,
      scrollMonth  : false,
    });
    $('.datepickerEnd').datetimepicker({
      format: 'Y.m.d',
      lang: 'kr',
      defaultDate:new Date(),
      onShow: function (ct) {
        this.setOptions({
          minDate: $('.datepickerStart').val() ? $('.datepickerStart').val() : false,
          maxDate: new Date()
        })
      },
      timepicker: false,
      scrollMonth  : false,
    });

    // 년월일 시분 달력
    $('.datetimepickerStart').datetimepicker({
      format: 'Y.m.d H:i',
      lang: 'kr',
      onShow: function (ct) {
        this.setOptions({
          maxDate: $('.datetimepickerEnd').val() ? $('.datetimepickerEnd').val() : false
        })
      },
      timepicker: true,
      scrollMonth  : false,
    });
    $('.datetimepickerEnd').datetimepicker({
      format: 'Y.m.d H:i',
      inline: false,
      lang: 'kr',
      onShow: function (ct) {
        this.setOptions({
          minDate: $('.datetimepickerStart').val()  ? $('.datetimepickerStart').val() : false
        })
      },
      timepicker: true,
      scrollMonth  : false,
    });
  });

  $(function () {
    // 필수값 미입력시 표출 문구 선택시 제거
    $("input").click(function () {
      $('.req').removeClass("visibility-visible");
    });
  });
});

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/**
 * javascript SimpleDateFormat 함수
 * ex)
 * new Date().format("yyyy-MM-dd");
 * new Date().format("yyyy-MM-dd HH:mm:ss");
 * new Date().format("yyyy-MM-dd a/p hh:mm:ss");
 */
Date.prototype.format = function(f) {
  if (!this.valueOf()) return " ";

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
    switch ($1) {
      case "yyyy": return d.getFullYear();
      case "yy": return (d.getFullYear() % 1000).zf(2);
      case "MM": return (d.getMonth() + 1).zf(2);
      case "dd": return d.getDate().zf(2);
      case "E": return weekName[d.getDay()];
      case "HH": return d.getHours().zf(2);
      case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm": return d.getMinutes().zf(2);
      case "ss": return d.getSeconds().zf(2);
      case "a/p": return d.getHours() < 12 ? "오전" : "오후";
      default: return $1;
    }
  });
};

// 화면 로딩 시작
function fnStartLoadingBar() {
  $('.wrap-loading').removeClass('hidden');
}

// 화면 로딩 종료
function fnEndLoadingBar() {
  $('.wrap-loading').addClass('hidden');
}

// 테이블 로딩 시작
function fnTableStartLoadingBar(id) {
  $('#' + id + ' table').addClass('hidden');
  $('#' + id + ' .table-loading').removeClass('hidden');
}

// 테이블 로딩 종료
function fnTableEndLoadingBar(id) {
  $('#' + id + ' table').removeClass('hidden');
  $('#' + id + ' .table-loading').addClass('hidden');
}

// 아이디 체크 -- 영문자로 시작하는 영문자 또는 숫자 6~20자
function isId(asValue) {
  var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;

  return regExp.test(asValue);
}

// 비밀번호 체크 (특수문자 미포함) -- 8 ~ 16자 영문, 숫자 조합
function isPassword(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

  return regExp.test(asValue);
}

// 한글 체크 -- 한글만 입력
function isCorrect(asValue) {
  var regExp = /[ㄱ-힣]/;

  return regExp.test(asValue);
}

//전화번호 - 넣기
function formatPhone(obj) {
  var str = obj.replace(/[^0-9]/g, '');
  var tmp = "";

  if (str.substring(0, 2) == "02") {
    if (str.length < 3) {
      return str;
    } else if (str.length < 6) {
      tmp += str.substr(0, 2);
      tmp += '-';
      tmp += str.substr(2);
      return tmp;
    } else if (str.length < 10) {
      tmp += str.substr(0, 2);
      tmp += '-';
      tmp += str.substr(2, 3);
      tmp += '-';
      tmp += str.substr(5);
      return tmp;
    } else {
      tmp += str.substr(0, 2);
      tmp += '-';
      tmp += str.substr(2, 4);
      tmp += '-';
      tmp += str.substr(6, 4);
      return tmp;
    }
  } else {
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);
      return tmp;
    }
  }
}

/**
 * 알림창 -- ex) MsgBox.Confirm('등록', function (){callback})
 * @type {{Confirm: MsgBox.Confirm, Alert: MsgBox.Alert}}
 */
var MsgBox = {
  /* Alert */
  Alert: function(msg, okhandler) {
    let map = fnMsgBoxSet(msg);

    new Promise((resolve, reject) => {
      $("#msg_popup #btn_confirm").hide();
      $("#msg_popup #btn_alert").show();

      $("#msg_popup #alert_ok").unbind();
      $("#msg_popup .modal-title").html(map.get('title'));
      $("#msg_popup .modal-body").html(map.get('txt'));
      $('#msg_popup').modal('show');

      $("#msg_popup #alert_ok").click(function() {
        $('#msg_popup').modal('hide');
      });

      $("#msg_popup").on("hidden.bs.modal", function(e) {
        e.stopPropagation();
        if(okhandler != null) resolve();
        else reject();
      });
    }).then(okhandler).catch(function() {});
  },

  /* Confirm */
  Confirm: function(msg, yeshandler, nohandler) {
    let map = fnMsgBoxSet(msg);

    new Promise((resolve, reject) => {
      var flag = false;
      $("#msg_popup #btn_alert").hide();
      $("#msg_popup #btn_confirm").show();

      $("#msg_popup #confirm_yes").unbind();
      $("#msg_popup #confirm_no").unbind();
      $("#msg_popup .modal-title").html(map.get('title'));
      $("#msg_popup .modal-body").html(map.get('txt'));
      $('#msg_popup').modal('show');

      $('#msg_popup').on('keypress', function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13') {
          flag = true;
          $('#msg_popup').modal('hide');
        }
      });

      $("#msg_popup #confirm_yes").click(function() {
        flag = true;
      });
      $("#msg_popup #confirm_no").click(function() {
        flag = false;
      });

      $("#msg_popup").on("hidden.bs.modal", function(e) {
        e.stopPropagation();
        if(yeshandler != null && flag == true) resolve(1);
        else if(nohandler != null && flag == false) resolve(2);
        else reject();
      });

    }).then(function(value) {
      if(value == 1)      yeshandler();
      else if(value == 2) nohandler();
    }).catch(function() {});
  },
}

/**
 * type 별로 알림 텍스트 세팅
 * @param type
 */
function fnMsgBoxSet(type){
  let map = new Map();
  let title = "";
  let txt = "";

  switch (type) {
    case "insertAsk" : title = "등록"; txt = "등록 하시겠습니까?"; break;
    case "updateAsk" : title = "수정"; txt = "수정 하시겠습니까?"; break;
    case "deleteAsk" : title = "삭제"; txt = "삭제 하시겠습니까?"; break;
    case "insert" : title = "등록"; txt = "등록 되었습니다."; break;
    case "update" : title = "수정"; txt = "수정 되었습니다."; break;
    case "delete" : title = "삭제"; txt = "삭제 되었습니다."; break;
    case "singout" : title = "로그아웃"; txt = "로그아웃 하시겠습니까?"; break;
    case "session" : title = "이동"; txt = "세션이 만료되었습니다. 로그인페이지로 이동합니다."; break;
    case "error" : title = "문제 발생"; txt = "문제가 발생했습니다. 다시 시도해주세요."; break;
    case "join" : title = "가입 완료"; txt = "가입 완료되었습니다. 로그인해주세요"; break;
    case "loginFail" : title = "로그인 실패"; txt = "등록되지 않은 아이디이거나 <br/>아이디 또는 비밀번호를 잘못 입력했습니다."; break;
    case "polygon" : title = "데이터 확인"; txt = "폴리곤 데이터가 없습니다. 데이터를 다시 확인해주세요."; break;
    case "chargerApi" : title = "API 응답 실패"; txt = "충전기 상태 API 조회에 실패하였습니다. 다시 시도해주십시오."; break;

    default : title = "실패"; txt = "입력정보를 확인하여 주세요."; break;
  }

  map.set('title', title);
  map.set('txt', txt);

  return map;
}

/**
 * ajax Setup
 */
$.ajaxSetup({
  // contentType: "application/json",
  beforeSend: function(xhr) {
    fnStartLoadingBar();
    xhr.setRequestHeader("AJAX", true);
  }
  ,complete:function(){ fnEndLoadingBar();},
  error: function(xhr, status, err) {
    fnEndLoadingBar();
    if (xhr.status == 403) {
      MsgBox.Alert('session', function (){
        location.href = "<c:url value='/login.do'>" })
    } else {
      MsgBox.Alert('error');
    }
  }
});