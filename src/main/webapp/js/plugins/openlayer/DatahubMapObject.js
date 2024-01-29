var vWorldKey = '7E40F84D-DC6B-3185-AB2F-CCD55CEAB3FF';
var DatahubMapObject = {
    map: null,
    grid: null,
    selectCellFeatureId: 'selectCell',
    layerNameList: ["locationLayer", "distributionLayer"],
    chargerMarkerList: ["/images/chargers/charger-green.png", '/images/chargers/charger-yellow.png', '/images/chargers/charger-red.png', '/images/chargers/charger-grey.png'],
    setMap: (map) => {
        DatahubMapObject.map = map;
    },
    setGrid: (grid) => {
        DatahubMapObject.grid = grid;
    },
    createLayerCheckbox: (layerBoxName, lyrKoName, lyrEnName) => {
        var html ='<label for="chk'+lyrEnName+'"><input type="checkbox" class="layerChk" id="chk'+lyrEnName+'" value="'+lyrEnName+'" onchange="NamuLayer.layerCheckHandler(this.value)"/>';
        html+='<span>'+lyrKoName+'</span></label>';

        $(layerBoxName).append(html);
    },
    createVworldMapLayer: (title, type, visible, imgType) => {
        var layer = new ol.layer.Tile({ //타일 생성
            title: title + 'Map', //이름
            visible: visible, //보여짐 여부
            type: type, //지도 종류(일반) ---(야간(midnight), 위성(satellite) 등)
            source: new ol.source.XYZ({ //vworld api 사용
                url: 'http://api.vworld.kr/req/wmts/1.0.0/' + vWorldKey + '/' + title + '/{z}/{y}/{x}.' + imgType
            })
        });
        DatahubMapObject.map.addLayer(layer);
        return layer;
    },
    createPointLayer: (list, lyrEnName, visible, markerImageSrc, makeTooltip, markerSize) => {

        //기존에 lyrEnName으로 그려진 layer 존재시 제거
        if(DatahubMapObject.getLayer(lyrEnName) !== undefined) {
            DatahubMapObject.map.removeLayer(DatahubMapObject.getLayer(lyrEnName));
        }

        var markerSource =  new ol.source.Vector({features: DatahubMapObject.makePointSource(list, lyrEnName, visible, markerImageSrc, makeTooltip, markerSize)});

        // 마커 레이어 생성
        var markerLayer = new ol.layer.Vector({
            source: markerSource,
            title : lyrEnName,
            visible: visible
        });
        DatahubMapObject.map.addLayer(markerLayer);
    },
    createPolygonLayer: (lyrEnName, feature, visible) => {
        var polygonSource =  new ol.source.Vector({features: feature});

        var polygonLayer = new ol.layer.Vector({
            source : polygonSource,
            title : lyrEnName,
            visible : visible
        });
        DatahubMapObject.map.addLayer(polygonLayer);
    },
    controlLayerHandler: (layerName) => {
        switch (layerName) {
            case DatahubMapObject.layerNameList[0] :
                DatahubMapObject.getLayer(DatahubMapObject.layerNameList[0]).setVisible(true);
                DatahubMapObject.getLayer(DatahubMapObject.layerNameList[1]).setVisible(false);
                break;
            case DatahubMapObject.layerNameList[1] :
                DatahubMapObject.getLayer(DatahubMapObject.layerNameList[0]).setVisible(false);
                DatahubMapObject.getLayer(DatahubMapObject.layerNameList[1]).setVisible(true);
                break;
            default : break;
        }
    },
    addLayer: (layerName, layer) => {
        layer.set("title", layerName);
        DatahubMapObject.map.addLayer(layer);
    },
    getLayer: (layerName) => {
        return DatahubMapObject.map.getLayers().getArray().find((item) => {
            if (item.get("title") == layerName) {
                return true;
            }
        });
    },
    delLayer: (layerName) => {
        var layer = DatahubMapObject.getLayer(layerName);
        DatahubMapObject.map.removeLayer(layer);
    },
    removeLayer: (source, target) => {
        var array = [];

        DatahubMapObject.map.getLayers().forEach(function (layer) {
            if (layer.get(source) == target) {
                array.push(layer);
            }
        });

        while (array.length) {
            var lastElement = array.pop();
            DatahubMapObject.map.removeLayer(lastElement);
        }
    },
    //오버레이 삭제
    removeOverlay: function(id) {
        this.map.removeOverlay(this.map.getOverlayById(id));
    },
    removeAllOverlay: function (type) {
        var array = [];
        var tooltips = document.querySelectorAll(".overlayElement");

        tooltips.forEach((tooltip) => {
            if (tooltip.dataset.type === type) {
                array.push(tooltip);
            }
        })

        while (array.length) {
            var lastTooltip = array.pop();
            this.removeOverlay(lastTooltip.dataset.uid);
        }
    },
    makePointSource: function (list, title, visible, markerImageSrc, makeTooltip, markerSize) {
        let features = [];
        for(var i = 0; i < list.length; i ++ ) {
            var marker = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(list[i].x), parseFloat(list[i].y)])),    //마커 좌표 설정
                safetyZoneType: list[i].safetyZoneType ? list[i].safetyZoneType : null ,
                address: list[i].address ? list[i].address : null,
                text: makeTooltip && list[i].text ? list[i].text : null,
                zIndex: 50
            });

            if(markerImageSrc !== '') {
                var markerStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: markerSize ? [30, 30] : [10, 10],
                        anchorXUnits: 'pixels',
                        anchorYUnits: 'pixels',
                        opacity: 1,                                              // 마커 투명도 1=100%
                        scale: 0.8,                                              // 크기 1=100%
                        src: markerImageSrc,                                     // 마커 이미지
                        size: markerSize ? markerSize : [20, 20]                  // 마커 사이즈 (기본 [20, 20])
                    }),
                    text: list[i].text !== undefined && list[i].text !== 'undefined' && !makeTooltip ? new ol.style.Text({
                        text: list[i].text,                                      //텍스트를 넘겨주면 넘겨준 텍스트 표시
                        scale: markerSize ? 1 : 0.8,                             //마커 텍스트 크기
                        offsetY: markerSize ? 25 : 10,
                        fill: new ol.style.Fill({                                //마커 텍스트 색
                            color: "black"
                        }),
                        stroke: new ol.style.Stroke({                            //마커 텍스트 테두리
                            color: "#fff",
                            width: 2
                        })
                    }) : null
                });
                marker.setStyle(markerStyle);
            }
            features.push(marker);
        }

        return features; //feature의 집합
    },
    makePolygonSource: function (object, imgClass) {
        var styleSelector = document.querySelector('.'+ imgClass);
        var multiPolygon = new ol.geom.MultiPolygon(object.polygonList);

        var feature = new ol.Feature({
            geometry: multiPolygon,
            zIndex: 3
        });

        var polygonStyle = [
            // 스타일 지정
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: styleSelector !== undefined ? getComputedStyle(styleSelector).color : 'blue',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: styleSelector !== undefined ? getComputedStyle(styleSelector).fill : 'rgba(0,0,255,0.1)'
                })
            })];
        feature.setStyle(polygonStyle);

        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        return [feature];
    },
    setCenter: function (xy, zoom) {
        var coordTransAddr = new ol.geom.Point(xy).transform('EPSG:4326', 'EPSG:3857').getCoordinates();

        DatahubMapObject.map.getView().setCenter(coordTransAddr);
        DatahubMapObject.map.getView().setZoom(parseInt(zoom ? zoom : 16));
    }
};
