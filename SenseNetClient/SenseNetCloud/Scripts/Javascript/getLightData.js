function getLightData() {

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
            var nodeTwoValues = []
            var nodeThreeValues = []
            var nodeFourValues = []


            var arrFilteredOne = []
            var arrFilteredTwo = []
            var arrFilteredThree = []


            $.each(data.listData, function (key, model) {
                //     nodeFourValues.unshift({ x: new Date(model.Time), y: parseFloat(model.Value), z: model.Node, c: model.sensorId });

                if (model.Node == 'Jan') {
                    if (model.SensorId == 'lightOne') {
                        nodeOneValues.unshift(model);
                    }

                }
                if (model.Node == 'Dick') {
                    if (model.SensorId == 'lightOne') {
                        nodeTwoValues.unshift(model);
                    }

                }
                if (model.Node == 'Joe') {
                    if (model.SensorId == 'lightOne') {
                        nodeThreeValues.unshift(model);
                    }

                }

            });


            for (var i = 0; i < 5; i++) {

                arrFilteredOne.push({ x: new Date(nodeOneValues[i].Time), y: parseFloat(nodeOneValues[i].Value) });
                arrFilteredTwo.push({ x: new Date(nodeTwoValues[i].Time), y: parseFloat(nodeTwoValues[i].Value) });
                arrFilteredThree.push({ x: new Date(nodeThreeValues[i].Time), y: parseFloat(nodeThreeValues[i].Value) });





            }


            drawChart(arrFilteredOne, arrFilteredTwo, arrFilteredThree);
        }
    });
}

function drawChart(dataOne, dataTwo, dataThree) {

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
                             var series = []
                             series[0] = dataOne;
                             series[1] = dataTwo;
                             series[2] = dataThree;

                        }
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
                series:

                    [{
                        name: 'Jan',
                        data: dataOne
                    }, {
                        name: 'Dick',
                        data: dataTwo

                    }, {
                        name: 'Joe',
                        data: dataThree
                    }]
            });
        });

    });
}