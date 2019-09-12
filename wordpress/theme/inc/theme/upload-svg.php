<?php
//
// Name: Upload SVG file
// Author: Graffino (http://www.graffino.com)
//

add_action( 'upload_mimes', 'my_custom_upload_mimes' );
function my_custom_upload_mimes( $mimes = array() ) {
	// Add a key and value for the SVG file type
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

