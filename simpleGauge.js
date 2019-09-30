(function($) {

    $.fn.simpleGauge = function(options) {

		// Defaults

        var defaults = {
			width: '200',
			hueLow: '1', // Choose the starting hue for the active color (for value 0)
			hueHigh: '128', // Choose the ending hue for the active color (for value 100)
			saturation: '100%', // Saturation for active color
			lightness: '50%', // Lightness for active color
			gaugeBG: '#1b1b1f', // Background color of Gauge
			parentBG: '#323138' // This color should match the parent div of the gauge (or beyond)
        };

		var settings = $.extend({}, defaults, options);

		$(this).each(function(){

			// Color & Data Settings
			var p = $(this);
			var value = $(this).data('value');
			var activeColor = '';

			

			// Add DOM to allow for CSS3 Elements (would have been more elegant to use :before & :after pseudo-elements, but jQuery doesn't support them)

			$(this).prepend('<div class="gauge-wrap-before"></div><div class="gauge-core"><div class="gauge-bg"></div><div class="gauge-active-wrap"><div class="gauge-active"><div class="gauge-active-before"></div></div></div><div class="gauge-cap"></div></div><div class="gauge-wrap-after"></div>');

			// Set Colors


			$(this).find('.gauge-bg, .gauge-wrap-after').css('background-color', settings.gaugeBG);
			$(this).find('.gauge-cap').css('background-color', settings.parentBG);

			// Fill Gauge to match value
			
			jQuery({ counter: 0 }).animate({ counter: p.attr("data-value")}, {
				duration: 1000,
				easing: "swing",
				step: function() {
					if ( settings.hueHigh >= settings.hueLow ) {
						activeColor = settings.hueHigh - ( ( settings.hueHigh - settings.hueLow ) * ( this.counter / 100 ) ) + settings.hueLow;
					} else {
						activeColor = ( ( settings.hueLow - settings.hueHigh ) * ( this.counter / 100 ) ) + settings.hueHigh;
					}
					p.find('.gauge-active, .gauge-wrap-before').css('background-color', 'hsla(' + Math.round(activeColor) + ', ' + settings.saturation + ', ' + settings.lightness + ', 1)');
					p.find('.gauge-active-wrap').css({
						'-webkit-transform': 'rotate(' + (this.counter * 1.8) + 'deg)',
						'-moz-transform': 'rotate(' + (this.counter * 1.8) + 'deg)',
						'-ms-transform': 'rotate(' + (this.counter * 1.8) + 'deg)',
						'-o-transform': 'rotate(' + (this.counter * 1.8) + 'deg)',
						'transform': 'rotate(' + (this.counter * 1.8) + 'deg)',
					});
				}
			});
			


		});

    };

})(jQuery);
