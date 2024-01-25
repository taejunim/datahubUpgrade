var map;                                            //맵 변수 선언 : 지도 객체
var view;
const defaultPoint = [126.5443166,33.5035676];      //초기 중심 좌표
var legendMap = {"legendRange1" : [80, 60, 40], "legendRange2" : [30, 20, 10]};
$(document).ready(() => {



    $('#searchButton').click(function() {
        searchChargers();
    });

    setMap();

    drawInitLayers();
    createXyChart("CurrentChart");
    createBarChart("CurrentChart1");

    // 라디오 선택
    $("input[name='mapControlRadio']").change(function(e) {
        selectLayer($(e.currentTarget).attr('id'));
    });

});

function searchListClick(index) {
    $('.layer-group').toggleClass('hidden');
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
        // layers : [mapLayerBase], //레이어
        view: view //뷰
    });

    DatahubMapObject.setMap(map);

    // 기본 layer
    DatahubMapObject.createVworldMapLayer('Base', 'base', true, 'png');
    DatahubMapObject.createVworldMapLayer('Satellite', 'satellite', false, 'jpeg');
    DatahubMapObject.createVworldMapLayer('Hybrid', 'hybrid', false, 'png');


    $(".ol-zoom").hide();

    proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
    proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs");

    ol.proj.proj4.register(proj4);
}

function drawInitLayers() {
    var searchCharger = searchChargers();
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
                        locationList.push({x: location[0], y: location[1]});
                    }
                }
            }
            DatahubMapObject.createPointLayer(locationList, 'heatMapDataLayer', false, '', false);

            if(res.result !== null)
                DatahubMapObject.setGrid(res.result);
            drawGrid(DatahubMapObject.grid, DatahubMapObject.layerNameList[1], "52, 139, 226", "legendRange2", false);
        }, error: function (error) {
            console.log(error);
        }
    });

    $.when(searchCharger, setGrid).done(function () {
        fnEndLoadingBar();
        selectLayer(DatahubMapObject.layerNameList[0]);
    });
}

function searchChargers() {
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
                        locationList.push({x: location[0], y: location[1]});
                    }

                    listDiv += '<div class="search-list" onclick="searchListClick('+i+')"><div class="first"><div class="left-txt" data-nameIndex='+i+'>';
                    listDiv += result[i].detail + '</div><div class="right-txt"><div class="rapidity-box">급속 50kw</div>';
                    listDiv += '<div class="status-green-box">정상</div></div></div><div class="last" data-addressIndex="'+i+'">';
                    listDiv += result[i].address + '</div></div>';
                }
            }
            DatahubMapObject.createPointLayer(locationList, DatahubMapObject.layerNameList[0], true, '/images/chargers/charger-green.png', false);
            $('.search-list-form').html(listDiv);
            $("#searchListCount").text(result.length.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

        }, error: function(error) {
            console.log(error);
        }
    });
}

function selectLayer(radioId) {

    switch (radioId) {
        case 'locationRadio' :
            DatahubMapObject.getLayer(DatahubMapObject.layerNameList[0]).setVisible(true);
            DatahubMapObject.getLayer(DatahubMapObject.layerNameList[1]).setVisible(false);
            break;
        case 'distributionRadio' :
            DatahubMapObject.getLayer(DatahubMapObject.layerNameList[0]).setVisible(false);
            DatahubMapObject.getLayer(DatahubMapObject.layerNameList[1]).setVisible(true);
            break;
        default : break;
    }
}

     function createXyChart(name) {
            let root = createRoot(name);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    focusable: true,
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true
                })
            );

            var easing = am5.ease.linear;
            chart.get("colors").set("step", 2);

            var xRenderer = am5xy.AxisRendererX.new(root, {
                minGridDistance: 80,
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
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText: "{valueY}"
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
                xAxis: xAxis,
                behavior: "none"
            }));
            cursor.lineY.set("visible", false);
            cursor.lineX.set("visible", false);

            createAxisAndSeries(20, false, "USE Time");
            createAxisAndSeries(20, true, "USE Count");

            chart.appear(1000, 100);
            // XY CHART 범례 인스턴스 생성
            var legend = chart.children.push(am5.Legend.new(root, {
                layout: root.horizontalLayout,
                x: am5.percent(80),
                centerX: am5.percent(100),
                y: am5.percent(90),
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
                fill: am5.color(0x8d8f94)
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
                fill: am5.color(0x8d8f94)
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
                x: am5.percent(50),
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
function calculateRangeOpacity(legendKey, value) {
    var rangeList = legendMap[legendKey];

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