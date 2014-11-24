$(document).ready(function () {

    var _countries = [];

    $.ajaxSetup({
        headers: {
            'X-Parse-Application-Id': 'WX2jT0WQXsoCbwrtolcMqfgd3gRizdMaad2iOa6n',
            'X-Parse-REST-API-Key': '1rH6m96zykLysdB920PAwzssQIfrUYb4PJJm5P2K'
        }
    });

    $.ajax({
        url: 'https://api.parse.com/1/classes/Country',
        method: 'GET'
    }).done(function (data) {
        var table = createTable('countries');
        table.find('thead').append('<tr><td>Country</td><td></td><td></td></tr>');
        $.each(data.results, function (k) {
            var country = data.results[k];
            _countries.push(country);
            var countryCell = $('<td class="country">' + country.name + '</td>');
            var tr = $('<tr id="' + country.objectId + '"><td><button class="edit">Edit</button></td><td><button class="delete">Delete</button></td></tr>');
            table.find('tbody').append(tr);
            tr.prepend(countryCell);

            countryCell.on('click', function () {
                var id = $(this).text();
                getTownsByCountry(id);
            });

            tr.find('button.delete').on('click', function () {
                deleteItem(this, 'country');
            });

            tr.find('button.edit').on('click', function () {
                editItem(this, 'country');
            });
        });

        $('body').append(table);
    });


    $('.options > button').click(function () {
        var action = $(this).attr('class');
        $('.form').show();
        $('.form button').removeClass().addClass(action);
        $('.form input').val('');
        if (action == 'add-town') {
            if ($('.form select').length == 0) {
                var select = $('<select></select>');
                $.each(_countries, function (k) {
                    var option = $('<option value="' + _countries[k].name + '">' + _countries[k].name + '</option>');
                    select.append(option);
                });
                select.insertAfter($('.form input'));
            }
        }
    });

    $('.form button').click(function () {
        var action = $(this).attr('class');
        var inputVal = $('.form input').val();
        var selectedCountry = $('.form select').val();

        if (inputVal.trim().length > 1) {
            var table, className, item, data;

            if (action == 'add-country') {
                table = 'Country';
                className = 'countries';
                item = 'country';

                data = JSON.stringify({
                    name: inputVal
                });
            } else if (action == 'add-town') {
                table = 'Town';
                className = 'towns';
                item = 'town';

                data = JSON.stringify({
                    name: inputVal,
                    country: {
                        __type: 'Pointer',
                        className: 'Country',
                        objectId: selectedCountry
                    }
                });
            }

            $.ajax({
                url: 'https://api.parse.com/1/classes/' + table,
                method: 'POST',
                data: data,
                contentType: 'application/json'
            }).done(function (data) {
                var itemCell = $('<td class="' + item + '">' + inputVal + '</td>');
                var tr = $('<tr id="' + data.objectId + '"><td><button class="edit">Edit</button></td><td><button class="delete">Delete</button></td></tr>');
                tr.prepend(itemCell);
                $('table.' + className).find('tbody').append(tr);

                if (action == 'add-country') {
                    _countries.push(inputVal);
                    itemCell.on('click', function () {
                        var id = $(this).text();
                        getTownsByCountry(id);
                    });
                } else if (action == 'add-town') {
                    var countryCell = $('<td>' + selectedCountry + '</td>');
                    countryCell.insertAfter(itemCell);
                }

                tr.find('button.delete').on('click', function () {
                    deleteItem(this, item);
                });

                tr.find('button.edit').on('click', function () {
                    editItem(this, item);
                });

                $('.form').hide();
            });
        }
    });

    function deleteItem(btn, item) {
        var id = $(btn).parent().parent().attr('id');
        var table;

        if (item == 'country') {
            table = 'Country';
        } else if (item == 'town') {
            table = 'Town';
        }

        $.ajax({
            url: 'https://api.parse.com/1/classes/' + table + '/' + id,
            method: 'DELETE'
        }).done(function (data) {
            $('#' + id).remove();
        });
    }

    function editItem(btn, item) {
        var table;

        if (item == 'country') {
            table = 'Country';
        } else if (item == 'town') {
            table = 'Town';
        }

        var state = $(btn).attr('class');
        var tr = $(btn).parent().parent();
        var td = tr.find('.' + item);
        var itemName = td.text();

        if (state == 'edit') {
            td.html('<input type="text" value="' + itemName + '"/>');
            td.find('input').focus();
            $(btn).removeClass().addClass('save').text('Save');

        } else if (state == 'save') {
            var id = tr.attr('id');
            var newName = td.find('input').val();

            $.ajax({
                url: 'https://api.parse.com/1/classes/' + table + '/' + id,
                method: 'PUT',
                data: JSON.stringify({
                    name: newName
                }),
                contentType: 'application/json'
            }).done(function (data) {
                td.html(newName);
                $(btn).removeClass().addClass('edit').text('Edit');
            });
        }
    }

    function getTownsByCountry(country) {
        $.ajax({
            url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + country + '"}}',
            method: 'GET'
        }).done(function (data) {
            $('table.towns').remove();
            var table = createTable('towns');
            table.find('thead').append('<tr><td>Town</td><td>Country</td><td></td><td></td></tr>');
            $.each(data.results, function (k) {
                var town = data.results[k];
                var tr = $('<tr id="' + town.objectId + '"><td class="town">' + town.name + '</td><td>' + town.country.objectId + '</td><td><button class="edit">Edit</button></td><td><button class="delete">Delete</button></td></tr>');
                table.find('tbody').append(tr);

                tr.find('button.delete').on('click', function () {
                    deleteItem(this, 'town');
                });

                tr.find('button.edit').on('click', function () {
                    editItem(this, 'town');
                });
            });

            $('body').append(table);
        });
    }

    function createTable(className) {
        return $('<table class="' + className + '"><thead></thead><tbody></tbody></table>');
    }
});