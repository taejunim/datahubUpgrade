$(document).ready(() => {

    createPieChart("mainChart");

    function createPieChart(name) {
        let root = createRoot(name);

        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                width : am5.percent(50),
                height : am5.percent(50),
                layout : root.verticalLayout
            })
        );

        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "EvCharger",
                endAngle: 270,
                alignLabels: false,
                legendLabelText : "[{fill}]{category}[/]"
            })
        );

        series.get("colors").set("colors", [
            am5.color(0xbae1ff),
            am5.color(0xffb3ba)
        ])

        series.states.create("hidden", {
            endAngle: -90
        });

        series.labels.template.setAll({
            fill : am5.color("#FFFFFF"),
            inside : true
        })

        series.slices.template.set("toggleKey", "none");

        series.data.setAll([
            {
                EvCharger: "적합",
                value: (4000/7000)
            }
            , {
                EvCharger: "부적합",
                value: (3000/7000)
            }
        ]);

        let legend = chart.children.push(am5.Legend.new(root, {
            layout: root.horizontalLayout,
            x: am5.percent(100),
            centerX: am5.percent(75)
        }))

        legend.markerRectangles.template.setAll({
            cornerRadiusTL : 10,
            cornerRadiusTR : 10,
            cornerRadiusBL : 10,
            cornerRadiusTR : 10
        })

        legend.valueLabels.template.set("forceHidden", true);

        legend.data.setAll(series.dataItems);  // 밑에 범례 추가시 사용

        series.appear(1000, 100);
    }
})