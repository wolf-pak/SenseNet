<script src="~/Scripts/Javascript/getTableData.js" type="text/javascript"></script>
<script src="~/Scripts/Javascript/getChartData.js" type="text/javascript"></script>

$(function () {
        // Proxy created on the fly

        var data = $.connection.dataHub;

        // Declare a function on the job hub so the server can invoke it

        data.client.displayData = function () {
            getTableData(data);
            getChartData(data);
        };
        // Start the connection
        $.connection.hub.start();
        getTableData(data);
        getChartData(data);
    });