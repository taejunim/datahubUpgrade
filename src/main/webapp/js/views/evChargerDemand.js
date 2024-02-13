var map;                                            //맵 변수 선언 : 지도 객체
var map3d;
var view;
const defaultPoint = [126.5443166,33.5035676];      //초기 중심 좌표

var dataTable;
$(document).ready(() => {
    drawTable();
    $('#searchButton').click(function() {
        $('#dataTable').DataTable().ajax.reload();
    });

    setMap();
})

function setMap() {
    view = new ol.View({ //뷰 생성
        projection: 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계)
        center: new ol.geom.Point(defaultPoint)  //처음 중앙에 보여질 경도, 위도
            .transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
            .getCoordinates(), //포인트의 좌표를 리턴함
        zoom: 12, //초기지도 zoom의 정도값
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

function drawTable () {

    datatable = $('#dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel'
                , text: '엑셀'
                , filename: "주차장 수요 대상 건물("  + new Date().format("yyyy-MM-dd") + ")"
                , title: "주차장 수요 대상 건물("  + new Date().format("yyyy-MM-dd") + ")"
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
                    $(col[0]).attr('width', 50);
                    $(col[1]).attr('width', 15);
                    $(col[2]).attr('width', 15);
                    $(col[3]).attr('width', 20);
                    $(col[4]).attr('width', 10);
                    $(col[5]).attr('width', 15);

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
        initComplete: function () {
            $('#excelBtn').append($('.dt-buttons'));
        },
        responsive: true,
        pageLength: 10,
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
            return " 총 " + max + " 건";
        },
        order: [ [ 1, 'desc' ] ],     //order : [ [ 열 번호, 정렬 순서 ], ... ],
        language: {
            "emptyTable" : "데이터가 없습니다.",
            "processing":"",
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
                d.searchRegion = $('#searchRegion').val();
                d.searchBuildingPurposeCode = $('#searchBuildingPurposeCode').val();
                d.searchSuitability = $('#searchSuitability').val();
                d.searchPermissionDateFrom = $('#searchPermissionDateFrom').val();
                d.searchPermissionDateTo = $('#searchPermissionDateTo').val();
                return d;
            },
            error: function () {}
        },
        columns: [
            {title : "건물명", data: "buildingName"},
            {title : "적합 판단", data: "suitability", render: function (data, type, row) {
                    if (data === '적합') {
                        //return '<div className="judgment-box font-green">' + data + '</div>';
                        return '<div class="display-row"><div class="judgment-box font-green">' + data + '</div></div>';

                    } else {
                        return '<div class="display-row"><div class="judgment-box font-red">' + data + '</div></div>';
                    }
                }},
            //{title : "적합 판단", data: "suitability"},
            {title : "지역", data: "regionName"},
            {title : "주용도", data: "buildingPurposeName"},
            {title : "구분", data: "buildingTypeName"},
            {title : "건축 허가일", data: "permissionDate"}
        ],
        columnDefs:[
            {targets:[0], width:"30%", padding:"0px"}
            ,{targets:[1], width:"10%", padding:"0px"}
            ,{targets:[2], width:"15%", padding:"0px"}
            ,{targets:[3], width:"15%", padding:"0px"}
            ,{targets:[4], width:"15%", padding:"0px"}
            ,{targets:[5], width:"15%", padding:"0px"}
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex) {
            $(nRow).mouseover(function () {
                $(nRow, 'td').addClass("activeCursor");
            });

            $( nRow).mouseout(function() {
                $(nRow).removeClass("activeCursor");
            });

            $(nRow).click(function() {

                $('#buildingName').html(aData.buildingName);

                var address;
                if (aData.roadNameAddress.trim() == "" && aData.landLotNumberAddress.trim() == "") {
                    address = "-";
                } else {
                    if (aData.roadNameAddress.trim() != "" && aData.landLotNumberAddress.trim() == "") {
                        address = aData.roadNameAddress;
                    } else if (aData.roadNameAddress.trim() == "" && aData.landLotNumberAddress.trim() != "") {
                        address = aData.landLotNumberAddress;
                    } else {
                        address = aData.roadNameAddress + "<br>(" + aData.landLotNumberAddress + ")";
                    }
                }
                $('#address').html(address);
                $('#permissionDate').html(aData.permissionDate);
                $('#completionDate').html(aData.completionDate);

                $('#floors').html(aData.floors);
                $('#buildingTypeName').html(aData.buildingTypeName);
                $('#buildingPurposeName').html(aData.buildingPurposeName);
                $('#buildingArea').html(aData.buildingArea + "㎡");
                $('#totalArea').html(aData.totalArea + "㎡");
                $('#platArea').html(aData.platArea + "㎡");
                $('#chargerCount').html("급속 : " + aData.fastChargerCount + " 대 <br>완속 : " + aData.slowChargerCount + " 대");
                $('#chargerStandard').html(aData.chargerCount + "/" + aData.chargerStandard + "대");

                //전기차 충전기 설치 기준 2대 이상
                if (Number(aData.chargerStandard) >= 2) {

                    //급속 1대 이상
                    if (Number(aData.fastChargerCount) >= 1) {
                        $("#fastChargerStandard").html("✓");
                        $("#fastChargerStandard").removeClass("font-red").addClass("font-green");
                    } else {
                        $("#fastChargerStandard").html("✗");
                        $("#fastChargerStandard").removeClass("font-green").addClass("font-red");
                    }
                } else {

                    if (Number(aData.chargerCount) >= Number(aData.chargerStandard)) {
                        $("#fastChargerStandard").html("✓");
                        $("#fastChargerStandard").removeClass("font-red").addClass("font-green");
                    } else {
                        $("#fastChargerStandard").html("✗");
                        $("#fastChargerStandard").removeClass("font-green").addClass("font-red");
                    }
                }

                //주차면수 대비 충전기 대수 체크
                if (Number(aData.chargerCount) >= Number(aData.chargerStandard)) {
                    $("#parkingCountStandard").html("✓");
                    $("#parkingCountStandard").removeClass("font-red").addClass("font-green");
                } else{
                    $("#parkingCountStandard").html("✗");
                    $("#parkingCountStandard").removeClass("font-green").addClass("font-red");
                }

                if (aData.suitability == '적합') {
                    $("#suitability").removeClass("font-red").addClass("font-green");
                } else {
                    $("#suitability").removeClass("font-green").addClass("font-red");
                }

                $('#suitability').html(aData.suitability);

                var parkingCount;

                if (String(aData.mechanicalOutdoorParkingCount) == "0" && String(aData.mechanicalIndoorParkingCount) == "0") { //기계식 0일 때 자주식만 표기
                    const selfOutdoorParkingCount = Number(aData.selfOutdoorParkingCount);
                    const selfIndoorParkingCount = Number(aData.selfIndoorParkingCount);
                    parkingCount = "총 " + (selfOutdoorParkingCount + selfIndoorParkingCount) + " 외 " + selfOutdoorParkingCount + " 내 " + selfIndoorParkingCount;
                } else {
                    const selfOutdoorParkingCount = Number(aData.selfOutdoorParkingCount);
                    const selfIndoorParkingCount = Number(aData.selfIndoorParkingCount);
                    const mechanicalOutdoorParkingCount = Number(aData.mechanicalOutdoorParkingCount);
                    const mechanicalIndoorParkingCount = Number(aData.mechanicalIndoorParkingCount);
                    parkingCount = "총 " + (selfOutdoorParkingCount + selfIndoorParkingCount + mechanicalOutdoorParkingCount + mechanicalIndoorParkingCount) + " 외 " + selfOutdoorParkingCount + " 내 " + selfIndoorParkingCount
                        + "<br>(기계식 " + (mechanicalOutdoorParkingCount + mechanicalIndoorParkingCount) + ")";
                }
                $('#parkingCount').html(parkingCount);

                $('#buildingDetail').modal('show');

                var maxArea = Math.max(Number(aData.buildingArea), Number(aData.totalArea), Number(aData.platArea));
                var zoomLevel;
                var cameraLevel;
                if (maxArea > 120000) {
                    zoomLevel = 15;
                    cameraLevel = 900;
                } else if (maxArea > 90000 && maxArea < 120000) {
                    zoomLevel = 16;
                    cameraLevel = 800;
                } else if (maxArea > 20000 && maxArea < 90000) {
                    zoomLevel = 17;
                    cameraLevel = 700;
                } else if (maxArea > 5000 && maxArea < 20000) {
                    zoomLevel = 18;
                    cameraLevel = 600;
                } else if (maxArea > 0 && maxArea < 5000) {
                    zoomLevel = 19;
                    cameraLevel = 500;
                }

                getTwPolygonData("/getCtnlgsSpceWFS.json", 'getCtnlgsSpceWFSLayer', 'polygonSample4', aData.pnuCode, aData.landLotNumberAddress, zoomLevel, cameraLevel);
                getChargers(aData.pnuCode);
            });
        }
    })
}

function getTwPolygonData(url, lyrEnName, imgClass, pnuCode, address, zoomLevel, cameraLevel) {

    $.ajax({
        url: "https://api.vworld.kr/req/address?",
        type: "GET",
        dataType: "jsonp",
        data: {
            service: "address",
            request: "GetCoord",
            version: "2.0",
            crs: "EPSG:4326",
            type: "PARCEL",
            address: address,
            format: "json",
            errorformat: "json",
            key: "7E40F84D-DC6B-3185-AB2F-CCD55CEAB3FF"
        },
        success: function (result) {
            console.log(result);

            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify({ pnuCode: String(pnuCode) }),
                contentType: "application/json",
                beforeSend: function () {},
                success: function (res) {
                    var result        = res.result;
                    var areaObject;
                    var polygonList = [];

                    try {
                        for(var i = 0; i < result.length; i ++) {
                            if (result[i].coordinates !== undefined && result[i].coordinates !== '') {
                                var area = result[i].coordinates;

                                var areaList = area.split(' ');
                                var outerPolygon = [];
                                for (var j = 0; j < areaList.length; j++) {
                                    var arr = areaList[j];
                                    arr = arr.split(',').map(arg => parseFloat(arg));
                                    outerPolygon.push(arr);
                                }
                                polygonList.push({polygon: outerPolygon, pnu: result[i].pnu, buldNm: result[i].buldNm, buldDongNm: result[i].buldDongNm, groundFloorCo: result[i].groundFloorCo,
                                    undgrndFloorCo: result[i].undgrndFloorCo, totParkngCo: result[i].totParkngCo ,bbox: result[i].bbox, prmisnDe: result[i].prmisnDe, useConfmDe: result[i].useConfmDe});
                            }
                        }
                    } catch (error) {
                        MsgBox.Alert("polygon");
                    } finally {
                        areaObject = {polygonList: polygonList};
                        DatahubMapObject.createPolygonLayer2(areaObject, lyrEnName, true,  imgClass);
                    }
                }
            }).done(function () {

                var coordTransAddr = new ol.geom.Point([parseFloat(result.response.result.point.x), parseFloat(result.response.result.point.y)]).transform('EPSG:4326', 'EPSG:3857').getCoordinates();
                map.getView().setCenter(coordTransAddr);
                map.getView().setZoom(parseInt(zoomLevel));

                var mapOptions = new vw.MapOptions(
                    vw.BasemapType.GRAPHIC,
                    "",
                    vw.DensityType.FULL,
                    vw.DensityType.BASIC,
                    false,
                    new vw.CameraPosition(
                        new vw.CoordZ(parseFloat(result.response.result.point.x), parseFloat(result.response.result.point.y), cameraLevel),
                        new vw.Direction(-90, 0, 0)
                    ),
                    new vw.CameraPosition(
                        new vw.CoordZ(parseFloat(result.response.result.point.x), parseFloat(result.response.result.point.y), cameraLevel),
                        new vw.Direction(0, -90, 0)
                    )
                );
                map3d = new vw.Map("vMap3d", mapOptions);
            });
        }
    })
}

function getChargers(pnuCode) {
    $('#chargerTable tbody').empty();

    $.ajax({
        url: '/getChargers.json',
        type: "POST",
        data: JSON.stringify({ pnuCode: String(pnuCode) }),
        contentType: "application/json",
        beforeSend: function () {},
        success: function (res) {

            var dataList = res.result;
            // 테이블 행 동적 생성
            for (var i = 0; i < dataList.length; i++) {
                var newRow = $('<tr>');
                newRow.append('<td style="text-align: center;">' + dataList[i].chargingStationName + '</td>');
                newRow.append('<td style="text-align: center;">' + dataList[i].chargerType + '</td>');
                newRow.append('<td style="text-align: center;">' + dataList[i].limitYn + '</td>');
                newRow.append('<td style="text-align: center;">' + dataList[i].agencyName + '</td>');
                newRow.append('<td style="text-align: center;">' + dataList[i].chargerStatus + '</td>');
                newRow.append('<td style="text-align: center;">' + dataList[i].lastChargingEndDate + '</td>');

                $('#chargerTable tbody').append(newRow);
            }
        }
    }).done(function () {
    });
}