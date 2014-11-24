
$(document).ready(function () {

    sliderInit($('.slider'));

});

function sliderInit(slider) {
    var itemsCount = slider.find('.item').length;

    // show first slide on load
    slider.find('.item').first().show();

    if (itemsCount > 1) {
        // slide items every 5 sec
        var slide = autoSlide();

        // arrows click event
        slider.find('.arrow').click(function () {
            slideItem(this);
            clearInterval(slide);
            slide = autoSlide();
        });
    }

    function slideItem(arrow) {
        var elementClass = $(arrow).attr('class');
        var currentSlide = slider.find('.item:visible');
        var currentSlideIndex = slider.find('.item').index(currentSlide);
        var nextSlide;

        if (elementClass.indexOf('left-arrow') > -1) {
            nextSlide = showPreviousSlide();
        } else if (elementClass.indexOf('right-arrow') > -1) {
            nextSlide = showNextSlide();
        }

        // get direction to slide
        var direction = elementClass.split('-')[0];
        var reverseDirection;
        if (direction == 'left') {
            reverseDirection = 'right';
        } else {
            reverseDirection = 'left';
        }

        // slide items
        nextSlide.show('slide', {direction: direction}, 1000);
        currentSlide.hide('slide', {direction: reverseDirection}, 1000);

        function showNextSlide() {
            if (currentSlideIndex == itemsCount - 1) {
                return slider.find('.item').eq(0);
            } else {
                return slider.find('.item').eq(currentSlideIndex + 1);
            }
        }

        function showPreviousSlide() {
            if (currentSlideIndex == 0) {
                return slider.find('.item').eq(itemsCount - 1);
            } else {
                return slider.find('.item').eq(currentSlideIndex - 1);
            }
        }
    }

    function autoSlide() {
        return setInterval(function () {
            slideItem(slider.find('div.right-arrow'));
        }, 5000);
    }
}