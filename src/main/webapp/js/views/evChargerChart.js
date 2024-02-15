let evChartObject = {
   root : null,
   chart : null,
   series : null,
   series1 : null,
   gradient : null,
   legend: null,
   xRenderer: null,
   yRenderer: null,
   xAxis : null,
   yAxis : null,
   cursor : null,
   data : [{
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
   }],
    /**
     *  amChart Root 생성 및 소멸 함수 START
     * */
   createRoot: (name) => {

       let scale;

       if (name == "mainChart") {
           scale = 1.2
       } else {
           scale = 1
       }

       evChartObject.root = am5.Root.new(name,
           {
               calculateSize: function(dimensions) {
                   return {
                       width: dimensions.width * scale,
                       height: dimensions.height * scale
                   };
               }
           }
       )
       evChartObject.root._logo.dispose();           // water mark 제거

       evChartObject.root.setThemes([
           am5themes_Animated.new(evChartObject.root)
       ]);

       return evChartObject.root;
   },
    maybeDisposeRoot: (divId) => {
        am5.array.each(am5.registry.rootElements, function(root) {
            if (root != undefined) {
                if (root.dom.id === divId) {
                    root.dispose();
                }
            }
        });
   },
    /**
     *  amChart Root 생성 및 소멸 함수 END
     * */
    createChart: (name) => {
        console.log("name : " + name);
        switch (name) {
            case 'mainChart' :
            evChartObject.chart = evChartObject.root.container.children.push(
                am5percent.PieChart.new(evChartObject.root, {
                    width : am5.percent(100),
                    height : am5.percent(100),
                    centerX : am5.percent(100),
                    x : am5.percent(95),
                    layout : evChartObject.root.verticalLayout
                })
            );
              break;
            case 'CurrentChart' :
            case 'CurrentChart3' :
                evChartObject.chart = evChartObject.root.container.children.push(
                    am5xy.XYChart.new(evChartObject.root, {
                        focusable: true,
                        panX: false,
                        panY: false,
                        wheelX: "none",
                        wheelY: "none",
                        pinchZoomX: true
                    })
                );
                evChartObject.chart.get("colors").set("colors",[
                    am5.color(0xf2c8ed),
                    am5.color(0xbbf7ef),
                    am5.color(0x5aaa95),
                    am5.color(0x86a873),
                    am5.color(0xbb9f06)
                ]);
                evChartObject.chart.get("colors").set("step", 2);
                break;
            case 'CurrentChart1' :
                evChartObject.chart = evChartObject.root.container.children.push(
                    am5xy.XYChart.new(evChartObject.root, {
                    panX: true,
                    panY: false,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    paddingLeft: 0,
                    layout: evChartObject.root.verticalLayout
                }));
                evChartObject.chart.get("colors").set("colors", [
                    am5.color(0xa796fd),
                    am5.color(0x6aeca1)
                ]);
                evChartObject.chart.appear(1000,100);
                break;
            case 'CurrentChart2' :
                evChartObject.chart = evChartObject.root.container.children.push(
                    am5percent.PieChart.new(evChartObject.root, {
                        width : am5.percent(90),
                        height : am5.percent(90),
                        centerX : am5.percent(100),
                        x : am5.percent(95),
                        centerY : am5.percent(105),
                        y : am5.percent(100),
                        radius: am5.percent(100),
                        layout : evChartObject.root.horizontalLayout
                    })
                );
                break;
        }
    },
    customChart: (name) => {
    },
    createSeries: (name) => {
        switch (name) {
            case 'CurrentChart1' :
                evChartObject.series = evChartObject.chart.series.push(am5xy.ColumnSeries.new(evChartObject.root, {
                    name: "USE Time",
                    xAxis: evChartObject.xAxis,
                    yAxis: evChartObject.yAxis,
                    valueYField: "USE Time",
                    categoryXField: "country",
                    clustered: false,
                    tooltip: am5.Tooltip.new(evChartObject.root, {
                        labelText: "USE Time: {valueY}"
                    })
                }));

                evChartObject.series1 = evChartObject.chart.series.push(am5xy.ColumnSeries.new(evChartObject.root, {
                    name: "USE Count",
                    xAxis: evChartObject.xAxis,
                    yAxis: evChartObject.yAxis,
                    valueYField: "USE Count",
                    categoryXField: "country",
                    clustered: false,
                    tooltip: am5.Tooltip.new(evChartObject.root, {
                        labelText: "USE Count: {valueY}"
                    })
                }));
                break;
            default :
                evChartObject.series = evChartObject.chart.series.push(
                    am5percent.PieSeries.new(evChartObject.root, {
                        valueField: "value",
                        categoryField: "EvCharger",
                        endAngle: 270,
                        alignLabels: false
                    })
                );
                evChartObject.series.appear(1000, 100);
                break;
        }

    },
    customSeries: (name) => {
        switch (name) {
            case 'mainChart' :
                evChartObject.series.get("colors").set("colors", [
                    am5.color(0x4b9375),
                    am5.color(0x7d5867)
                ])

                evChartObject.series.states.create("hidden", {
                    endAngle: -90
                });

                evChartObject.series.ticks.template.setAll({
                    stroke: am5.color(0xFFFFFF),
                    strokeWidth: 2
                })

                evChartObject.series.labels.template.adapters.add("text", function(text, target) {
                    if (target.dataItem) {
                        if (target.dataItem.get("valuePercentTotal") < 10) {
                            target.setAll({
                                textType: "aligned",
                                fill: am5.color("#FFFFFF"),
                                text : "{valuePercentTotal.formatNumber('0.0')}%",
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
                                text : "{valuePercentTotal.formatNumber('0.0')}%",
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
                evChartObject.series.slices.template.set("toggleKey", "none");
                evChartObject.series.slices.template.setAll({
                    fillGradient : evChartObject.gradient,
                    fillOpacity: 0.5
                })
                // 차트 데이터 넣는곳
                evChartObject.series.data.setAll([
                    {
                        EvCharger: "적합",
                        value: (normalCnt/totalCnt)
                    }
                    , {
                        EvCharger: "부적합",
                        value: (abnomalCnt/totalCnt)
                    }
                ]);
                break;
            case 'CurrentChart' : break;
            case 'CurrentChart1' :
                evChartObject.series.columns.template.setAll({
                    width: am5.percent(40),
                    tooltipY: 0,
                    strokeOpacity: 0,
                    fillOpacity: 0.5,
                    strokeWidth: 2,
                    cornerRadiusTL: 10,
                    cornerRadiusTR: 10
                });

                evChartObject.series1.columns.template.setAll({
                    width: am5.percent(40),
                    tooltipY: 0,
                    strokeOpacity: 0,
                    cornerRadiusTL: 10,
                    cornerRadiusTR: 10
                });

                evChartObject.series.data.setAll(evChartObject.data);
                evChartObject.series1.data.setAll(evChartObject.data);
                evChartObject.series.appear();
                evChartObject.series1.appear();
                break;
            case 'CurrentChart2' :
                evChartObject.series.get("colors").set("colors", [
                    am5.color(0xF72585),
                    am5.color(0xB5179E),
                    am5.color(0x7209B7),
                    am5.color(0x560BAD),
                    am5.color(0x3B009A),
                    am5.color(0x00B4D8),
                ])

                evChartObject.series.states.create("hidden", {
                    endAngle: -90
                });

                evChartObject.series.labels.template.set("forceHidden", true);

                evChartObject.series.ticks.template.set("forceHidden", true);

                evChartObject.series.slices.template.set("toggleKey", "none");
                // 차트 데이터 넣는곳
                evChartObject.series.data.setAll([
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
                break;
            case 'CurrentChart3' : break;
        }

    },
    createxRenderer: (name) => {
        switch (name) {
            case 'mainChart' : break;
            case 'CurrentChart' :
            case 'CurrentChart3' :
            evChartObject.xRenderer = am5xy.AxisRendererX.new(evChartObject.root, {
                    minGridDistance: 100,
                    minorGridEnabled: true
                });
                evChartObject.xRenderer.labels.template.set('visible',false);
                break;
            case 'CurrentChart1' :
                evChartObject.xRenderer = am5xy.AxisRendererX.new(evChartObject.root, {
                    minGridDistance: 30,
                    minorGridEnabled: true
                });
                evChartObject.xRenderer.grid.template.setAll({
                    location: 1
                });
                break;
            case 'CurrentChart2' : break;
        }
    },
    createxAxis: (name) => {
        switch (name) {
            case 'mainChart': break;
            case 'CurrentChart' :
            case 'CurrentChart3' :
            evChartObject.xAxis = evChartObject.chart.xAxes.push(
                am5xy.DateAxis.new(evChartObject.root, {
                        maxDeviation: 0.1,
                        groupData: false,
                        baseInterval: {
                            timeUnit: "day",
                            count: 1
                        },
                        renderer: evChartObject.xRenderer
                    })
                );
            break;
            case 'CurrentChart1' :
            evChartObject.xAxis = evChartObject.chart.xAxes.push(
                am5xy.CategoryAxis.new(evChartObject.root, {
                categoryField: "country",
                renderer: evChartObject.xRenderer
            }));
            evChartObject.xAxis.get("renderer").labels.template.setAll({
                fill: am5.color(0xFFFFFF)
            });
            evChartObject.xAxis.data.setAll(evChartObject.data);
            break;
            case 'CurrentChart2' : break;
        }
    },
    createyAxis: (name) => {
        evChartObject.yAxis = evChartObject.chart.yAxes.push(am5xy.ValueAxis.new(evChartObject.root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(evChartObject.root, {
                strokeOpacity: 0.1
            })
        }));
        evChartObject.yAxis.get("renderer").labels.template.setAll({
            fill: am5.color(0xFFFFFF)
        });
    },
    createCursor: (name) => {
        switch (name) {
            case 'CurrentChart1' :
                evChartObject.cursor = evChartObject.chart.set("cursor", am5xy.XYCursor.new(evChartObject.root, {
                    xAxis: evChartObject.xAxis,
                    behavior: "none"
                }));
                evChartObject.cursor.lineY.set("visible", false);
                evChartObject.cursor.lineX.set("visible", false);
                break;
            default :
                evChartObject.cursor = evChartObject.chart.set("cursor", am5xy.XYCursor.new(evChartObject.root, {
                xAxis : evChartObject.xAxis,
                behavior: "zoomXY"
                }));
                evChartObject.cursor.lineY.set("visible", false);
                break;
        }

    },
    createGradient: (name) => {
        evChartObject.gradient = am5.LinearGradient.new(evChartObject.root, {
            stops : [{
                color : evChartObject.series.get("fill")
            },{
                color : am5.color(0xFFFFFF),

                opacity : 0.6
            }],
            rotation: 90
        })
    },
    createLegend: (name) => {
        switch (name) {
            case 'mainChart' :
                evChartObject.legend = evChartObject.chart.children.push(am5.Legend.new(evChartObject.root, {
                    layout: evChartObject.root.horizontalLayout,
                    x: am5.percent(100),
                    centerX: am5.percent(85),
                    y : am5.percent(80),
                    centerY: am5.percent(100),
                    useDefaultMarker : true
                }));
                break;
            case 'CurrentChart' :
                evChartObject.legend = evChartObject.chart.children.push(am5.Legend.new(evChartObject.root, {
                    layout: evChartObject.root.horizontalLayout,
                    x: am5.percent(80),
                    centerX: am5.percent(100),
                    y: am5.percent(100),
                    useDefaultMarker : true
                }));
                break;
            case 'CurrentChart1' :
                evChartObject.legend = evChartObject.chart.children.unshift(am5.Legend.new(evChartObject.root, {
                    layout: evChartObject.root.horizontalLayout,
                    x: am5.percent(60),
                    centerX: am5.percent(100),
                    y: am5.percent(5),
                    centerY : am5.percent(100),
                    useDefaultMarker : true
                }));
                break;
            case 'CurrentChart2' :
                evChartObject.legend = evChartObject.chart.children.push(am5.Legend.new(evChartObject.root, {
                    centerX: am5.percent(100),
                    x : am5.percent(105),
                    centerY: am5.percent(60),
                    y : am5.percent(50),
                    layout: evChartObject.root.verticalLayout,
                    useDefaultMarker : true
                }));
                break;
            case "CurrentChart3" :
                evChartObject.legend = evChartObject.chart.children.push(am5.Legend.new(evChartObject.root, {
                    layout: evChartObject.root.horizontalLayout,
                    centerX: am5.percent(100),
                    centerY: am5.percent(100),
                    x: am5.percent(85),
                    y: am5.percent(115),
                    useDefaultMarker : true
                }));
                break;
        }
    },
    customLegend: (name) => {
        // XY CHART 범례 마커 Radius 조정
        evChartObject.legend.markerRectangles.template.setAll({
            cornerRadiusTL: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusBR: 10
        })

        // XY CHART 범례 마커 크기 조정
        evChartObject.legend.markers.template.setAll({
            width : 10,
            height : 10
        })
        // XY CHART 범례 폰트 색상 변경
        evChartObject.legend.labels.template.set('fill' ,
            am5.color(0xFFFFFF)
        )

        evChartObject.legend.valueLabels.template.set("forceHidden", true);
        switch (name) {
            case 'CurrentChart' :
                evChartObject.legend.data.setAll(evChartObject.chart.series.values);  // 밑에 범례 추가시 사용
                break;
            case 'CurrentChart1' :
                evChartObject.legend.data.setAll(evChartObject.chart.series.values);  // 밑에 범례 추가시 사용
                break;
            case 'CurrentChart3' :
                evChartObject.legend.data.setAll(evChartObject.chart.series.values);  // 밑에 범례 추가시 사용
                break;
            default :
                evChartObject.legend.data.setAll(evChartObject.series.dataItems);  // 밑에 범례 추가시 사용
        }
    },
    createBarChart: (name) => {
        evChartObject.createRoot(name);

        evChartObject.createChart(name);

        evChartObject.createxRenderer(name);

        evChartObject.createxAxis(name);

        evChartObject.createyAxis(name);

        evChartObject.createSeries(name);
        evChartObject.customSeries(name);

        evChartObject.createCursor(name);

        evChartObject.createLegend(name);
        evChartObject.customLegend(name);
    },
    createPieChart: (name) => {
        evChartObject.createRoot(name);

        evChartObject.createChart(name);

        evChartObject.createSeries(name);

        evChartObject.createGradient(name);
        evChartObject.customSeries(name);

        evChartObject.createLegend(name);
        evChartObject.customLegend(name);
    },
    createXyChart: (name) => {
        evChartObject.createRoot(name);

        evChartObject.createChart(name);

        evChartObject.createxRenderer(name);

        evChartObject.createxAxis(name);

        evChartObject.createCursor(name);

        switch (name) {
            case "CurrentChart" :
                evChartObject.createAxisAndSeries(20, false, "USE Time");
                evChartObject.createAxisAndSeries(20, true, "USE Count");
                break;
            case "CurrentChart3" :
                evChartObject.createAxisAndSeries(20, false, "이용시간/설치 대수");
                evChartObject.createAxisAndSeries(20, true, "이용시간/이용건 수");
                break;
        }
        evChartObject.chart.appear(1000,100);

        evChartObject.createLegend(name);

        evChartObject.customLegend(name);
    },
    createAxisAndSeries: (startValue, opposite, name) => {
        let yRenderer = am5xy.AxisRendererY.new(evChartObject.root, {
            opposite: opposite
        });
        yRenderer.hide();
        yRenderer.labels.template.set('visible',false);
        let yAxis = evChartObject.chart.yAxes.push(
          am5xy.ValueAxis.new(evChartObject.root, {
              // maxDeviation: 1,
              renderer: yRenderer
          })
        );

        if (evChartObject.chart.yAxes.indexOf(yAxis) > 0) {
            yAxis.set("syncWithAxis", evChartObject.chart.yAxes.getIndex(0));
        }

        let series = evChartObject.chart.series.push(
          am5xy.LineSeries.new(evChartObject.root, {
              name : name,
              xAxis: evChartObject.xAxis,
              yAxis: yAxis,
              valueYField: "value",
              valueXField: "date",
              seriesTooltipTarget : "bullet",
              tooltip: am5.Tooltip.new(evChartObject.root, {
                  pointerOrientation: "horizontal",
                  labelText: "{valueY}",
                  tooltipPosition: "pointer"
              })
          })
        );

        series.fills.template.set("fillGradient", am5.LinearGradient.new(evChartObject.root, {
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
            fillOpacity: 1
        });

        series.strokes.template.setAll({ strokeWidth: 2 });

        yRenderer.grid.template.set("strokeOpacity", 0.05);
        yRenderer.labels.template.set("fill", series.get("fill"));
        yRenderer.setAll({
            stroke: series.get("fill"),
            strokeOpacity: 1,
            opacity: 1
        });

        series.data.processor = am5.DataProcessor.new(evChartObject.root, {
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

        series.data.setAll(evChartObject.generateChartData(startValue));
    },
    generateChartData: (value) => {
        let data = [];
        let firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
        firstDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < 10; i++) {
            let newDate = new Date(firstDate);
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