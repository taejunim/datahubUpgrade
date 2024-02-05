$(document).ready(() => {

	createPieChart('mainChart')
	// 미사용/고장 충전기 데이터 표출 모달
	$('#table_popup').on('show.bs.modal', function (event) {
		let value = $(event.relatedTarget)
		let modal = $(this)

		modal.find('.modal-title').text(value.data('title'))

		let data = new Object

		data.userType = value.data('code');
		data.title = value.data('title');

		drawTable(data);
	});

	$("input[name=bb]").click(function() {
		// fnSelectList('bb');
	});
})

var datatable

// 미사용, 고장 테이블 데이터 세팅
function drawTable (data) {
	// 테이블 reset
	if (datatable) {
		datatable.destroy();
	}

	let type = data.userType === '001' ? '미사용일' : '고장일';

	$("#codeText").text(type);

	datatable = $('.datatable').DataTable({
		dom: 'Bfrtip',
		buttons: [
			{
				extend: 'excel'
				, text: '엑셀'
				, filename: data.title + "("  + new Date().format("yyyy-MM-dd") + ")"
				, title: data.title + "("  + new Date().format("yyyy-MM-dd") + ")"
				, createEmptyCells: true
				,customize: function ( xlsx ) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var sSh = xlsx.xl['styles.xml'];
					var lastXfIndex = $('cellXfs xf', sSh).length - 1;

					var f1 = '<fill><patternFill patternType="solid"><fgColor rgb="000000" /><bgColor indexed="64" /></patternFill></fill>';
					var f2 = '<fill><patternFill patternType="solid"><fgColor rgb="FFFFA500" /><bgColor indexed="64" /></patternFill></fill>';
					var f3 = '<fill><patternFill patternType="solid"><fgColor rgb="FF008000" /><bgColor indexed="64" /></patternFill></fill>';
					var f4 = '<fill><patternFill patternType="solid"><fgColor rgb="FFD3D3D3" /><bgColor indexed="64" /></patternFill></fill>';
					var f5 = '<fill><patternFill patternType="solid"><fgColor rgb="FF365F91" /><bgColor indexed="64" /></patternFill></fill>';
					var s1 = '<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment vertical="top" horizontal="left" wrapText="1" /></xf>';
					var s2 = '<xf numFmtId="0" fontId="0" fillId="6" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment vertical="top" horizontal="left" wrapText="1" /></xf>';
					var s3 = '<xf numFmtId="0" fontId="1" fillId="10" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="top" wrapText="1" /></xf>';
					var s4 = '<xf numFmtId="0" fontId="0" fillId="7" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment vertical="top" horizontal="left" wrapText="1" /></xf>';
					var s5 = '<xf numFmtId="0" fontId="0" fillId="8" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment vertical="top" horizontal="left" wrapText="1" /></xf>';
					var s6 = '<xf numFmtId="0" fontId="0" fillId="9" borderId="1" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment vertical="top" horizontal="left" wrapText="1" /></xf>';
					sSh.childNodes[0].childNodes[2].innerHTML += f1 + f2 + f3 + f4 + f5;
					sSh.childNodes[0].childNodes[5].innerHTML += s1 + s2 + s3 + s4 + s5 + s6;
					var head = lastXfIndex + 3;

					$('row c', sheet).attr('s', 0);
					$('row c', sheet).attr('s', 51);
					$('row:first c', sheet).attr('s', head);
					$('row:nth-child(2) c', sheet).attr('s', head);

					//width
					var col = $('col', sheet);
					$(col[0]).attr('width', 4);
					$(col[1]).attr('width', 40);
					$(col[2]).attr('width', 40);
					$(col[3]).attr('width', 15);
					$(col[4]).attr('width', 20);
					$(col[5]).attr('width', 25);

					//height
					$('row* ', sheet).each(function(index) {
						if (index === 0) {
							$(this).attr('ht', 30);
							$(this).attr('customHeight', 1);
						} else {
							$(this).attr('ht', 20);
							$(this).attr('customHeight', 1);
						}
					});

					// font-size
					var tagName = sSh.getElementsByTagName('sz');
					for (i = 0; i < tagName.length; i++) {
						tagName[i].setAttribute("val", "16");
					}
				}
			},
		],
		columnDefs: [{"defaultContent":"-","targets":"_all"}],
		destroy: true,
		serverSide: true,
		lengthChange: false,      // 상단 엔트리 개수 설정 비활성화
		searching: false,         // 검색 기능 숨기기
		ordering: false,          // 정렬 기능 숨기기
		info: false,              //하단 페이지 수 비활성화
		paging: false,
		scrollCollapse: true,
		scrollX: false,
		order: [ [ 1, 'desc' ] ],     //order : [ [ 열 번호, 정렬 순서 ], ... ],
		language: {
			emptyTable: '데이터가 없습니다.',
			infoEmpty: '-',
			loadingRecords: '로딩중...',
			zeroRecords: '조회된 데이터가 없습니다.',
		},
		ajax: {
			url: '/topEvChargerList.json',
			type: 'POST',
			data: function (d) {
				let map = new Object;
				map = $.extend(data, d);
				return JSON.stringify(map);
			},
			error: function () {},
			beforeSend: function() { fnTableStartLoadingBar(); },
			complete:function(){ fnTableEndLoadingBar();}
		},
		columns: [
			{'title': '#', 'data': 'rowNumber' },
			{'title': '충전기명', 'data': 'chargingStationName' },
			{'title': '업체', 'data': 'agencyName' },
			{'title': '충전 구분', 'data': 'chargerType', "render": function (data, type, row) {
					var type = data === '02' ? '급속' : '완속';
					return type;
				}},
			{'title': type, 'data': 'unusedDays', "render": function (data, type, row) {
					return data + '일';
				}},
			{'title': '마지막 사용일시', 'data': 'lastChargingEndDate' ,"render" : function (data, type, row) {
					return new Date(data).format("yyyy-MM-dd hh:mm:ss");
				}
			}
		]
	});

	datatable.buttons().container().prependTo('#excelBtn');
}

// 테이블 데이터 세팅
// function fnSelectList(id) {
// 	$.ajax({
// 		type: "POST",
// 		url: "/topEvChargerList.mng",
// 		data: JSON.stringify({ userId: 'admin' }),
// 		success: function (data, textStatus, jqXHR){
//
// 			if (id === null) {
// 				drawTable(data);
// 			} else {
// 				$('#' + id + ' tbody').empty();
//
// 				var html = '';
// 				var color = '';
//
// 				$.each(data, function (index, item) {
//
// 					color =  (item === '001' ? 'orange' : 'blue');
//
// 					html += '<tr>';
// 					html += '   <td>' + item + '</td>';
// 					html += '   <td>' + item + '</td>';
// 					html += '   <td>' + item + '</td>';
// 					html += '   <td><progress class="progress-' + color + '" min="0" max="100" value="46"></progress></td>';
// 					html += '   <td><div class="percent-' + color+'-box">'+ item +'%</div></td>';
// 					html += '</tr>';
// 				});
//
// 				$('#' + id + ' tbody').html(html);
// 			}
// 		},
// 		beforeSend: function() { fnTableStartLoadingBar(id);},
// 		complete:function(){ fnTableEndLoadingBar(id);},
// 		error: function(xhr) {
// 			$('#' + id + ' tbody').empty();
// 			$('#' + id + ' tbody').append('<tr><td colspan="5">데이터를 불러올수 없습니다.</td></tr>');
// 		},
// 		async: false
// 	});
// };

function createPieChart(name) {
	let root = createRoot(name);

	var chart = root.container.children.push(
		am5percent.PieChart.new(root, {
			width : am5.percent(100),
			height : am5.percent(100),
			centerX : am5.percent(100),
			x : am5.percent(95),
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
		am5.color(0x4b9375),
		am5.color(0x7d5867)
	])

	series.states.create("hidden", {
		endAngle: -90
	});

	series.ticks.template.setAll({
		stroke: am5.color(0xFFFFFF),
		strokeWidth: 2
	})

	series.labels.template.adapters.add("text", function(text, target) {
		if (target.dataItem) {
			if (target.dataItem.get("valuePercentTotal") < 10) {
				target.setAll({
					textType: "aligned",
					fill: am5.color("#FFFFFF"),
					text : "{valuePercentTotal.formatNumber('0.00')}%",
					centerX: am5.percent(50),
					radius: null,
					paddingLeft: 20,
					paddingRight: 20
				});
				target.dataItem.get("tick").set('fill', am5.color("#FFFFFF"));
			}
			else {
				target.setAll({
					textType: "regular",
					fill: am5.color("#FFFFFF"),
					text : "{valuePercentTotal.formatNumber('0.00')}%",
					centerX: am5.percent(50),
					radius: -70,
					paddingLeft: 0,
					paddingRight: 0
				});
				target.dataItem.get("tick").set("forceHidden", true);
			}
		}
		return text;
	});

	var gradient = am5.LinearGradient.new(root, {
		stops : [{
			color : series.get("fill")
		},{
			color : am5.color(0xFFFFFF),
			opacity : 0.6
		}],
		rotation: 90
	})

	series.slices.template.set("toggleKey", "none");
	series.slices.template.setAll({
		fillGradient : gradient,
		fillOpacity: 0.5
	})
	// 차트 데이터 넣는곳
	series.data.setAll([
		{
			EvCharger: "적합",
			value: (normalCnt/totalCnt)
		}
		, {
			EvCharger: "부적합",
			value: (abnomalCnt/totalCnt)
		}
	]);

	let legend = chart.children.push(am5.Legend.new(root, {
		layout: root.horizontalLayout,
		x: am5.percent(100),
		centerX: am5.percent(85),
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
