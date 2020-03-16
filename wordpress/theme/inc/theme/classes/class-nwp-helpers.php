<?php

/**
 * Class Helpers
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Helpers
{
	// global $template;
	public function __construct() {
	}

	public function get_template() {
		global $template;
		return basename( $template );
	}
}
