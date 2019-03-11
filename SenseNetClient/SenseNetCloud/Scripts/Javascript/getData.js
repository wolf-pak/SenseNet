
$(function () {
    // Proxy created on the fly
    var data = $.connection.dataHub;
    // Declare a function on the job hub so the server can invoke it

    data.client.displayData = function () {
            getTableData();
        
    };
    // Start the connection
    $.connection.hub.start();
    getTableData();
});

function getTableData() {

    var $tbl = $('#tblInfo');
    $.ajax({
        url: $("#Get").val(),
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            $tbl.empty();
            $.each(data.listData, function (i, model) {
                $tbl.prepend
                    (
                    '<tr>' +
                    '<td>' + model.Id + '</td>' +
                    '<td>' + new Date(model.Time) + '</td>' +
                    '<td>' + model.Value + '</td>' +
                    '<td>' + model.Type + '</td>' +
                    '<td>' + model.Node + '</td>' +
                    '<td>' + model.SensorId + '</td>' +
                    '<tr>'
                    );
            });
        }
    });
}