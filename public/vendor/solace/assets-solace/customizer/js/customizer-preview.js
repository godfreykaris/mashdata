/**
 * File customize-preview.js.
 *
 * Instantly live-update customizer settings in the preview for improved user experience.
 */

/* =========================================
============ TABLE OF CONTENTS: ============
* General Color
* General Fonts
========================================= */
(function ($) {

	// =================== (General Color) ===================
	wp.customize("solace_global_colors", function (value) {
		value.bind(function (to) {

			let selector = ".woocommerce ul.products li.product .button, .woocommerce-account .woocommerce form .woocommerce-address-fields button[type=submit], .search-form .search-submit, .woocommerce div.product form.cart .button, .woocommerce ul.products li.product .button, a.wp-block-button__link, body:not(.modal-open) html:not(.wtypc-noscroll) button, input[type='button'], input[type='reset'], input[type='submit'], .menu-item-nav-search.canvas .close-responsive-search, .close-responsive-search svg, .menu-item-nav-search.canvas .close-responsive-search svg,.editor-styles-wrapper .wp-block.wp-block-button .wp-block-button__link, #review_form #respond input#submit, .wc-block-grid__product .wc-block-grid__product-add-to-cart a.add_to_cart_button, body .wc-block-components-totals-coupon-link, .woocommerce .woocommerce-info a, body.woocommerce-account button.woocommerce-Button, .wc-block-components-totals-coupon__content button.wc-block-components-button span,.single-product .summary button.single_add_to_cart_button, body.woocommerce-shop nav.woocommerce-pagination ul li span.current";

			let selectorHover = ".woocommerce ul.products li.product .button:hover, .woocommerce-account .woocommerce form .woocommerce-address-fields button[type=submit]:hover, .search-form .search-submit:hover, .woocommerce div.product form.cart .button:hover, .woocommerce ul.products li.product .button:hover, body:not(.modal-open) html:not(.wtypc-noscroll) button:hover, input[type='button']:hover, input[type='reset']:hover, input[type='submit']:hover, .menu-item-nav-search.canvas .close-responsive-search:hover svg, .close-responsive-search svg:hover, .menu-item-nav-search.canvas .close-responsive-search svg:hover,.editor-styles-wrapper .wp-block.wp-block-button .wp-block-button__link:hover, #review_form #respond input#submit:hover, .wc-block-grid__product .wc-block-grid__product-add-to-cart a.add_to_cart_button:hover, body .wc-block-components-totals-coupon-link:hover, .woocommerce .woocommerce-info a:hover, body.woocommerce-account button.woocommerce-Button:hover, .wc-block-components-totals-coupon__content button.wc-block-components-button span:hover,.initdark:hover, .single-product .summary button.single_add_to_cart_button:hover, body.woocommerce-shop nav.woocommerce-pagination ul li span.current:hover";

			let active = to.activePalette;
			let btnInit = to.palettes[active].colors['sol-color-button-initial'];
			let btnhover = to.palettes[active].colors['sol-color-button-hover'];

			let selectedColorBtnInit = tinycolor(btnInit);
			let contrastRatioBtnInit = tinycolor.readability('#ffffff', selectedColorBtnInit);
			let contrastRatioBtnInitResult = Math.ceil(contrastRatioBtnInit * 10) / 10;

			let selectedColorBtnHover = tinycolor(btnhover);
			let contrastRatioBtnHover = tinycolor.readability('#ffffff', selectedColorBtnHover);
			let contrastRatioBtnHoverResult = Math.ceil(contrastRatioBtnHover * 10) / 10;

			// console.log(contrastRatioBtnHoverResult);

			let mytextBtnInit = '';
			if (contrastRatioBtnInitResult >= 3.3) {
				mytextBtnInit = "dark";

				let selector2 = 'button svg, .menu-item-nav-search.canvas .close-responsive-search svg, form.search-form svg';
				// let selector3 = '.wp-block-button.is-style-outline .wp-block-button__link';
	
				let css = selector + ' { background: ' + btnInit + '; color: #ffffff; }';
				let css2 = selector2 + ' { fill: #ffffff; }';
				// let css4 = selector3 + ' { border-color: ' + btnInit + '!important' + '; color: ' + btnInit + '!important' + '; }';
	
				$('head').append('<style>' + css + '</style>');
				$('head').append('<style>' + css2 + '</style>');
				// $('head').append('<style>' + css4 + '</style>');

			} else {
				mytextBtnInit = "light";

				let selector2 = 'button svg, .menu-item-nav-search.canvas .close-responsive-search svg, form.search-form svg';
				// let selector3 = '.wp-block-button.is-style-outline .wp-block-button__link';
	
				let css = selector + ' { background: ' + btnInit + '; color: #000000; }';
				let css2 = selector2 + ' { fill: #000000; }';
				// let css4 = selector3 + ' { border-color: ' + btnInit + '!important' + '; color: ' + btnInit + '!important' + '; }';
	
				$('head').append('<style>' + css + '</style>');
				$('head').append('<style>' + css2 + '</style>');
				// $('head').append('<style>' + css4 + '</style>');

			}
			// console.log(mytextBtnInit);

			let mytextBtnHover = '';
			if (contrastRatioBtnHoverResult >= 4) {
				mytextBtnHover = "dark";

				let selector2 = 'button:hover svg, form.search-form button:hover svg';
				// let selector3 = '.wp-block-button.is-style-outline .wp-block-button__link:hover';
	
				let bg = btnhover;
				let css1 = selectorHover + ' { background: ' + bg + '!important' + '; }';
				let css2 = selectorHover + ' { color: ' + '#ffffff' + '!important' + '; }';
				let css3 = selector2 + ' { fill: ' + '#ffffff' + '!important' + '; }';
				// let css4 = selector3 + ' { border-color: ' + bg + '!important' + '; color: ' + bg + '!important' + '; }';
	
				$('head').append('<style id="btn-hover-dark1">' + css1 + '</style>');
				$('head').append('<style id="btn-hover-dark2">' + css2 + '</style>');
				$('head').append('<style id="btn-hover-dark2">' + css3 + '</style>');
				// $('head').append('<style id="btn-hover-dark2">' + css4 + '</style>');
	
				// Hover link button
				// let myselector = 'body:not(.woocommerce-page) a.wp-block-button__link:hover';
				// let css = myselector + ' { background: ' + bg + '; color: #ffffff; }';
				// $('head').append('<style>' + css + '</style>');
			} else {
				mytextBtnHover = "light";

				let selector2 = 'button:hover svg, form.search-form button:hover svg';
				// let selector3 = '.wp-block-button.is-style-outline .wp-block-button__link:hover,.editor-styles-wrapper .wp-block.wp-block-button .wp-block-button__link:hover,.rico5';
	
				let bg = btnhover;
				let css1 = selectorHover + ' { background: ' + bg + '!important' + '; }';
				let css2 = selectorHover + ' { color: ' + '#000000' + '!important' + '; }';
				let css3 = selector2 + ' { fill: ' + '#000000' + '!important' + '; }';
				// let css4 = selector3 + ' { border-color: ' + bg + '!important' + '; color: ' + bg + '!important' + '; }';
	
				$('head').append('<style id="btn-hover-light">' + css1 + '</style>');
				$('head').append('<style id="btn-hover-light">' + css2 + '</style>');
				$('head').append('<style id="btn-hover-light">' + css3 + '</style>');
				// $('head').append('<style id="btn-hover-light">' + css4 + '</style>');
	
				// Hover link button
				// let myselector = 'body:not(.woocommerce-page) a.wp-block-button__link:hover';
				// let css = myselector + ' { background: ' + bg + '; color: #000000; }';
				// $('head').append('<style>' + css + '</style>');
			}
			// console.log(mytextBtnHover);		
		});
	});

	// =================== (General Fonts) ===================

	// Heading 1
	wp.customize("solace_h1_font_family_general", function (value) {
		value.bind(function (to) {
			$("h1").css('font-family', to);
		});
	});

	// Heading 2
	wp.customize("solace_h2_font_family_general", function (value) {
		value.bind(function (to) {
			$("h2").css('font-family', to);
		});
	});

	// Heading 3
	wp.customize("solace_h3_font_family_general", function (value) {
		value.bind(function (to) {
			$("h3").css('font-family', to);
		});
	});

	// Heading 4
	wp.customize("solace_h4_font_family_general", function (value) {
		value.bind(function (to) {
			$("h4").css('font-family', to);
		});
	});

	// Heading 5
	wp.customize("solace_h5_font_family_general", function (value) {
		value.bind(function (to) {
			$("h5").css('font-family', to);
		});
	});

	// Heading 6
	wp.customize("solace_h6_font_family_general", function (value) {
		value.bind(function (to) {
			$("h6").css('font-family', to);
		});
	});

	wp.customize('solace_wc_custom_general_star_rating_show', function(value) {
        value.bind(function(newval) {
            if (newval) {
                $('.woocommerce .star-rating, .woocommerce .woocommerce-product-rating').show(); // Show the star rating
            } else {
                $('.woocommerce .star-rating, .woocommerce .woocommerce-product-rating').hide(); // Hide the star rating
            }
        });
    });

	wp.customize('solace_wc_custom_general_star_rating_color', function(value) {
        value.bind(function(newval) {
            $('.woocommerce .star-rating').css('color', newval); // Change the star rating color
        });
    });

	wp.customize('solace_wc_custom_general_product_badges_color', function(value) {
        value.bind(function(newval) {
            $('.woocommerce ul.products .img-wrap span.onsale').css('color', newval); // Change the star rating color
        });
    });

	wp.customize('solace_wc_custom_general_product_badges_background_color', function(value) {
        value.bind(function(newval) {
            $('.woocommerce ul.products .img-wrap span.onsale').css('background-color', newval); // Change the star rating color
        });
    });

	wp.customize('solace_wc_custom_general_store_notice_font_color', function(value) {
        value.bind(function(newval) {
            $('.woocommerce-store-notice, p.demo_store').css('color', newval); // Change the star rating color
        });
    });

	wp.customize('solace_wc_custom_general_store_notice_background_color', function(value) {
        value.bind(function(newval) {
            $('.woocommerce-store-notice, p.demo_store').css('background-color', newval); // Change the star rating color
        });
    });

	wp.customize('solace_wc_custom_general_store_notice_show', function(value) {
		value.bind(function(newval) {
			if (newval) {
				$('.woocommerce-store-notice.demo_store').show();
			} else {
				$('.woocommerce-store-notice.demo_store').hide();
			}
		});
	});

	wp.customize('solace_wc_custom_general_product_badges_shape', function(value) {
        value.bind(function(newval) {
			var css = '';
			var classToAdd = '';
			switch (newval) {
				case 'badge-2':
					classToAdd = 'badge-2';
					break;
				case 'badge-3':
					classToAdd = 'badge-3';
					break;
				case 'badge-1':
				default:
					classToAdd = 'badge-1';
					break;
			}
			document.querySelectorAll('.woocommerce ul.products .img-wrap span.onsale').forEach(function(el) {
				el.classList.remove('badge-1', 'badge-2', 'badge-3');
				el.classList.add(classToAdd);
			});
			document.querySelectorAll('body.single-product .woocommerce-product-gallery__image .onsale').forEach(function(el) {
				el.classList.remove('badge-1', 'badge-2', 'badge-3');
				el.classList.add(classToAdd);
			});
		});
    });

	wp.customize('solace_wc_custom_general_product_badges_label', function(value) {
		value.bind(function(newval) {
			var badges = document.querySelectorAll('.woocommerce ul.products .img-wrap span.onsale');
			
			badges.forEach(function(badge) {
				badge.textContent = newval;
			});

			var singleProductBadges = document.querySelectorAll('body.single-product .woocommerce-product-gallery__image .onsale');
			
			singleProductBadges.forEach(function(badge) {
				badge.textContent = newval;
			});
		});
	});

	wp.customize('solace_wc_custom_general_cart_coupon', function(value) {
		value.bind(function(newval) {
			var couponForms = document.querySelectorAll('.woocommerce-cart .coupon, .woocommerce-cart .wp-block-woocommerce-cart-order-summary-coupon-form-block.wc-block-components-totals-wrapper');
	
			couponForms.forEach(function(couponForm) {
				if (newval) {
					couponForm.style.display = 'flex';
				} else {
					couponForm.style.display = 'none';
				}
			});
		});
	});

	wp.customize( 'solace_wc_custom_general_store_notice_show', function( value ) {
        value.bind( function( newval ) {
            console.log('Store Notice visibility changed:', newval);

            // Pastikan elemen yang diubah sesuai dengan selector yang benar
            var noticeElements = document.querySelectorAll('.woocommerce-shop p.woocommerce-store-notice.demo_store');
            
            noticeElements.forEach(function(noticeElement) {
                if ( newval ) {
                    noticeElement.style.setProperty('display', 'block', 'important');
                } else {
                    noticeElement.style.setProperty('display', 'none', 'important');
                }
            });
        });
    });
		
	// Fix woocommerce pagination border radius.
	wp.customize('solace_product_page_pagination_border_radius', function(value) {
        value.bind(function(newval) {
            $('body.woocommerce-shop nav.woocommerce-pagination ul li span.current').css('borderRadius', newval);
        });
    }); 

	// Site title
	wp.customize('blogname', function(value) {
		value.bind(function(newval) {
			$('.site-title').text(newval);
		});
	});

	// Site tagline
	wp.customize('blogdescription', function(value) {
		value.bind(function(newval) {
			$('.site-description').text(newval);
		});
	});


})(jQuery);
