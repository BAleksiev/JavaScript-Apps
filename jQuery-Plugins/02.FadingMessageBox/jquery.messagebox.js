(function ($) {
    $.fn.messageBox = function () {

        var $this = $(this);

        function success(msg) {
            var $box = $('<div class="box"></div>').text(msg).addClass('success');
            $this.append($box);
            $box.animate({
                opacity: 1
            }, 1000);
            hideBox($box);
        }

        function error(msg) {
            var $box = $('<div class="box"></div>').text(msg).addClass('error');
            $this.append($box);
            $box.animate({
                opacity: 1
            }, 1000);
            hideBox($box);
        }

        function hideBox(box) {
            setTimeout(
                function () {
                    box.remove();
                }, 3000);
        }

        return {
            success: success,
            error: error
        };
    };
}(jQuery));