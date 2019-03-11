$(function () {
    // Proxy created on the fly
    var data = $.connection.dataHub;

    // Declare a function on the job hub so the server can invoke it

    data.client.displayData = function () {
        getChartData();
    };
    // Start the connection
    $.connection.hub.start();
    getChartData();
});

function getChartData(data) {

    function createPIE() {
        // SET CHART OPTIONS.
        var options = {
            title: 'Test',
            colors: ['#888', 'orange'],
            is3D: true
        };
    }

    $.ajax({
        url: $("#Get").val(),
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            var arrValues = []
            var arrFiltered = []

            $.each(data.listData, function (key, model) {

                arrValues.push({ x: new Date(model.Time), y: parseFloat(model.Value) });
                // console.log(arrValues[1])
            });
            arrValues = arrValues.reverse();
            for (var i = 0; i < 19; i++) {
                arrFiltered.push({ x: new Date(arrValues[i].x), y: parseFloat(arrValues[i].y) });
            }
            drawChart(arrFiltered);
        }
    });
}

function drawChart(data) {

    $(function () {
        $(document).ready(function () {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            var chart;
            chart = new Highcharts.Chart({

                chart: {
                    renderTo: 'container1',
                    type: 'spline',
                    marginRight: 10,
                    events: {

                        load: function () {


                            // set up the updating of the chart each second

                            var series = data;

                        }
                    }
                },
                title: {
                    text: 'Live Node Data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Value'
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
                series:

                    [{
                        name: 'Light Data',
                        data: data
                    }]
            });
        });

    });
}