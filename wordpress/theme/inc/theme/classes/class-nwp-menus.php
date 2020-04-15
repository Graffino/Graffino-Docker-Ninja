<?php

/**
 * Site navigation
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Menus {
	public function __construct() {
		// Initialize custom post archives links to navigation
		NWP_Custom_Post_Type_Archive_Menu_Links::init();
	}

	public function nwp_register_menus() {
		register_nav_menus(
			array(
				'primary-right' => __( 'Primary Right' ),
			)
		);
	}

	// Get Menu Name By Theme Location
	function get_menu_name( $theme_location = 'primary' ) {
		$theme_locations = get_nav_menu_locations();
		$menu_obj        = get_term( $theme_locations[ $theme_location ], 'nav_menu' );
		$menu_name       = $menu_obj->name;

		return $menu_name;
	}

	// Get Menu ID By Theme Location
	function get_menu_id( $theme_location = 'primary' ) {
		$theme_locations = get_nav_menu_locations();
		$menu_obj        = get_term( $theme_locations[ $theme_location ], 'nav_menu' );
		if ( isset( $menu_obj->term_id ) ) {
			$menu_id = $menu_obj->term_id;
			return $menu_id;
		}
	}

	// Highlight Custom Post Archives
	public function current_type_nav_class( $classes, $item ) {
		// Get post_type for this post
		$post_type = get_query_var( 'post_type' );

		// Go to Menus and add a menu class named: {custom-post-type}-menu-item
		// This adds a 'current_page_parent' class to the parent menu item
		if ( is_array( $post_type ) ) {
			foreach ( $post_type as $type ) {
				if ( in_array( $type . '-nav-item', $classes, true ) ) {
					array_push( $classes, 'is-current' );
				}

				if ( in_array( $type . '-nav-parent', $classes, true ) ) {
					array_push( $classes, 'is-current-parent' );
				}
			}
		} else {
			if ( in_array( $post_type . '-nav-item', $classes, true ) ) {
				array_push( $classes, 'is-current' );
			}

			if ( in_array( $post_type . '-nav-parent', $classes, true ) ) {
				array_push( $classes, 'is-current-parent' );
			}
		}
		return $classes;
	}
}
