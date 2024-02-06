var map;                                            //맵 변수 선언 : 지도 객체
var view;
const defaultPoint = [126.5443166,33.5035676];      //초기 중심 좌표
var dataTable;
$(document).ready(() => {

    setMap();

    drawInitLayers();
    drawTable();

    //Search
    $('#searchButton').click(function() {
        searchChargers();
    });

    // 라디오 선택
    $("input[name='mapControlRadio']").change(function(e) {
        var selectLayerName = $(e.currentTarget).attr('id').replace('Radio','') + 'Layer';
        DatahubMapObject.controlLayerHandler(selectLayerName);
    });

    // 지도 클릭 이벤트 정의
    map.on("click", function (evt) {
        var pixel = evt.pixel;
        mapClickEvent(pixel);
    });
});

function searchListClick(index) {

    $("#locationRadio").prop('checked', true);
    DatahubMapObject.controlLayerHandler(DatahubMapObject.basicLayerNameList[0]);
    if(DatahubMapObject.getLayer(DatahubMapObject.basicLayerNameList[0]).getVisible()) {
        $(".location-layer-component").removeClass("hidden");
    }

    var moveTo = $('[data-locationIndex='+index+']').val().split(",");
    DatahubMapObject.setCenter(moveTo);
    $('#chargerName').text($('[data-nameIndex='+index+']').text());
    $('#chargerAddress').text($('[data-addressIndex='+index+']').text());
    maybeDisposeRoot("CurrentChart");
    maybeDisposeRoot("CurrentChart1");
    createXyChart("CurrentChart");
    createBarChart("CurrentChart1");
}

function setMap() {
    view = new ol.View({ //뷰 생성
        projection: 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계)
        center: new ol.geom.Point(defaultPoint)  //처음 중앙에 보여질 경도, 위도
            .transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
            .getCoordinates(), //포인트의 좌표를 리턴함
        zoom: 16, //초기지도 zoom의 정도값
        minZoom: 11,
        maxZoom: 19
    });

    map = new ol.Map({ //맵 생성
        target: 'vMap', //html 요소 id 값
        view: view //뷰
    });

    DatahubMapObject.setMap(map);

    // 기본 layer
    DatahubMapObject.createVworldMapLayer('Base', 'base', true, 'png');

    $(".ol-zoom").hide();

    proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
    proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs");

    ol.proj.proj4.register(proj4);
}

function drawInitLayers() {
    var searchCharger = searchChargers(true);
    var setGrid = $.ajax({
        url: '/selectGrid.json',
        type: "POST",
        contentType: "application/json",
        success: function (res) {
            var allChargerList = res.allChargerList;
            var locationList = [];
            for (var i = 0; i < allChargerList.length; i++) {
                if (allChargerList[i].location !== undefined && allChargerList[i].location !== '') {
                    var location = allChargerList[i].location.replace(",", " ").split(" ");
                    if (location.length > 0) {
                        locationList.push({x: location[0], y: location[1], status: allChargerList[i].status});
                    }
                }
            }
            DatahubMapObject.createPointLayer(locationList, 'heatMapDataLayer', false, '', false);

            if(res.result !== null)
                DatahubMapObject.setGrid(res.result);
            drawGrid(DatahubMapObject.grid, DatahubMapObject.basicLayerNameList[1], "52, 139, 226", "legendRange2", false);
        }, error: function (error) {
            console.log(error);
        }
    });

    $.when(searchCharger, setGrid).done(function () {
        fnEndLoadingBar();
    });
}

function searchChargers(firstLoad) {
    $.ajax({
        url: '/searchEvChargers.json',
        type: "POST",
        contentType: "application/json",
        beforeSend: function () {fnStartLoadingBar();},
        success: function (res) {
            var result = res.result;

            //마커용 List
            var locationList = [];
            //검색 결과용 List
            var listDiv = '';
            for(var i = 0; i < result.length; i ++) {
                if (result[i].location !== undefined && result[i].location !== '') {
                    var location = result[i].location.replace(",", " ").split(" ");
                    if (location.length > 0) {
                        locationList.push({x: location[0], y: location[1], status: result[i].status});
                    }
                    listDiv += '<div class="search-list" onclick="searchListClick('+i+')"><div class="first"><div class="left-txt" data-nameIndex='+i+'>';
                    listDiv += result[i].detail + '</div><div class="right-txt"><div class="rapidity-box">급속 50kw</div>';
                    listDiv += '<input type="hidden" value='+ location +' data-locationIndex="' + i + '"/>';
                    listDiv += '<div class="' + DatahubMapObject.chargerStatusClassMap[result[i].status] + '">' + result[i].statusName + '</div></div></div><div class="last" data-addressIndex="'+i+'">';
                    listDiv += result[i].address + '</div></div>';
                }
            }
            DatahubMapObject.createPointLayer(locationList, DatahubMapObject.basicLayerNameList[0], true, DatahubMapObject.defaultChargerImage, false, [30,30]);
            $('.search-list-form').html(listDiv);
            $("#searchListCount").text(result.length.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

        }, error: function(error) {
            console.log(error);
        }
    }).done(function () {
        if(!firstLoad) {
            DatahubMapObject.setCenter(defaultPoint);
            fnEndLoadingBar();
        }
    });
}

     function createXyChart(name) {
            let root = createRoot(name);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    focusable: true,
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                    pinchZoomX: true
                })
            );

            chart.get("colors").set("colors",[
                am5.color(0xf2c8ed),
                am5.color(0xbbf7ef),
                am5.color(0x5aaa95),
                am5.color(0x86a873),
                am5.color(0xbb9f06)
            ])

            var easing = am5.ease.linear;
            chart.get("colors").set("step", 2);

            var xRenderer = am5xy.AxisRendererX.new(root, {
                minGridDistance: 100,
                minorGridEnabled: true
            });
            xRenderer.labels.template.set('visible',false);

            var xAxis = chart.xAxes.push(
                am5xy.DateAxis.new(root, {
                    maxDeviation: 0.1,
                    groupData: false,
                    baseInterval: {
                        timeUnit: "day",
                        count: 1
                    },
                    renderer: xRenderer
                })
            );

            function createAxisAndSeries(startValue, opposite, name) {
                let yRenderer = am5xy.AxisRendererY.new(root, {
                    opposite: opposite
                });
                yRenderer.hide();
                yRenderer.labels.template.set('visible',false);
                let yAxis = chart.yAxes.push(
                    am5xy.ValueAxis.new(root, {
                        // maxDeviation: 1,
                        renderer: yRenderer
                    })
                );

                if (chart.yAxes.indexOf(yAxis) > 0) {
                    yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
                }

                let series = chart.series.push(
                    am5xy.LineSeries.new(root, {
                        name : name,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: "value",
                        valueXField: "date",
                        seriesTooltipTarget : "bullet",
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText: "{valueY}",
                            tooltipPosition: "pointer"
                        })
                    })
                );

                series.fills.template.set("fillGradient", am5.LinearGradient.new(root, {
                    stops: [{
                        opacity: 1,
                        brighten : 0.2
                    }, {
                        color : am5.color(0x373741),
                        opacity: 0.1,
                        offset : 0.7
                    }],
                    rotation: 90
                }));

                series.fills.template.setAll({
                    visible: true,
                    fillOpacity: 0.5
                });

                series.strokes.template.setAll({ strokeWidth: 2 });

                yRenderer.grid.template.set("strokeOpacity", 0.05);
                yRenderer.labels.template.set("fill", series.get("fill"));
                yRenderer.setAll({
                    stroke: series.get("fill"),
                    strokeOpacity: 1,
                    opacity: 1
                });

                series.data.processor = am5.DataProcessor.new(root, {
                    dateFormat: "yyyy-MM-dd",
                    dateFields: ["date"]
                });

                series.bullets.push(function(root) {
                    return am5.Bullet.new(root, {
                        sprite: am5.Circle.new(root, {
                            radius: 3,
                            fill: series.get("fill")
                        })
                    });
                });

                series.data.setAll(generateChartData(startValue));
            }
            // XY CHART 커서 옵션 세팅
            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                xAxis : xAxis,
                behavior: "zoomXY"
            }));
            cursor.lineY.set("visible", false);
            // cursor.lineX.set("visible", false);

            switch (name) {
                case "CurrentChart" :
                    createAxisAndSeries(20, false, "USE Time");
                    createAxisAndSeries(20, true, "USE Count");
                    break;
                case "CurrentChart3" :
                    createAxisAndSeries(20, false, "이용시간/설치 대수");
                    createAxisAndSeries(20, true, "이용시간/이용건 수");
                    break;
            }

            var legend;

            chart.appear(1000, 100);
            // XY CHART 범례 인스턴스 생성
            switch (name) {
                case "CurrentChart" :
                    legend = chart.children.push(am5.Legend.new(root, {
                        layout: root.horizontalLayout,
                        x: am5.percent(80),
                        centerX: am5.percent(100),
                        y: am5.percent(100),
                        useDefaultMarker : true
                    }));
                    break;
                case "CurrentChart3" :
                    legend = chart.children.push(am5.Legend.new(root, {
                        layout: root.horizontalLayout,
                        x: am5.percent(85),
                        centerX: am5.percent(100),
                        y: am5.percent(100),
                        useDefaultMarker : true
                    }));
                    break;
            }

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
            // XY CHART 범례 데이터 셋
            legend.data.setAll(chart.series.values);

            function generateChartData(value) {
                var data = [];
                var firstDate = new Date();
                firstDate.setDate(firstDate.getDate() - 100);
                firstDate.setHours(0, 0, 0, 0);

                for (var i = 0; i < 10; i++) {
                    var newDate = new Date(firstDate);
                    newDate.setDate(newDate.getDate() + i);
                    value += Math.round(
                        ((Math.random() < 0.5 ? 1 : -1) * Math.random() * value) / 20
                    );
                    data.push({
                        date: newDate,
                        value: value
                    });
                }
                return data;
            }
        }

        function createBarChart(name) {
            var root = createRoot(name);

            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                paddingLeft: 0,
                layout: root.verticalLayout
            }));

            chart.get("colors").set("colors", [
                am5.color(0xa796fd),
                am5.color(0x6aeca1)
            ])
            var data = [{
                "country": "12/8",
                "USE Time": 30,
                "USE Count": 20
            }, {
                "country": "12/7",
                "USE Time": 35,
                "USE Count": 24
            }, {
                "country": "12/6",
                "USE Time": 25,
                "USE Count": 15
            }, {
                "country": "12/5",
                "USE Time": 33,
                "USE Count": 21
            }, {
                "country": "12/4",
                "USE Time": 36,
                "USE Count": 25
            }, {
                "country": "12/3",
                "USE Time": 18,
                "USE Count": 15
            }, {
                "country": "12/2",
                "USE Time": 29,
                "USE Count": 20
            }];

            var xRenderer = am5xy.AxisRendererX.new(root, {
                minGridDistance: 30,
                minorGridEnabled: true
            });

            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "country",
                renderer: xRenderer
            }));

            xAxis.get("renderer").labels.template.setAll({
                fill: am5.color(0xFFFFFF)
            });

            xRenderer.grid.template.setAll({
                location: 1
            })

            xAxis.data.setAll(data);

            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })
            }));

            yAxis.get("renderer").labels.template.setAll({
                fill: am5.color(0xFFFFFF)
            });


            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "USE Time",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "USE Time",
                categoryXField: "country",
                clustered: false,
                tooltip: am5.Tooltip.new(root, {
                    labelText: "USE Time: {valueY}"
                })
            }));

            series.columns.template.setAll({
                width: am5.percent(40),
                tooltipY: 0,
                strokeOpacity: 0,
                fillOpacity: 0.5,
                strokeWidth: 2,
                cornerRadiusTL: 10,
                cornerRadiusTR: 10
            });

            series.data.setAll(data);

            var series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "USE Count",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "USE Count",
                categoryXField: "country",
                clustered: false,
                tooltip: am5.Tooltip.new(root, {
                    labelText: "USE Count: {valueY}"
                })
            }));

            series2.columns.template.setAll({
                width: am5.percent(40),
                tooltipY: 0,
                strokeOpacity: 0,
                cornerRadiusTL: 10,
                cornerRadiusTR: 10
            });

            series2.data.setAll(data);

            chart.appear(1000, 100);
            series.appear();
            series2.appear();

            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                xAxis: xAxis,
                behavior: "none"
            }));
            cursor.lineY.set("visible", false);
            cursor.lineX.set("visible", false);

            var legend = chart.children.unshift(am5.Legend.new(root, {
                layout: root.horizontalLayout,
                x: am5.percent(60),
                centerX: am5.percent(100),
                y: am5.percent(5),
                centerY : am5.percent(100),
                useDefaultMarker : true
            }));

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

            legend.data.setAll(chart.series.values);
        }

function drawGrid(gridData, layerName, color, legendKey, visible){

    // 격자 배열
    var gridFeatures = [];

    // 각 좌표를 기반으로 격자 생성
    gridData.forEach(function (data) {
        var polygon = data.area.split(" ");

        if(polygon.length === 5) {

            var gridCell = new ol.geom.Polygon([[
                ol.proj.transform(polygon[0].split(",").map(arg => parseFloat(arg)), 'EPSG:5179', 'EPSG:3857'),
                ol.proj.transform(polygon[1].split(",").map(arg => parseFloat(arg)), 'EPSG:5179', 'EPSG:3857'),
                ol.proj.transform(polygon[2].split(",").map(arg => parseFloat(arg)), 'EPSG:5179', 'EPSG:3857'),
                ol.proj.transform(polygon[3].split(",").map(arg => parseFloat(arg)), 'EPSG:5179', 'EPSG:3857'),
                ol.proj.transform(polygon[0].split(",").map(arg => parseFloat(arg)), 'EPSG:5179', 'EPSG:3857')
            ]]);

            var extent = gridCell.getExtent();
            var gridFeature = new ol.Feature({
                geometry: gridCell,
                zIndex: 3,
            });

            var pointCount = DatahubMapObject.getLayer("heatMapDataLayer").getSource().getFeaturesInExtent(extent).length;

            var polygonStyle = [
                // 스타일 지정
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#aaa',
                        width: 1
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(' + color + ',' + calculateRangeOpacity(legendKey, pointCount) + ')' // 포인트 개수에 따라 투명도 조절
                    })
                })];
            gridFeature.setStyle(polygonStyle);
            gridFeatures.push(gridFeature);
        }
    });

    DatahubMapObject.createPolygonLayer(layerName, gridFeatures, visible);
}

function mapClickEvent(pixel) {
    maybeDisposeRoot("CurrentChart2");
    maybeDisposeRoot("CurrentChart3");
    createPieChart("CurrentChart2");
    createXyChart('CurrentChart3');
    // 클릭한 픽셀정보로  feature 체크
    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        if(layer.values_.title === DatahubMapObject.basicLayerNameList[1]) {

            var selectCell   = feature.values_.geometry.extent_;

            var gridCell = new ol.geom.Polygon([[
                [selectCell[0], selectCell[1]],
                [selectCell[2], selectCell[1]],
                [selectCell[2], selectCell[3]],
                [selectCell[0], selectCell[3]],
                [selectCell[0], selectCell[1]]
            ]]);

            var gridFeature = new ol.Feature({
                geometry: gridCell,
                zIndex: 5
            });

            var polygonStyle = [
                // 스타일 지정
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#666',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255,0,0,' + 0.4 + ')'
                    })
                })];
            gridFeature.setStyle(polygonStyle);
            var gridFeatures = [gridFeature];

            DatahubMapObject.createPolygonLayer(DatahubMapObject.selectCellLayerName, gridFeatures, true);
            $(".location-layer-component").addClass("hidden");
            $(".distribution-layer-component").removeClass("hidden");

        }
    });
}

function calculateRangeOpacity(legendKey, value) {
    var rangeList = DatahubMapObject.legendMap[legendKey];

    let opacity = 0;

    if(value > 0) {
        switch (true) {
            case (value >= rangeList[0]) : opacity = 0.6; break;
            case (value < rangeList[0] && value >= rangeList[1]) : opacity = 0.45; break;
            case (value < rangeList[1] && value >= rangeList[2]) : opacity = 0.3; break;
            default : opacity = 0.15; break;
        }
    }

    return opacity;
}

function drawTable() {

    datatable = $('#dataTable2').DataTable({
        responsive: true,
        pageLength: 5,
        destroy: true,
        serverSide: true,
        processing: true,
        lengthChange: false,      // 상단 엔트리 개수 설정 비활성화
        searching: false,         // 검색 기능 숨기기
        ordering: false,          // 정렬 기능 숨기기
        info: true,              //하단 페이지 수 비활성화
        paging: true,            // 페이징 기능 숨기기
        pagingType: "full_numbers",
        bPaginate: true,
        infoCallback : function (settings, start, end, max, total, pre){
            return " 총 " + max + " 개소";
        },
        order: [ [ 1, 'desc' ] ],     //order : [ [ 열 번호, 정렬 순서 ], ... ],
        language: {
            "decimal" : "",
            "emptyTable" : "데이터가 없습니다.",
            "info" : "_START_ - _END_ (총 _TOTAL_ 개)",
            "infoEmpty" : "0개",
            "infoFiltered" : "(전체 _MAX_ 개 중 검색결과)",
            "infoPostFix" : "",
            "thousands" : ",",
            "lengthMenu" : "_MENU_ 개씩 보기",
            "loadingRecords" : "로딩중...",
            "processing" : "불러오는중...",
            "search" : "검색 : ",
            "zeroRecords" : "검색된 데이터가 없습니다.",
            "aria" : {
                "sortAscending" : " :  오름차순 정렬",
                "sortDescending" : " :  내림차순 정렬"
            },
            "paginate": {
                "first": "<span></span>",
                "next": "<span></span>",
                "previous": "<span></span>",
                "last": "<span></span>"
            }
        },
        ajax: {
            url: '/getBuildings.json',
            type: 'POST',
            data: function (d) {
                d.searchRegion     = $('#searchRegion').val();
                return d;
            },
            error: function () {}
        },
        columns: [
            {title : "충전기명", data: "buildingName"},
            {title : "이용횟수", data: "totalArea"},
            {title : "이용 시간(분)", data: "totalArea"}
        ],
        columnDefs:[
            {targets:[0], width:"60%", padding:"0px"}
            ,{targets:[1], width:"20%", padding:"0px"}
            ,{targets:[2], width:"20%", padding:"0px"}
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex) {
            $(nRow).mouseover(function () {
                $(nRow, 'td').addClass("activeCursor");
            });

            $( nRow).mouseout(function() {
                $(nRow).removeClass("activeCursor");
            });
        }

    })
}

function createPieChart(name) {
    let root = createRoot(name);

    var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            width : am5.percent(100),
            height : am5.percent(100),
            centerX : am5.percent(100),
            x : am5.percent(65),
            centerY : am5.percent(90),
            y : am5.percent(100),
            radius: am5.percent(100),
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
        am5.color(0xF72585),
        am5.color(0xB5179E),
        am5.color(0x7209B7),
        am5.color(0x560BAD),
        am5.color(0x3B009A),
        am5.color(0x00B4D8),
    ])

    series.states.create("hidden", {
        endAngle: -90
    });

    series.labels.template.set("forceHidden", true);

    series.ticks.template.set("forceHidden", true);

    // series.labels.template.setAll({
    //     fill : am5.color("#FFFFFF"),
    //     inside : true,
    //     centerX : am5.percent(100),
    //     textType: "radial",
    //     text : "{valuePercentTotal.formatNumber('0.00')}%"
    // })

    series.slices.template.set("toggleKey", "none");
    // series.slices.template.setAll({
    //     fillOpacity: 0.5
    // })
    // 차트 데이터 넣는곳
    series.data.setAll([
        {
            EvCharger: "제주특별자치도",
            value: (5/10)
        }
        , {
            EvCharger: "환경부",
            value: (1/10)
        }
        , {
            EvCharger: "한국전력",
            value: (1/10)
        }
        , {
            EvCharger: "제주테크노파크",
            value: (1/10)
        }
        , {
            EvCharger: "제주에너지공사",
            value: (1/10)
        }
        , {
            EvCharger: "운영사",
            value: (1/10)
        }
    ]);

    let legend = chart.children.push(am5.Legend.new(root, {
        layout: root.verticalLayout,
        x: am5.percent(80),
        centerX: am5.percent(100),
        y : am5.percent(0),
        centerY: am5.percent(0),
        height : am5.percent(50),
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

