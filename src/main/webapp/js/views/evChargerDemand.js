var dataTable;
$(document).ready(() => {
    drawTable();
    $('#searchButton').click(function() {
        $('#dataTable').DataTable().ajax.reload();

    });
})

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
            {title : "적합 판단", data: "suitability"},
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
                /*let value = $(event.relatedTarget)
                let modal = $(this)

                modal.find('.modal-title').text(value.data('title'))

                let data = new Object

                data.userType = value.data('code');
                data.title = value.data('title');

                drawTable(data);*/
                console.log(aData)
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
                $('#chargerCount').html(aData.chargerCount);
                $('#chargerStandard').html(aData.chargerStandard);

                var suitability;
                if (aData.suitability == "Y") {
                    suitability = "적합"
                } else {
                    suitability = "부적합"
                }
                $('#suitability').html(suitability);

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
            });
        }

    })
}