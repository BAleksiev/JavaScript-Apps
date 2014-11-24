
$(document).ready(function () {
    $('button').click(function () {
        var jsonString = $('textarea').val();
        var data = JSON.parse(jsonString.trim());

        if (data.length > 0) {
            $('body').append('<table></table>');
            $('table').append('<thead></thead><tbody></tbody>');
            $('table thead').append('<tr><td>Manufacturer</td><td>Model</td><td>Year</td><td>Price</td><td>Class</td></tr>')
            
            $.each(data, function () {
                $('table tbody').append('<tr></tr>');
                var row = $('table tbody tr:last');
                row.append('<td>' + this.manufacturer + '</td>')
                        .append('<td>' + this.model + '</td>')
                        .append('<td>' + this.year + '</td>')
                        .append('<td>' + this.price + '</td>')
                        .append('<td>' + this.class + '</td>');
            });
        }
    });
});