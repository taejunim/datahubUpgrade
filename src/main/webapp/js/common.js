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
      alert(e.message);
    }finally  {}
    return obj;
  };

  /*******************^********************
   *             Select Custom             *
   ****************************************/
  $('select').select2({
    theme: 'bootstrap4',
    width: 'element',
    dropdownAutoWidth: false,
    placeholder: "전체"
  });

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

// 로딩 시작
function fnStartLoadingBar() {
  $('.wrap-loading').removeClass('hidden');
}

// 로딩 종료
function fnEndLoadingBar() {
  $('.wrap-loading').addClass('hidden');
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

$.ajaxSetup({
  contentType: "application/json",
  beforeSend: function(xhr) {
    fnStartLoadingBar();
    xhr.setRequestHeader("AJAX", true);
  }
  ,complete:function(){ fnEndLoadingBar();}
  ,error: function(xhr, status, err) {
    fnEndLoadingBar();
    if (xhr.status == 403) {
      alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
      location.href = "<c:url value='/login.do'>";
    }
  }
});

