<?php

/**
 * Utilities class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Utilities {
	public function __construct() {
	}

	/**
	 * Get URL without any vars
	 *
	 * @return void
	 */
	public static function get_current_clean_url() {
		global $wp;
		$wp->remove_query_var( 'paged', 'any' );

		$current_url = home_url( remove_query_arg( [ 'paged' => false ], $wp->request ) );

		return $current_url;
	}

	/**
	 * Convert array to list
	 *
	 * @param array $var
	 * @return void
	 */
	public function convert_array_to_list( $var ) {
		$array = count( $var ) ? $var : [];
		return count( $array ) ? implode( ', ', $array ) : 'Nothing';
	}

	/**
	 * Check if debug mode is on
	 *
	 * @return boolean
	 */
	public function is_debug() {
		return ( WP_DEBUG === 'true' ? true : false );
	}

	/**
	 * Enqueue theme assets
	 *
	 * @return void
	 */
	public function enqueue_theme_assets() {
		wp_enqueue_style( 'main-css', get_template_directory_uri() . '/css/main.css', [], CACHE_BUSTING );
		wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', [], CACHE_BUSTING, true );
		if ( $this->is_debug() ) {
			wp_enqueue_script( 'browser-sync-client', ':3000/browser-sync/browser-sync-client.js', [], CACHE_BUSTING, true );
		}
	}

	/**
	 * Delete all caracters except numbers
	 *
	 * @param string $phone
	 * @return void
	 */
	public static function clean_phone_number( $phone ) {
		return preg_replace( '/\D+/', '', $phone );
	}

	/**
	 * Strip whitespace of a string
	 *
	 * @param string $string
	 * @return void
	 */
	public function strip_whitespace( $string ) {
		return preg_replace( '/\s+/', '', $string );
	}

	/**
	 * Sets custom mimes
	 *
	 * @param array $mimes
	 * @return void
	 */
	public function my_custom_upload_mimes( $mimes = array() ) {
		// Add a key and value for the SVG file type
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
}
