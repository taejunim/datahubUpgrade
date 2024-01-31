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

                getTwPolygonData("/getCtnlgsSpceWFS.json", 'getCtnlgsSpceWFSLayer', 'polygonSample4', aData.pnuCode, aData.landLotNumberAddress);
            });
        }
    })
}

function getTwPolygonData(url, lyrEnName, imgClass, pnuCode, address) {

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

                    console.log(polygonList);
                    areaObject = {polygonList: polygonList};
                    DatahubMapObject.createPolygonLayer2(areaObject, lyrEnName, true,  imgClass);
                }
            }).done(function () {

                var coordTransAddr = new ol.geom.Point([parseFloat(result.response.result.point.x), parseFloat(result.response.result.point.y)]).transform('EPSG:4326', 'EPSG:3857').getCoordinates();
                map.getView().setCenter(coordTransAddr);
                map.getView().setZoom(parseInt(18));

                var mapOptions = new vw.MapOptions(
                    vw.BasemapType.GRAPHIC,
                    "",
                    vw.DensityType.FULL,
                    vw.DensityType.BASIC,
                    false,
                    new vw.CameraPosition(
                        new vw.CoordZ(parseFloat(result.response.result.point.x), parseFloat(result.response.result.point.y), 600),
                        new vw.Direction(-90, 0, 0)
                    ),
                    new vw.CameraPosition(
                        new vw.CoordZ(parseFloat(result.response.result.point.x), parseFloat(result.response.result.point.y), 600),
                        new vw.Direction(0, -90, 0)
                    )
                );
                map3d = new vw.Map("vMap3d", mapOptions);


            });
        }
    })


}