//$(function () {
//    // Proxy created on the fly
//    var data = $.connection.dataHub;
//    // Declare a function on the job hub so the server can invoke it

//    data.client.displayData = function () {
//        getChartData();
//    };
//    // Start the connection
//    $.connection.hub.start();
//    getChartData();
//});

function getChartData() {

    // VISUALIZATION API AND THE PIE CHART PACKAGE.
    //google.load("visualization", "1", { packages: ["corechart"] });
    //google.setOnLoadCallback(createPIE);

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

            $.each(data.listData, function (key, model) {

                arrValues.push({ x: new Date(model.Time), y: parseFloat(model.Value) });
               // console.log(arrValues[1])
            });

            data = arrValues;
        }
     });
}
