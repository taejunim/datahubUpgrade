$(document).ready(function() {

  $('select').select2({
    theme: 'bootstrap4',
    width: 'element',
    dropdownAutoWidth: false,
    placeholder: "전체"
  });

  //날짜범위
  $(function () {
    jQuery.datetimepicker.setLocale('kr');
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




