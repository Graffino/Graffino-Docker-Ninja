<?php

/**
 * Class Helpers
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Helpers {

	// global $template;
	public function __construct() {
	}

	public function get_template() {
		global $template;
		return basename( $template );
	}

	/**
	 * Return and add to the current url a custom 'archive_type' argument
	 * with one of the available archive types.
	 * Otherwise, defaults to 'monthly' type
	 *
	 * @param string $type Type of the archive type to be called
	 * @return string      Archive type url
	 */
	function gwp_get_archive_type_url( $type = 'montly' ) {
		return home_url( add_query_arg( array( 'archive_type' => $type ) ) );
	}


	/**
	 * Print and add to the current url a custom 'archive_type' argument
	 * with one of the available archive types.
	 * Otherwise, defaults to 'monthly' type
	 *
	 * @param string $type Type of the archive type to be called
	 */
	function gwp_the_archive_type_url( $type = 'montly' ) {
		echo esc_url( home_url( add_query_arg( array( 'archive_type' => $type ) ) ) );
	}
	/**
	 * Return full current url
	 *
	 * @param  string $base Whether to return url base or not
	 * @return string       Current url
	 */
	function gwp_get_current_url( $base = true ) {
		global $wp;

		if ( true === $base ) {
			return home_url( add_query_arg( array(), $wp->request ) );
		} else {
			return add_query_arg( array(), $wp->request );
		}
	}

	/**
	 * Get a WordPress query variable and sanitize it (must be on parse_request or later)
	 *
	 * @param  string  $var     Query variable name
	 * @param  bool    $not_set Not set return value
	 * @param  bool    $empty   Empty return value
	 * @param  string  $filter  Sanitization filter to be used
	 * @return mixed            Query variable or assigned empty or not set values.
	 */
	function gwp_get_query_var( $var, $not_set = false, $empty = '', $filter = HTML_SPECIALCHARS ) {
		// Global array of query_wars
		$array = $GLOBALS['wp']->query_vars;

		// If no set
		if ( ! array_key_exists( $var, $array ) ) {
			$get_var = $not_set;
			// If not empty
		} elseif ( empty( $array[ $var ] ) ) {
			$get_var = $empty;
		} else {
			$get_var = filter_var( $array[ $var ], $filter );
		}

		return $get_var;
	}

	/**
	 * Get GET variable
	 *
	 * @param string $var
	 * @param boolean $default
	 * @param boolean $empty
	 * @param string $filter
	 * @return string Variable content
	 */
	public static function get_get_var( $var, $default = false, $empty = false, $filter = HTML_SPECIALCHARS ) {

		if ( isset( $_GET[ $var ] ) ) {
			if ( 'ARRAY' === $filter && ! empty( $_GET[ $var ] ) ) {
				$get_var = $_GET[ $var ];
			} elseif ( strpos( $filter, 'VALIDATE' ) !== false && ! empty( $_GET[ $var ] ) ) {
				$get_var = filter_var( $_GET[ $var ], $filter );
			} else {
				$get_var = htmlspecialchars( $_GET[ $var ] );
			}
		} elseif ( empty( $_GET[ $var ] ) ) {
			$get_var = $empty;
		} else {
			$get_var = $default;
		}

		return $get_var;
	}

	/**
	 * Get POST variable
	 *
	 * @param string $var
	 * @param boolean $default
	 * @param boolean $empty
	 * @param string $filter
	 * @return string Variable content
	 */
	public static function get_post_var( $var, $default = false, $empty = false, $filter = HTML_SPECIALCHARS ) {

		if ( isset( $_POST[ $var ] ) ) {
			if ( 'ARRAY' === $filter && ! empty( $_GET[ $var ] ) ) {
				$post_var = $_POST[ $var ];
			} elseif ( strpos( $filter, 'VALIDATE' ) !== false && ! empty( $_POST[ $var ] ) ) {
				$post_var = filter_var( $_POST[ $var ], $filter );
			} else {
				$post_var = htmlspecialchars( $_POST[ $var ] );
			}
		} elseif ( empty( $_POST[ $var ] ) ) {
			$post_var = $empty;
		} else {
			$post_var = $default;
		}

		return $post_var;
	}

	/**
	 * Get page id by slug
	 *
	 * @param  string $page_slug Slug name
	 * @return mixed             POST id or null value.
	 */
	function gwp_get_page_id_by_slug( $page_slug ) {
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
	 * @since 4.0.0
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
}
