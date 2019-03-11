function getTableData(data) {

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