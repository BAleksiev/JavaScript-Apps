
$(document).ready(function () {
    $('button').click(function () {
        var jsonString = $('textarea').val();
        var data = JSON.parse(jsonString.trim());

        if (data.length > 0) {
            $('body').append('<table></table>');
            $('table').append('<thead><tr></tr></thead><tbody></tbody>');
            
            $.each(data[0], function(k) {
                $('table thead tr').append('<td>' + k + '</td>');
            });
            
            $.each(data, function (k) {
                $('table tbody').append('<tr></tr>');
                var row = $('table tbody tr:last');
                $.each(data[k], function() {
                    row.append('<td>' + this + '</td>');
                });
            });
        }
    });
});