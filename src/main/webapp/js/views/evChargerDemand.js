var dataTable;
$(document).ready(() => {
    drawTable();
    $('#searchButton').click(function() {
        $('#dataTable').DataTable().ajax.reload();

    });
})

function drawTable () {

    datatable = $('#dataTable').DataTable({
        dom: 'Bfrtip',
        //responsive: true,
        pageLength: 10,
        scrollX: "100%",
        buttons: [

        ],
        destroy: true,
        serverSide: true,
        processing: true,
        lengthChange: false,      // 상단 엔트리 개수 설정 비활성화
        searching: false,         // 검색 기능 숨기기
        ordering: false,          // 정렬 기능 숨기기
        info: false,              //하단 페이지 수 비활성화
        paging: true,            // 페이징 기능 숨기기
        order: [ [ 1, 'desc' ] ],     //order : [ [ 열 번호, 정렬 순서 ], ... ],
        scrollX: "100%",
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
            "processing" : "처리중...",
            "search" : "검색 : ",
            "zeroRecords" : "검색된 데이터가 없습니다.",
            "paginate" : {
                "first" : "첫 페이지",
                "last" : "마지막 페이지",
                "next" : "다음",
                "previous" : "이전"
            },
            "aria" : {
                "sortAscending" : " :  오름차순 정렬",
                "sortDescending" : " :  내림차순 정렬"
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
            {title : "건물명", data: "buildingName"},
            {title : "적합 판단", data: "suitability"},
            {title : "지역", data: "region"},
            {title : "주용도", data: "buildingPurposeCode"},
            {title : "구분", data: "buildingType"},
            {title : "건축 허가일", data: "permissionDate"}
        ]
    })
}