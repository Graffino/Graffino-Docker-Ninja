<?php

/**
 * Setup class to initialize all WordPress customisations
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Setup {
	public function __construct() {
		self::disable_curl_ssl_verification();
	}

	/**
	 * Fixes WordPress SSL update error
	 */
	protected static function disable_curl_ssl_verification() {
		add_filter( 'https_ssl_verify', '__return_false' );
		add_filter( 'https_local_ssl_verify', '__return_false' );
		return $this;
	}
}
