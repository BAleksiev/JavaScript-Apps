
$(document).ready(function () {
    $('button').click(function () {
        var jsonString = $('textarea').val();
        var data = JSON.parse(jsonString.trim());

        if (data.length > 0) {
            $('body').append('<table></table>');
            $('table').append('<thead><tr></tr></thead><tbody></tbody>');
            
            $.each(data, function (k) {
                $('table tbody').append('<tr></tr>');
                var row = $('table tbody tr:last');
                $.each(data[k], function(key) {
                    if(k == 0) {
                        $('table thead tr').append('<td>' + key + '</td>')
                    }
                    row.append('<td>' + this + '</td>');
                });
            });
        }
    });
});