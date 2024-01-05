$(document).ready(function() {

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

//로딩 시작
function fnStartLoadingBar() {
  $('.wrap-loading').removeClass('hidden');
}

//로딩 종료
function fnEndLoadingBar() {
  $('.wrap-loading').addClass('hidden');
}


