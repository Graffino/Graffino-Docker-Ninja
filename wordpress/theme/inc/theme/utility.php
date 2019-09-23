<?php
//
// Name: Utility
// Author: Graffino (http://www.graffino.com)
//

// Get URL without any vars
function get_current_clean_url() {
	global $wp;
	$wp->remove_query_var( 'paged', 'any' );

	$current_url = home_url( remove_query_arg( array( 'paged' => false ), $wp->request ) );

	return $current_url;
}

// Convert array to list
function convert_array_to_list( $var ) {
	$array = count( $var ) ? $var : array();
	return count( $array ) ? implode( ', ', $array ) : 'Nothing';
}

// Check if debug mode is on
function is_debug() {
	return WP_DEBUG === true;
}

// Enqueue theme assets
function enqueue_theme_assets() {
	wp_enqueue_style( 'main-css', get_template_directory_uri() . '/css/main.css', array(), CACHE_BUSTING );
	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', array(), CACHE_BUSTING );
}
add_action( 'wp_enqueue_scripts', 'enqueue_theme_assets' );
