<?php
//
// Name: Plugin ACF
// Author: Graffino (http://www.graffino.com)
//


/**
 * Register ACF
 */

// Register option pages
if ( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page();
	acf_add_options_sub_page( 'Global Widgets' );
	acf_add_options_sub_page( 'Social & Contact' );
	acf_add_options_sub_page( 'Page Links' );
	acf_add_options_sub_page( 'API Settings' );
	acf_add_options_sub_page( 'Admin Settings' );
}

if ( function_exists( 'register_options_page' ) ) {
	register_options_page( 'Global Widgets' );
	register_options_page( 'Social & Contact' );
	register_options_page( 'Page Links' );
	register_options_page( 'API Settings' );
	register_options_page( 'Admin Settings' );
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
add_filter( 'acf/load_value/type=textarea', 'text_field_shortcode', 10, 3 );
add_filter( 'acf/load_value/type=text', 'text_field_shortcode', 10, 3 );
