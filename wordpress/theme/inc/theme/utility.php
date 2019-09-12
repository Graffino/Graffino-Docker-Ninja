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

// Get version
function get_version() {
	$package_json = file_get_contents( get_template_directory() . '/version.php' );
	return $package_json;
}

// Check if debug mode is on
function is_debug() {
	return WP_DEBUG === true;
}

// Return minified version of file if debug is false
function asset_output( $asset, $extension ) {
	if ( is_debug() ) {
		$return = $asset . '.' . $extension . '?v=' . get_version();
	} else {
		$return = $asset . '.min.' . $extension . '?v=' . get_version();
	}
	echo $return;
}
