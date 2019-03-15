var chart;
var maxId = 0;

drawChart();

function requestData() {

    $.ajax({
        url: $("#Get").val(),
        type: 'GET',
        datatype: 'json',
        success: function (data) {

            var series = chart.series[0];
            shift = series.data.length > 20; // shift if the series is longer than 20

            var janValues = []
            var count = 0;
            var listLength = 0;

            $.each(data.listData, function (key, model) {

                if (model.Node == 'Jan') {
                    if (model.SensorId == 'lightOne') {
                        if (model.Id > maxId) {
                            maxId = model.Id;
                            janValues.push({ x: new Date(model.Time), y: parseFloat(model.Value) });
                        }
                    }
                }

            });

            if ((janValues.length - 20) > listLength) {
                listLength = (janValues.length - 20);
            }

            for (var i = listLength; i < janValues.length; i++) {
                if (count < 20) {
                    count++;
                    if (janValues[i] != null) {
                        var x = (new Date(janValues[i].x)),
                            y = parseFloat(janValues[i].y)
                        chart.series[0].addPoint([x, y], true, shift);
                    }
                }
            }
            //setTimeout(requestData, 1000);   
        },
        cache: false

    });

}

function drawChart() {

    $(function () {
        $(document).ready(function () {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            chart = new Highcharts.Chart({

                chart: {
                    renderTo: 'container1',
                    type: 'spline',
                    marginRight: 10,
                    events: {

                        load: requestData
                    }
                },
                title: {
                    text: 'Live Light Data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Light Level'
                    },
                    gridLineWidth: 0,
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Jan',
                    data: []
                }]

            });
        });

    });
}