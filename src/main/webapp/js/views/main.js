$(document).ready(() => {
	createPieChart('mainChart')
	// 미사용/고장 충전기 데이터 표출 모달
	$('#table_popup').on('show.bs.modal', function (event) {
		let value = $(event.relatedTarget)
		let modal = $(this)

		modal.find('.modal-title').text(value.data('title'))

		let data = new Object

		data.userType = value.data('code')

		drawTable(data)

	})

})

var datatable

// 미사용, 고장 테이블 데이터 세팅
function drawTable (data) {
	let visibleChecked = data.userType === '001' ? true : false;

	$("#codeText").text(data.userType === '001' ? '미사용' : '고장');

	datatable = $('.datatable').DataTable({
		dom: 'Bfrtip',
		buttons: [
			{
				extend: 'excel'
				, text: '엑셀'
				, filename: '엑셀파일명'
				, title: '엑셀파일 안에 쓰일 제목',
				// action: function ( e, dt, node, config ) {
				//     alert( 'Button activated' );
				// }
			},
		],
		destroy: true,
		serverSide: true,
		lengthChange: false,      // 상단 엔트리 개수 설정 비활성화
		searching: false,         // 검색 기능 숨기기
		ordering: false,          // 정렬 기능 숨기기
		info: false,              //하단 페이지 수 비활성화
		paging: false,            // 페이징 기능 숨기기
		order: [ [ 1, 'desc' ] ],     //order : [ [ 열 번호, 정렬 순서 ], ... ],
		language: {
			emptyTable: '데이터가 없습니다.',
			info: '총 _TOTAL_건',
			infoEmpty: '-',
			loadingRecords: '로딩중...',
			processing: '잠시만 기다려 주세요...',
			zeroRecords: '조회된 데이터가 없습니다.',
		},
		ajax: {
			url: '',
			type: 'POST',
			data: function (d) {
				let map = new Object
				map = $.extend(data, d)
				return JSON.stringify(map)
			},
			error: function () {}
		},
		columns: [
			{ 'name': 'user_name', 'title': '#', 'data': 'userName' },
			{ 'name': 'user_id', 'title': '충전기명', 'data': 'userId' },
			{ 'name': 'user_id', 'title': '업체', 'data': 'userId' },
			{ 'name': 'user_id', 'title': '충전 구분', 'data': 'userId' },
			{ 'name': 'user_id', 'title': '미사용일', 'data': 'userId' , visible: visibleChecked},
			{ 'name': 'user_id', 'title': '고장일', 'data': 'userId' , visible: !visibleChecked},
			{ 'name': 'user_id', 'title': '마지막 사용일시', 'data': 'userId' },
		]
	})

	datatable.buttons().container().prependTo('#excelBtn')
}

// 테이블 데이터 세팅
// function fnSelectList(id) {
//
//     $.ajax({
//         type: "POST",
//         url: "/selectUser.json",
//         data: JSON.stringify({ userId: 'admin' }),
//         processData: false,
//         success: function (data, textStatus, jqXHR){
//             $('#' + id + ' tbody').empty();
//
//             var html = '';
//             var color = '';
//
//             $.each(data, function (index, item) {
//
//                 color =  (item === '001' ? 'orange' : 'blue');
//
//                 html += '<tr>';
//                 html += '   <td>' + item + '</td>';
//                 html += '   <td>' + item + '</td>';
//                 html += '   <td>' + item + '</td>';
//                 html += '   <td><progress class="progress-' + color + '" min="0" max="100" value="46"></progress></td>';
//                 html += '   <td><div class="percent-' + color+'-box">'+ item +'%</div></td>';
//                 html += '</tr>';
//             });
//
//             $('#' + id + ' tbody').html(html);
//
//         },
//         beforeSend: function() { fnTableStartLoadingBar(id);},
//         complete:function(){ fnTableEndLoadingBar(id);},
//         error: function(xhr) {
//             $('#' + id + ' tbody').empty();
//             $('#' + id + ' tbody').append('<tr><td colspan="5">데이터를 불러올수'
//               + ' 없습니다.</td></tr>');
//         },
//         async: false
//     });
// }

function createPieChart(name) {
	let root = createRoot(name);

	var chart = root.container.children.push(
		am5percent.PieChart.new(root, {
			width : am5.percent(50),
			height : am5.percent(50),
			layout : root.verticalLayout
		})
	);

	var series = chart.series.push(
		am5percent.PieSeries.new(root, {
			valueField: "value",
			categoryField: "EvCharger",
			endAngle: 270,
			alignLabels: false
		})
	);

	series.get("colors").set("colors", [
		am5.color(0xbae1ff),
		am5.color(0xffb3ba)
	])

	series.states.create("hidden", {
		endAngle: -90
	});

	series.labels.template.setAll({
		fill : am5.color("#FFFFFF"),
		inside : true,
		centerX : am5.percent(100),
		textType: "radial",
		text : "{valuePercentTotal.formatNumber('0.00')}%"
	})

	series.slices.template.set("toggleKey", "none");
	// 차트 데이터 넣는곳
	series.data.setAll([
		{
			EvCharger: "적합",
			value: (4000/7000)
		}
		, {
			EvCharger: "부적합",
			value: (3000/7000)
		}
	]);

	let legend = chart.children.push(am5.Legend.new(root, {
		layout: root.horizontalLayout,
		x: am5.percent(100),
		centerX: am5.percent(75),
		y : am5.percent(80),
		centerY: am5.percent(100),
		useDefaultMarker : true
	}))
	// XY CHART 범례 마커 Radius 조정
	legend.markerRectangles.template.setAll({
		cornerRadiusTL: 10,
		cornerRadiusTR: 10,
		cornerRadiusBL: 10,
		cornerRadiusBR: 10
	})

	// XY CHART 범례 마커 크기 조정
	legend.markers.template.setAll({
		width : 10,
		height : 10
	})
	// XY CHART 범례 폰트 색상 변경
	legend.labels.template.set('fill' ,
		am5.color(0xFFFFFF)
	)

	legend.valueLabels.template.set("forceHidden", true);

	legend.data.setAll(series.dataItems);  // 밑에 범례 추가시 사용

	series.appear(1000, 100);
}
