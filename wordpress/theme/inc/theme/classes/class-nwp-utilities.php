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
	 * Get page id by slug
	 *
	 * @since 1.0.0
	 * @param  string $page_slug Slug name
	 * @return mixed             POST id or null value.
	 */
	public function gwp_get_page_id_by_slug( $page_slug ) {
		global $wpdb;

		// CHeck all posts except attachments and revisions
		$page = $wpdb->get_var(
			$wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type != 'revision' AND post_status != 'inherit' AND post_status != 'auto-draft'", $page_slug )
		);

		// Page might be deleted
		if ( ! $page ) {
			$page = $wpdb->get_var(
				$wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_status = 'trash'", $page_slug . '__trashed' )
			);
		}

		if ( $page ) {
			return $page;
		} else {
			return null;
		}
	}

	/**
	 * Get post slug
	 *
	 * @since 1.0.0
	 * @return mixed POST slug or null value.
	 */
	function gwp_get_post_slug() {
		$current_page = sanitize_post( $GLOBALS['wp_the_query']->get_queried_object() );

		if ( ! $current_page ) {
			return null;
		}

		$slug = $current_page->post_name;

		if ( $slug ) {
			return $slug;
		}

		return null;
	}

	/**
	 * Get URL without any vars
	 *
	 * @return void
	 */
	public static function get_current_clean_url() {
		global $wp;
		$wp->remove_query_var( 'paged', 'any' );

		$current_url = home_url( remove_query_arg( array( 'paged' => false ), $wp->request ) );

		return $current_url;
	}

	/**
	 * Convert array to list
	 *
	 * @param array $var
	 * @return void
	 */
	public function convert_array_to_list( $var ) {
		$array = count( $var ) ? $var : array();
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
		wp_enqueue_style( 'main-css', get_template_directory_uri() . '/css/main.css', array(), CACHE_BUSTING );
		wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', array(), CACHE_BUSTING, true );
		if ( $this->is_debug() ) {
			wp_enqueue_script( 'browser-sync-client', ':3000/browser-sync/browser-sync-client.js', array(), CACHE_BUSTING, true );
		}
	}

	/**
	 * Delete all caracters except numbers
	 *
	 * @param string $phone
	 * @return void
	 */
	public static function clean_phone_number( $phone ) {
		return preg_replace( '/[^+\d+]/', '', $phone );
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

	/**
	 * Search Filter for posts only
	 *
	 * @param $query
	 * @return void
	 */
	public function search_filter( $query ) {
		if ( $query->is_search ) {
			$query->set( 'post_type', 'post' );
			$query->set( 'paged', ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1 );
			$query->set( 'posts_per_page', 4 );
		}
		return $query;
	}

	/**
	 * Change default search results URL
	 *
	 * @return void
	 */
	public function change_search_url() {
		if ( is_search() && ! empty( $_GET['s'] ) ) {
			wp_redirect( home_url( '/search/' ) . urlencode( get_query_var( 's' ) ) );
			exit();
		}
	}

	/**
	 * Share to Facebook
	 *
	 * @return void
	 */
	public function share_to_facebook( $url, $class, $icon_name ) {
		global $registry;
		$href = 'http://m.facebook.com/sharer.php?u=' . $url;

		$link = '<a href="' . $href .
			'" title="' . __( 'Share on Facebook' ) .
			'" class="' . $class . ' js-social-popup' .
			'" target="_blank" rel="external">' . $registry->get( 'NWP_Images' )->get_svg( $icon_name ) .
			'</a>';

		return $link;
	}


	/**
	 * Share to Whatsapp
	 *
	 * @return void
	 */
	public function share_to_whatsapp( $url, $class, $icon_name ) {
		global $registry;
		$href = 'whatsapp://send?text=' . $url;

		$link = '<a href="' . $href .
			'" title="' . __( 'Share on Whatsapp' ) .
			'" class="' . $class . ' js-social-popup' .
			'" data-action="share/whatsapp/share"' .
			'" target="_blank" rel="external">' . $registry->get( 'NWP_Images' )->get_svg( $icon_name ) .
			'</a>';

		return $link;
	}
}
