<?php
//
// Name: Navigation
// Author: Graffino (http://www.graffino.com)
//


/**
 * Register navigation
 */

add_action( 'init', 'register_menus' );
function register_menus() {
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
	$menu_id         = $menu_obj->term_id;

	return $menu_id;
}

// Highlight Custom Post Archives
add_filter( 'nav_menu_css_class', 'current_type_nav_class', 10, 2 );
function current_type_nav_class( $classes, $item ) {
	// Get post_type for this post
	$post_type = get_query_var( 'post_type' );

	// Go to Menus and add a menu class named: {custom-post-type}-menu-item
	// This adds a 'current_page_parent' class to the parent menu item
	if ( is_array( $post_type ) ) {
		foreach ( $post_type as $type ) {
			if ( in_array( $type . '-nav-item', $classes ) ) {
				array_push( $classes, 'is-current' );
			}

			if ( in_array( $type . '-nav-parent', $classes ) ) {
				array_push( $classes, 'is-current-parent' );
			}
		}
	} else {
		if ( in_array( $post_type . '-nav-item', $classes ) ) {
			array_push( $classes, 'is-current' );
		}

		if ( in_array( $post_type . '-nav-parent', $classes ) ) {
			array_push( $classes, 'is-current-parent' );
		}
	}

	return $classes;
}
