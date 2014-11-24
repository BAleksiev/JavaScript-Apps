(function($) {
    $.fn.treeview = function() {
        
        var $this = $(this);
        
        $this.find('li > ul').hide();
        
        var lists = $this.find('li:has(ul) span');
        
        lists.click(function() {
            var subList = $(this).next('ul').first();
            if(subList.is(':visible')) {
                subList.hide();
            } else {
                subList.show();
            }
        });
		
		return $this;
    };
}(jQuery));