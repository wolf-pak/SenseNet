var chart;
var maxId = 0;

drawChart();

function requestTemperatureData() {

    $.ajax({
        url: $("#Get").val(),
        type: 'GET',
        datatype: 'json',
        success: function (data) {

            var series = chart.series[0];
            shift = series.data.length > 20; // shift if the series is longer than 20

            var janValues = []
            var count = 0;
            var janListLength = 0;

            var dickValues = []
            var countTwo = 0;
            var dickListLength = 0;

            $.each(data.listData, function (key, model) {

                if (model.Node == 'Jan') {
                    if (model.SensorId == 'temperatureOne') {
                        if (model.Id > maxId) {
                            maxId = model.Id;
                            janValues.push({ x: new Date(model.Time), y: parseFloat(model.Value) });
                        }
                    }
                }

                if (model.Node == 'Dick') {
                    if (model.SensorId == 'temperatureOne') {
                        if (model.Id > maxId) {
                            maxId = model.Id;
                            dickValues.push({ x: new Date(model.Time), y: parseFloat(model.Value) });
                        }
                    }
                }

            });

            if ((janValues.length - 20) > janListLength) {
                janListLength = (janValues.length - 20);
            }


            for (var i = janListLength; i < janValues.length; i++) {
                if (count < 20) {
                    count++;
                    if (janValues[i] != null) {
                        var x = (new Date(janValues[i].x)),
                            y = parseFloat(janValues[i].y)
                        chart.series[0].addPoint([x, y], true, shift);
                    }
                }
            }

            if ((dickValues.length - 20) > dickListLength) {
                dickListLength = (dickValues.length - 20);
            }

            for (var i = dickListLength; i < dickValues.length; i++) {
                if (countTwo < 20) {
                    countTwo++;
                    if (dickValues[i] != null) {
                        var x = (new Date(dickValues[i].x)),
                            y = parseFloat(dickValues[i].y)
                        chart.series[1].addPoint([x, y], true, shift);
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
                    renderTo: 'container', 
                    type: 'spline',
                    marginRight: 10,
                    events: {

                        load: requestData
                    }
                },
                title: {
                    text: 'Live Temperature Data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: '°C'
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
                }, {
                    name: 'Dick',
                    data: []
                }]

            });
        });

    });
}