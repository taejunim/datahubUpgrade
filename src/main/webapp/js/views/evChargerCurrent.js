$(document).ready(() => {
    createXyChart("CurrentChart");
    createBarChart("CurrentChart1");




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
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        function createAxisAndSeries(startValue, opposite, name) {
            let yRenderer = am5xy.AxisRendererY.new(root, {
                opposite: opposite
            });
            yRenderer.labels.template.set('visible',false);
            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 1,
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

            series.strokes.template.setAll({ strokeWidth: 1 });

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

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    radius : 4,
                    fill : series.get("fill")
                })
            })

            series.data.setAll(generateChartData(startValue));
        }

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis,
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);
        cursor.lineX.set("visible", false);

        createAxisAndSeries(20, false, "USE Time");
        createAxisAndSeries(20, true, "USE Count");

        chart.appear(1000, 100);

        var legend = chart.children.push(am5.Legend.new(root, {
            layout: root.horizontalLayout,
            x: am5.percent(100),
            centerX: am5.percent(100),
            y: am5.percent(100)
        }));

        legend.markerRectangles.template.setAll({
            cornerRadiusTL : 10,
            cornerRadiusBL : 10
        })

        legend.labels.template.set('fill' , {
            fill: am5.color(0x8d8f94)
        })

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
            minGridDistance: 70,
            minorGridEnabled: true
        });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {
                themeTags: ["axis"],
                animationDuration: 200
            })
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
            name: "Income",
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
            width: am5.percent(50),
            tooltipY: 0,
            strokeOpacity: 0,
            fillOpacity: 0.5,
            strokeWidth: 2,
            cornerRadiusTL: 10,
            cornerRadiusTR: 10
        });



        series.data.setAll(data);


        var series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Income",
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
            width: am5.percent(50),
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

    }
})