var scrollShadow = (function() {
  var elem, width, height, offset,
      shadowTop, shadowBottom,
      timeout;
  
  function initShadows() {
    shadowTop = $("<div>")
      .addClass("shadow-top")
      .insertAfter(elem);
    shadowBottom = $("<div>")
      .addClass("shadow-bottom")
      .insertAfter(elem);
  }
  
  function calcPosition() {
    width = elem.outerWidth();
    height = elem.outerHeight();
    offset = elem.position();  

    // update 
    shadowTop.css({
      width: width + "px",
      top: offset.top + "px",
      left: offset.left + "px"
    });
    shadowBottom.css({
      width: width + "px",
      top: (offset.top + height - 50 + 100) + "px", //100 Ist hardcoded! todo: allgemein //50 ist die schatten groeße aus dem css
      left: offset.left + "px"
    });
  }
  
  function addScrollListener() {
    elem.off("scroll.shadow");
	elem.on("scroll.shadow", function () {
			if (elem.scrollTop() > 0) {
				shadowTop.fadeIn(125);
			} else {
				shadowTop.fadeOut(125);
			}
			if (elem.scrollTop() + height >= elem[0].scrollHeight) {
				shadowBottom.fadeOut(125);
			} else {
        shadowBottom.fadeIn(125);
			}
    });
  }
  
  function addResizeListener() {
    $(window).on("resize.shadow", function(){ 
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        calcPosition();
        elem.trigger("scroll.shadow");
      }, 10);
    });
  }
  
  return {
    init: function(par) {
      elem = $(par);
      initShadows();
      calcPosition();
      addScrollListener();
      addResizeListener();
      elem.trigger("scroll.shadow");
    },
    deinit: function() {
      elem.off("scroll.shadow");
      shadowBottom.remove();
      shadowTop.remove();
      
      clearTimeout(timeout);
      shadowTop = null;
      shadowBottom = null;
      elem = null;
    },
    update: calcPosition
  };
  
}());