<?php

/**
 * Shortcodes class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Shortcodes {
	public function __construct() {
	}

	// Icon Shortcode
	public function icon_shortcode( $atts ) {
		// Attributes
		$atts = shortcode_atts(
			array(
				'name' => '',
			),
			$atts,
			'icon'
		);
		return '<span class="icon -' . $atts['name'] . '"></span>';
	}

	// Strong text Shortcode
	public function strong_text_shortcode( $atts, $content = null ) {
		return '<strong>' . $content . '</strong>';
	}

	// Emphasized text Shortcode
	public function emphasized_text_shortcode( $atts, $content = null ) {
		return '<em>' . $content . '</em>';
	}

	// Emphasized text Shortcode
	public function newline_shortcode( $atts ) {
		return '<br>';
	}
}
