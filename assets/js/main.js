(function($) {
	var $window = $(window),
		$body = $('body'),
		$main = $('#site');

	window.onload = function() {
		scrolly();
	};

	// // Play initial animations on page load.
	// 	$window.on('load', function() {
	// 		window.setTimeout(function() {
	// 			$body.removeClass('is-preload');
	// 		}, 100);
	// 	});

	// Nav.
	var $nav = $('#nav');

	if ($nav.length > 0) {
		// Links.
		var $nav_a = $nav.find('a');

		$nav_a
			.on('click', function() {
				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#') return;

				// Deactivate all links.
				$nav_a.removeClass('active').removeClass('active-locked');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this.addClass('active').addClass('active-locked');
			})
			.each(function() {
				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1) return;

				// Scrollex.
				$section.scrollex({
					top: '-5vh',
					mode: 'top',
					initialize: function() {
						// Deactivate section.
						$section.addClass('inactive');
					},
					enter: function() {
						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($nav_a.filter('.active-locked').length == 0) {
							$nav_a.removeClass('active');
							$this.addClass('active');
						} else if ($this.hasClass('active-locked'))
							// Otherwise, if this section's link is the one that's locked, unlock it.
							$this.removeClass('active-locked');
					}
				});
			});
	}
})(jQuery);
