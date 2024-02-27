var map;                                            //맵 변수 선언 : 지도 객체
var view;
const defaultPoint = [126.5443166,33.5035676];      //초기 중심 좌표
var dataTable;
$(document).ready(() => {

    setMap();

    drawInitLayers();
    drawTable();
    setMapLegendValue("locationLegendRange");
    //Search
    $('#searchButton').click(function() {
        searchChargers();
    });

    for(let i = 0; i < DatahubMapObject.zscodeList.length; i ++)
        searchChargerStatus(DatahubMapObject.zscodeList[i]);

    // 라디오 선택
    $("input[name='mapControlRadio']").change(function(e) {
        var selectLayerName = $(e.currentTarget).attr('id').replace('Radio','') + 'Layer';
        layerControl(selectLayerName);
    });

    // 지도 클릭 이벤트 정의
    map.on("click", function (evt) {
        var pixel = evt.pixel;
        mapClickEvent(pixel);
    });
});
function layerControl(layerName) {
    DatahubMapObject.controlLayerHandler(layerName);
    switch (layerName) {
        case 'locationLayer' :
            $('#locationMapLegend').removeClass("hidden");
            $('#timeMapLegend').addClass("hidden");
            break;
        case 'distributionLayer' :
            $('#timeMapLegend').removeClass("hidden");
            $('#locationMapLegend').addClass("hidden");
            break;
    }
}
function searchListClick(index) {

    $("#locationRadio").prop('checked', true);
    DatahubMapObject.controlLayerHandler(DatahubMapObject.basicLayerNameList[0]);
    if(DatahubMapObject.getLayer(DatahubMapObject.basicLayerNameList[0]).getVisible()) {
        $(".location-layer-component").removeClass("hidden");
    }
    $('#locationMapLegend').removeClass("hidden");
    $('#timeMapLegend').addClass("hidden");

    var moveTo = $('[data-locationIndex='+index+']').val().split(",");
    DatahubMapObject.setCenter(moveTo);
    selectMarker(DatahubMapObject.getLayer(DatahubMapObject.basicLayerNameList[0]).getSource().getFeatureById($('[data-stationIdIndex='+ index +']').val()));

    $('#chargerName').text($('[data-nameIndex='+index+']').text());
    $('#chargerAddress').text($('[data-addressIndex='+index+']').text());
    evChartObject.maybeDisposeRoot("CurrentChart");
    evChartObject.maybeDisposeRoot("CurrentChart1");
    evChartObject.createXyChart("CurrentChart");
    evChartObject.createBarChart("CurrentChart1");
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
    for(let i = 0; i < DatahubMapObject.basicLayerNameList.length; i ++) {
        DatahubMapObject.createEmptyLayer(DatahubMapObject.basicLayerNameList[i]);
    }

    var searchCharger = searchChargers(true);
    var setGrid = $.ajax({
        url: '/selectGrid.json',
        type: "POST",
        contentType: "application/json",
        success: function (res) {
            var allChargerList = res.allChargerList;
            var locationList = [];
            for (let i = 0; i < allChargerList.length; i++) {
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
            drawGrid(DatahubMapObject.grid, DatahubMapObject.basicLayerNameList[1], "52, 139, 226", "locationLegendRange", false);
        }, error: function (error) {
            console.log(error);
        }
    });

    $.when(searchCharger, setGrid).done(function () {
        var selectLayerName = $('input[name="mapControlRadio"]:checked').attr('id').replace('Radio','') + 'Layer';
        layerControl(selectLayerName);
    });
}

//충전기 정보 조회 (DB)
function searchChargers(firstLoad) {

    var parameter = $("#parameter").val();

    $.ajax({
        url: '/selectCharger.json',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify( {parameter: parameter}),
        beforeSend: function () { },
        success: function (res) {
            var result = res.result;

            //마커용 List
            var locationList = [];
            //검색 결과용 List
            var listDiv = '';

            result.forEach((object, index) => {
                if (object.location !== undefined && object.location !== '') {
                    var location = object.location.replace(",", " ").split(" ");
                    if (location.length > 0) {
                        locationList.push({x: location[0], y: location[1], status: object.status, id: object.stationId + object.chargerId});
                    }
                    listDiv += '<div class="search-list" onclick="searchListClick('+ index +')"><div class="first"><div class="left-txt" data-nameIndex='+ index +'>';
                    listDiv += object.detail + '</div><div class="right-txt"><div class="rapidity-box">급속 50kw</div>';
                    listDiv += '<input type="hidden" value='+ location +' data-locationIndex="' + index + '"/>';
                    listDiv += '<input type="hidden" value='+ object.stationId + object.chargerId + ' class="chargerId" data-stationIdIndex="' + index + '"/>';
                    listDiv += '<div class="status-grey-box">' + object.statusName + '</div></div></div><div class="last" data-addressIndex="' + index + '">';
                    listDiv += object.address + '</div></div>';
                }
            });

            if(result.length > 0) $(".noDataDiv").addClass("hidden");
            else $(".noDataDiv").removeClass("hidden");

            $('.search-list-form').html(listDiv);
            $("#searchListCount").text(result.length.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

            DatahubMapObject.createPointLayer(locationList, DatahubMapObject.basicLayerNameList[0], false, DatahubMapObject.defaultChargerImage, false, [30,30]);
        }, error: function(error) {
            console.log(error);
        }
    }).done(function () {
        if(!firstLoad) {
            DatahubMapObject.setCenter(defaultPoint);
        }
    });
}


//충전기 상태 조회 (API)
function searchChargerStatus(zscode) {

    $.ajax({
        url: '/searchEvChargerStatus.json',
        type: "POST",
        contentType: "application/json",
        data: zscode,
        beforeSend: function () { },
        success: function (res) {
            try {
                let result = res.result;
                setChargerStatus(result);
            } catch (e) {
                console.log(e);
                MsgBox.Alert('chargerApi');
            }
        }, error: function(error) {
            alert("충전기 상태 조회에 실패하였습니다.");
            console.log(error);
        }
    });
}
function setChargerStatus(list) {

    for (const object of list) {
        let chargerIdx = object.stationId + object.chargerId;
        let input = $('input[value=' + chargerIdx + '][class="chargerId"]').next();
        $(input).text(object.statusName);
        $(input).addClass(DatahubMapObject.chargerStatusClassMap[object.status]);

        var feature = DatahubMapObject.getLayer(DatahubMapObject.basicLayerNameList[0]).getSource().getFeatureById(chargerIdx);

        if(feature !== null) {
            // 클릭된 마커의 스타일 변경
            feature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [30, 30],
                    anchorXUnits: 'pixels',
                    anchorYUnits: 'pixels',
                    opacity: 1,                                              // 마커 투명도 1=100%
                    scale: 0.8,                                              // 크기 1=100%
                    src: DatahubMapObject.chargerMarkerMap[object.status],                              // 마커 이미지
                    size: [30, 30]
                })
            }));
        }
    }
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

    if ($('#distributionRadio').is(':checked')) {
        $('#timeMapLegend').removeClass("hidden");
        $('#locationMapLegend').addClass("hidden");
    }

    // 클릭한 픽셀정보로  feature 체크
    map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        if(layer.values_.title === DatahubMapObject.basicLayerNameList[0]) {
            selectMarker(feature);
            evChartObject.maybeDisposeRoot("CurrentChart");
            evChartObject.maybeDisposeRoot("CurrentChart1");
            evChartObject.createXyChart("CurrentChart");
            evChartObject.createBarChart("CurrentChart1");
            if(DatahubMapObject.getLayer(DatahubMapObject.basicLayerNameList[0]).getVisible()) {
                $(".location-layer-component").removeClass("hidden");
            }
        } else if(layer.values_.title === DatahubMapObject.basicLayerNameList[1]) {
            evChartObject.maybeDisposeRoot("CurrentChart2");
            evChartObject.maybeDisposeRoot("CurrentChart3");
            evChartObject.createPieChart("CurrentChart2");
            evChartObject.createXyChart('CurrentChart3');

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

        } else {
            DatahubMapObject.selectedMarker.marker.setStyle(DatahubMapObject.selectedMarker.originalStyle);
            DatahubMapObject.selectedMarker.marker              = null;
            DatahubMapObject.selectedMarker.originalStyle       = null;
        }
    });
}
function selectMarker(feature) {
    if (DatahubMapObject.selectedMarker.marker && feature) {
        DatahubMapObject.selectedMarker.marker.setStyle(DatahubMapObject.selectedMarker.originalStyle); // 기본 스타일로 리셋
    }

    DatahubMapObject.selectedMarker.originalStyle = feature.style_;

    // 클릭된 마커의 스타일 변경
    feature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [1, 1],
            scale: 1, // 기존 사이즈 대비 스케일 조정
            src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
    }));

    DatahubMapObject.selectedMarker.marker = feature;
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
function setMapLegendValue(legendKey) {
    var rangeList = DatahubMapObject.legendMap[legendKey];
    let rangeInputList = $('.' + legendKey);

    if(rangeInputList.length === 4) {
        $(rangeInputList[0]).text(rangeList[0]);
        $(rangeInputList[1]).text(rangeList[1]);
        $(rangeInputList[2]).text(rangeList[2]);
        $(rangeInputList[3]).text(rangeList[2]);
    }
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
            "zeroRecords" : "조회된 데이터가 없습니다.",
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