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

	/**
	 * Change JPEG compression rate - 85 is much more reasonable setting
	 *
	 * @return void
	 */
	function jpeg_compression() {
		return 85;
	}

		/**
	 * Switch processing engine from Imagick to GD
	 *
	 * @return void
	 */
	function switch_processing_engine() {
		return array( 'WP_Image_Editor_GD', 'WP_Image_Editor_Imagick' );
	}

	/**
	 * Set the max image width
	 *
	 * @return void
	 */
	function acf_max_srcset_image_width() {
		return 1920;
	}

	/**
	 * Responsive Image Helper Function
	 *
	 * @param string $image_id the id of the image (from ACF or similar)
	 * @param string $image_size the size of the thumbnail image or custom image size
	 * @param string $max_width the max width this image will be shown to build the sizes attribute
	 */
	public function acf_responsive_image( $image_id, $image_size, $max_width ) {
		// Check the image ID is not blank
		if ( '' !== $image_id ) {
			// Set the default src image size
			$image_src = wp_get_attachment_image_url( $image_id, $image_size );

			// Set the srcset with various image sizes
			$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );

			// Generate the markup for the responsive image
			echo 'src="' . $image_src . '" srcset="' . $image_srcset . '" sizes="(max-width: ' . $max_width . ') 100vw, ' . $max_width . '"';
		}
	}

	/**
	 * Inject SVG Sprite into header
	 *
	 * @return mixed Sprite or false
	 */
	public static function inject_sprite() {
		$sprite = file_get_contents( get_template_directory() . '/icons/sprite.svg' );

		if ( $sprite ) {
			echo '<div class="h-visually-hidden"> ' . $sprite . ' </div>';
		} else {
			return false;
		}
	}

	/**
	 * Inject SVG contents
	 *
	 * @return mixed SVG or false
	 */
	public static function inject_svg( $element, $path = 'icons' ) {
		$sprite = file_get_contents( get_template_directory() . "/$path/" . $element . '.svg' );

		if ( $sprite ) {
			echo $sprite;
		} else {
			return false;
		}
	}

	/**
	 * Get SVG contents
	 *
	 * @return mixed SVG or false
	 */
	public static function get_svg( $element, $path = 'icons' ) {
		$sprite = file_get_contents( get_template_directory() . "/$path/" . $element . '.svg' );

		if ( $sprite ) {
			return $sprite;
		} else {
			return false;
		}
	}
}
