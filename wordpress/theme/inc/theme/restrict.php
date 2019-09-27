<?php
//
// Name: Restrict
// Author: Graffino (http://www.graffino.com)
//


/**
 * Restrict & disable functions
 */

// Configure simple admin
global $simple_admin, $simple_plugins, $simple_updates, $simple_settings;

if ( function_exists( 'get_field' ) ) {
	$simple_admin    = get_field( 'simple_admin', 'options' );
	$simple_plugins  = get_field( 'simple_plugins', 'options' );
	$simple_updates  = get_field( 'simple_updates', 'options' );
	$simple_settings = get_field( 'simple_settings', 'options' );
	$simple_acf      = get_field( 'simple_acf', 'options' );
}

// Lockdown mode
add_action( 'send_headers', 'lockdown' );
function lockdown() {
	// Doesn't work ouside the function
	if ( function_exists( 'get_field' ) ) {
		$simple_lockdown = get_field( 'simple_lockdown', 'options' );
	}
	if ( ! is_user_logged_in() ) {
		if ( $simple_lockdown ) {
			auth_redirect();
		}
	}
}

// Unset admin role
add_filter( 'editable_roles', 'remove_higher_levels' );
function remove_higher_levels( $all_roles ) {
	global $simple_admin;

	if ( $simple_admin ) {
		foreach ( $all_roles as $name => $role ) {
			unset( $all_roles['administrator'] );
		}
	}
	return $all_roles;
}

// Disable user color selection
add_action( 'admin_head', 'admin_del_options' );
function admin_del_options() {
	global $_wp_admin_css_colors, $simple_admin;

	if ( $simple_admin ) {
		$_wp_admin_css_colors = 0;
	}
}

// Remove profile details & fixes
add_action( 'admin_head-user-edit.php', 'remove_user_details' );
add_action( 'admin_head-profile.php', 'remove_user_details' );
add_action( 'admin_head-user-new.php', 'remove_user_details' );
function remove_user_details() {
	global $simple_admin;

	if ( $simple_admin ) {
		echo <<<EOT
<script>
	jQuery(document).ready(function(){
		jQuery('#url').parents('tr').hide();
		jQuery('#rich_editing').parents('tr').hide();
		jQuery('#admin_bar_front').parents('tr').hide();
		jQuery('#comment_shortcuts').parents('tr').hide();
		jQuery('#nickname').parents('tr').hide();
		jQuery('#display_name').parents('tr').hide();
		jQuery('#description').parents('tr').hide();
		jQuery('.indicator-hint').hide();
		jQuery('#user_login').next('span').hide();

		jQuery("h3:contains('Personal Options')").hide();
		jQuery("h3:contains('Name')").hide();
		jQuery("h3:contains('Contact Info')").hide();
		jQuery("h3:contains('About Yourself')").hide();

	});
</script>
EOT;
	}
}

// Disable AIM, Jabber, YIM, AMT profile fields
add_filter( 'user_contactmethods', 'hide_profile_fields', 10, 1 );
function hide_profile_fields( $contactmethods ) {
	global $simple_admin;

	if ( $simple_admin ) {
		$contactmethods = array();
		return $contactmethods;
	}
}

// Remove menus according to sumple admin
add_action( 'admin_menu', 'remove_menus', 999 );
function remove_menus() {
	global $simple_admin, $simple_plugins, $simple_updates, $simple_settings, $simple_acf, $simple_wpml, $menu, $submenu;

	$restricted = array( __( 'Settings' ), __( 'Plugins' ), __( 'Links' ), __( 'Tools' ), __( 'Posts' ), __( 'Comments' ) );
	// $restricted = array( __( 'Links' ), __( 'Posts' ), __( 'Links' ),  __( 'Users' ), __( 'Tools' ), __( 'Module' ),  __( 'Appearance' ),  __( 'Users' ),  __( 'Settings', __( 'Comments' ),   __( 'Posts' ));

	// Add plugins
	if ( $simple_admin && ! $simple_plugins ) {
		$plugins = __( 'Plugins' );
		$key     = array_search( $plugins, $restricted );

		if ( false !== $key ) {
			unset( $restricted[ $key ] );
		}
	}

	// Add settings
	if ( $simple_admin && ! $simple_settings ) {
		$plugins = __( 'Settings' );
		$search  = array_search( $plugins, $restricted );

		if ( ( $key == $search ) !== false ) {
			unset( $restricted[ $key ] );
		}
	}

	// Others
	if ( $simple_admin ) {
		end( $menu );
		while ( prev( $menu ) ) {
			$value = explode( ' ', $menu[ key( $menu ) ][0] );
			if ( in_array( null != $value[0] ? $value[0] : '', $restricted ) ) {
				unset( $menu[ key( $menu ) ] );
			}
		}

		// Remove Themes Support & Customize Links
		unset( $submenu['themes.php'][5] ); // Remove Themes Link
		unset( $submenu['themes.php'][6] ); // Remove Themes Customize Link
		unset( $submenu['themes.php'][7] ); // Remove Themes Menu Link

		remove_theme_support( 'custom-header' );
		remove_theme_support( 'custom-background' );
		remove_theme_support( 'post-formats' );

		unset( $submenu['plugin-editor.php'] ); // Remove Plugins Editor

		// Remove Themes Editor
		remove_submenu_page( 'themes.php', 'theme-editor.php' );

		// SEO by Yoast
		remove_menu_page( 'wpseo_dashboard' );

		//Custom Fields
		if ( $simple_acf ) {
			remove_menu_page( 'edit.php?post_type=acf-field-group' );
			// Custom Posts Types
			remove_menu_page( 'edit.php?post_type=cptm' );
		}
	}
	// Updates Link
	if ( $simple_updates ) {
		remove_submenu_page( 'index.php', 'update-core.php' );
	}
}

// Remove menu bar links according to simple admin
add_action( 'admin_bar_menu', 'remove_default_links', 500 );
function remove_default_links() {
	global $wp_admin_bar, $simple_admin;

	if ( $simple_admin ) {
		// $remove = array( 'appearance', 'new-content', 'comments', 'new-static-box', 'themes', 'wp-logo', 'themes', 'widgets', 'new-link', 'new-post', 'new-static-box', 'new-user', 'wp-logo-external' );

		$remove = array( 'new-static-box', 'wp-logo', 'new-link', 'wp-logo-external', 'wpseo-menu' );

		if ( empty( $remove ) ) {
			return;
		}

		foreach ( $remove as $item ) {
			$wp_admin_bar->remove_menu( $item );
		}
	}
}

// Remove favorites menu according to simple admin
add_filter( 'favorite_actions', 'custom_favorites' );
function custom_favorites( $actions ) {
	global $simple_admin;
	$current_user = wp_get_current_user();

	if ( $simple_admin ) {
		$actions = array();
	}
	return $actions;
}

// Disable dashboard widgets
add_action( 'admin_init', 'disable_dashboard_widgets' );
function disable_dashboard_widgets() {
	global $simple_admin;

	if ( $simple_admin ) {
		remove_action( 'welcome_panel', 'wp_welcome_panel' );
		remove_meta_box( 'dashboard_primary', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_right_now', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_plugins', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'core' );
		remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
	}
}

// Add Maintenance Dashboard Widget
add_action( 'wp_dashboard_setup', 'wp_support_dashboard' );
function wp_support_dashboard() {
	global $current_user;

	if ( function_exists( 'get_field' ) ) {
		$widget_title = get_field( 'dashboard_title', 'options' );
		wp_add_dashboard_widget( 'wpse_wp_support_dashboard', $widget_title, 'wp_support_dashboard_content' );
	}
}
function wp_support_dashboard_content() {
	if ( function_exists( 'get_field' ) ) {
		$widget_content = get_field( 'dashboard_content', 'options' );
	}
	echo $widget_content;
}

// Remove <head> links
add_action( 'init', 'remove_head_links' );
function remove_head_links() {
	// Display the links to the extra feeds such as category feeds
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	// Display the links to the general feeds: Post and Comment Feed
	remove_action( 'wp_head', 'feed_links', 2 );
	// Display the link to the Really Simple Discovery service endpoint, EditURI link
	remove_action( 'wp_head', 'rsd_link' );
	// Display the link to the Windows Live Writer manifest file.
	remove_action( 'wp_head', 'wlwmanifest_link', 10, 0 );
	// Index link
	remove_action( 'wp_head', 'index_rel_link', 10, 0 );
	// Prev link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	// Start link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	// Display relational links for the posts adjacent to the current post.
	remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 );
	// Display the XHTML generated
	remove_action( 'wp_head', 'wp_generator' );
	// Disable canonical links
	remove_action( 'wp_head', 'rel_canonical', 10, 0 );
}
