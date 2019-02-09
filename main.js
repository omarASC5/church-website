 // manual carousel controls
 $('.next').click(function(){ $('.carousel').carousel('next');return false; });
 $('.prev').click(function(){ $('.carousel').carousel('prev');return false; });

 $('#postsCarousel').on('slide.bs.carousel', function () {
	// do something…
  })
