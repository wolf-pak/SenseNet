$(function () {
    // Proxy created on the fly
    var data = $.connection.dataHub; // IOm samma fil refererar data alltid till denna nu

    // Declare a function on the job hub so the server can invoke it

    data.client.displayData = function () {
        getChartData(); // OM de ligger i olika filer skicka in denna data här, nu när de är i samma fil hittar den vår data direkt.
    };
    // Start the connection
    $.connection.hub.start();
    getChartData();
});

function getChartData() {

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

            var nodeOneValues = []
            var please = []
            var nodeTwoValues = []
            var nodeThreeValues = []
            var nodeFourValues = []
            //nodeFourValues[0] = []

            var arrFiltered = []


            $.each(data.listData, function (key, model) {
                nodeFourValues.unshift({ x: new Date(model.Time), y: parseFloat(model.Value), z: model.Node, c: model.sensorId });

                //nodeFourValues[0][0].unshift(new Date(model.Time))
                //nodeFourValues[0][1].unshift(parseFloat(model.Value))
            });

            /* for (var i = 0; i < nodeFourValues[0].length; i++) {
                 if (nodeFourValues[0][i].z.equals('Jan') && nodeFourValues[0][i].c.equals('lightOne')) {
                     for (var j = 0; j < 19; j++) {
                         nodeOneValues.unshift({ x: new Date(nodeFourValues[0][i].x), y: parseFloat(nodeFourValues[0][i].y) });
                     }
                 }               
             } */

            //nodeFourValues = nodeFourValues.reverse();
            /*for (var j = 0; j < nodeFourValues.length; j++) {
                for (var k = 0; k < nodeFourValues[k].length; k++) {
                    arrFiltered.push({ x: new Date(nodeFourValues[j][k]), y: parseFloat(nodeFourValues[j][++k]) });
                }
            } */
            for (var i = 0; i < 19; i++) {
               // if (nodeFourValues[i].z == "Dick") {
                    arrFiltered.push({ x: new Date(nodeFourValues[i].x), y: parseFloat(nodeFourValues[i].y) });
             //   }

            }


            drawChart(arrFiltered);
        }
    });
}

function drawChart(dataOne) {

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

                            //var series = dataOne; //Denna gör nada heller 

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
                        data: dataOne
                    }]
            });
        });

    });
}