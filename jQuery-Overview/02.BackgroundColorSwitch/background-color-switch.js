
$(document).ready(function() {
    $('.color-change-form button').click(function() {
        var elementsClass = $('.color-change-form input[type="text"]').val();
        var color = $('.color-change-form input[type="color"]').val();
        
        if(!elementsClass) {
            var elements = $('li:not([class])');
        } else {
            var elements = $('li.' + elementsClass);
        }
        elements.css('background-color', color);
    });
});