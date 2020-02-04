<?php

/**
 * ACF class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_ACF {
	public function __construct() {
	}

	/**
	 * Use shortcode inside ACF text area
	 */
	function text_field_shortcode( $value, $post_id, $field ) {
		if ( is_admin() ) {
			return $value;
		}

		return do_shortcode( $value );
	}
}
