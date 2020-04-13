<?php

/**
 * Images class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Images {
	public function __construct() {
	}

	/**
	 * Register post thumbnails
	 */
	public function nwp_images() {
		add_theme_support( 'post-thumbnails' );

		// Default
		set_post_thumbnail_size( 160, 112, true );

		// Post
		add_image_size( 'post-regular', 720, 320, false );

		// Customer
		add_image_size( 'customer', 405, 458, true );
		add_image_size( 'customer-retina', 810, 920, true );
		add_image_size( 'customer-375', 230, 272, true );
		add_image_size( 'customer-retina-375', 560, 667, true );

		//Quote
		add_image_size( 'quote', 534, 635, true );
		add_image_size( 'quote-retina', 1068, 1272, true );
		add_image_size( 'quote-375', 229, 272, true );
		add_image_size( 'quote-retina-375', 558, 664, true );
	}
}
