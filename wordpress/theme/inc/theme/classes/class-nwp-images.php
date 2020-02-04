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
	}
}
