<?php
//
// Name: Remove Admin Bar
// Author: Graffino (http://www.graffino.com)
//


// Icon Shortcode
add_shortcode( 'icon', 'icon_shortcode' );
function icon_shortcode( $atts ) {
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
add_shortcode( 'bold', 'strong_text_shortcode' );
function strong_text_shortcode( $atts, $content = null ) {
	return '<strong>' . $content . '</strong>';
}

// Emphasized text Shortcode
add_shortcode( 'italic', 'emphasized_text_shortcode' );
function emphasized_text_shortcode( $atts, $content = null ) {
	return '<em>' . $content . '</em>';
}

// Emphasized text Shortcode
add_shortcode( 'newline', 'newline_shortcode' );
function newline_shortcode( $atts ) {
	return '<br>';
}

