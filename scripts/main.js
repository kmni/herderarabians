$(document).ready(function() {

//
//carousel
//
$(function() {
	$('.jcarousel').jcarousel();

	$('.jcarousel-control-prev')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '-=1'
		});

	$('.jcarousel-control-next')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '+=1'
		});
});

//
// gallery - all the magic is in the CSS
// here we are just switching classes a resizing images to fit
//
(function() {
	var $wrap = $(".gallery"),
		$main = $wrap.find(".mainStage"),
		$items = $main.find(".item"),
		$next = $main.find(".next"),
		$prev = $main.find(".prev"),
		$previews = $wrap.find(".previewStage .preview"),
		index = 0,
		moving = false,
		interval = 5000,
		timeout, resizeTimeout,
		middleWidth,
		middleHeight;
	
	//resize images
	$(window).resize(function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			middleWidth = $items.filter(".middle").width();
			middleHeight = $items.filter(".middle").height();
			
			$items.each(function() {
				var $item = $(this),
					$img = $item.children("img"),
					img = $img.get(0),
					imgWidth = img.naturalWidth,
					imgHeight = img.naturalHeight;
				
				if (middleWidth / middleHeight > imgWidth / imgHeight) {
					$img.css({
						width: middleWidth,
						height: ""
					});
				} else {
					$img.css({
						height: middleHeight,
						width: ""
					});
				}
			});
		}, 200);
	}).resize();
	
	//move on click
	$next.click(function() {
		if (moving) {
			return;
		}
		
		moving = true;
		
		$items.eq(index).removeClass("middle").addClass("left");
		$items.eq((index + 1) % $items.length).removeClass("right").addClass("middle");
		$items.eq((index + 2) % $items.length).removeClass("rightBack").addClass("right");
		$items.eq((index + 3) % $items.length).addClass("rightBack");
		$items.eq((index - 1) % $items.length).removeClass("left").addClass("leftBack");
		$items.eq((index - 2) % $items.length).removeClass("leftBack");
		
		$previews.eq(index).removeClass("active");
		
		index = (index + 1) % $items.length;
		
		$previews.eq(index).addClass("active");
		
		$wrap.delay(500).queue(function() {
			//autoslide();
			moving = false;
			$wrap.dequeue();
		});
	});
	
	$prev.click(function() {
		if (moving) {
			return;
		}
		
		moving = true;
		
		$items.eq(index).removeClass("middle").addClass("right");
		$items.eq((index - 1) % $items.length).removeClass("left").addClass("middle");
		$items.eq((index - 2) % $items.length).removeClass("leftBack").addClass("left");
		$items.eq((index - 3) % $items.length).addClass("leftBack");
		$items.eq((index + 1) % $items.length).removeClass("right").addClass("rightBack");
		$items.eq((index + 2) % $items.length).removeClass("rightBack");
		
		$previews.eq(index).removeClass("active");
		
		index = (index - 1) % $items.length;
		
		$previews.eq(index).addClass("active");
		
		$wrap.delay(500).queue(function() {
			//autoslide();
			moving = false;
			$wrap.dequeue();
		});
	});
	
	$items.click(function() {
		var $this = $(this);
		
		if ($this.hasClass("right")) {
			$next.click();
		}
		
		if ($this.hasClass("left")) {
			$prev.click();
		}
	});
	
	//click on preview
	$previews.click(function() {
		var id = $previews.index(this);
		
		if (id === index) { //if clicked on active image
			return;
		}
		
		if (id === (index - 1) % $items.length) { //if prev
			$prev.click();
		} else if (id === (index + 1) % $items.length) { //if next
			$next.click();
		} else {
			$previews.eq(index).removeClass("active");
			$classed()
				.addClass("hiding")
			.eq(0)
				.delay(300)
				.queue(function() {
					$classed()
						.removeClass("middle left right leftBack rightBack")
						.removeClass("hiding");
					
					$items.eq(id).addClass("showing middle");
					$items.eq((id - 1) % $items.length).addClass("showing left");
					$items.eq((id - 2) % $items.length).addClass("showing leftBack");
					$items.eq((id + 1) % $items.length).addClass("showing right");
					$items.eq((id + 2) % $items.length).addClass("showing rightBack");
					
					index = id;
					
					$previews.eq(index).addClass("active");
					
					$classed().eq(0).delay(300).queue(function() {
						$classed().removeClass("showing");
						
						$(this).dequeue();
					});
					
					$(this).dequeue();
				});
		}
	});
	
	function $classed() {
		return $items.eq(index)
				.add($items.eq((index - 1) % $items.length))
				.add($items.eq((index - 2) % $items.length))
				.add($items.eq((index + 1) % $items.length))
				.add($items.eq((index + 2) % $items.length));
	}
	
//	function autoslide() {
//		clearTimeout(timeout);
//		
//		timeout = setTimeout(function() {
//			$next.click();
//		}, interval);
//	}
//	
//	autoslide();
}());

//
// magnific popup
//
(function() {
	//photos
	$(".horses .horse .photos").each(function() {
		var $this = $(this),
			photos = [ ],
			$items = $this.parent().parent().children(".photosBox").children("img");

		$items.each(function() {
			photos.push({ src: this.src, type: "image" });
		});

		$this.magnificPopup({
			type: "image",
			items: photos,
			showCloseBtn: true,
			gallery: {
				enabled: true
			}
		});
	});
	
	//pedigree
	$(".horses .horse .pedigree").each(function() {
		var $this = $(this),
			$box = $this.parent().parent().children(".pedigreeBox");

		$this.magnificPopup({
			type: "inline",
			items: {
				src: $box
			},
			showCloseBtn: true
		});
	});
	
	//pedigree
	$(".horses .horse .video").each(function() {
		var $this = $(this),
			$box = $this.parent().parent().children(".videoBox");

		$this.magnificPopup({
			type: "inline",
			items: {
				src: $box
			},
			showCloseBtn: true
		});
	});
}());

});