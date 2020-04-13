<?php

/**
 * Restrictions class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Restrictions {
	public function __construct() {
	}

	// Lockdown mode
	public function lockdown() {
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
	public function remove_higher_levels( $all_roles ) {
		global $simple_admin;

		if ( $simple_admin ) {
			foreach ( $all_roles as $name => $role ) {
				unset( $all_roles['administrator'] );
			}
		}
		return $all_roles;
	}

	// Disable user color selection
	public function admin_del_options() {
		global $simple_admin;

		if ( $simple_admin ) {
			if ( is_admin() ) {
				remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );
			}
		}
	}

	// Remove profile details & fixes
	public function remove_user_details() {
		global $simple_admin;

		if ( $simple_admin ) {
			echo <<<EOT
				<script>
					jQuery(document).ready(function(){
						jQuery('#url').parents('tr').hide();
						jQuery('#rich_editing').parents('tr').hide();
						jQuery('#syntax_highlighting').parents('tr').hide();
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

	// Remove menus according to simple admin
	public function remove_menus() {
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

			// Custom Posts Types
			if ( $simple_acf ) {
				remove_menu_page( 'edit.php?post_type=cptm' );
			}
		}
		// Updates Link
		if ( $simple_updates ) {
			remove_submenu_page( 'index.php', 'update-core.php' );
		}
	}

	// Remove acf according to simple admin
	public function remove_acf() {
		global $simple_admin, $simple_acf;

		if ( $simple_admin && $simple_acf ) {
			return false;
		} else {
			return true;
		}
	}

	// Remove menu bar links according to simple admin
	public function remove_default_links() {
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
	public function custom_favorites( $actions ) {
		global $simple_admin;
		$current_user = wp_get_current_user();

		if ( $simple_admin ) {
			$actions = array();
		}
		return $actions;
	}

	// Disable dashboard widgets
	public function disable_dashboard_widgets() {
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
	public function wp_support_dashboard() {
		if ( function_exists( 'get_field' ) ) {
			$widget_title = get_field( 'dashboard_title', 'options' );
			wp_add_dashboard_widget( 'nwp_support_dashboard', $widget_title, array( $this, 'wp_support_dashboard_content' ) );
		}
	}

	public function wp_support_dashboard_content() {
		if ( function_exists( 'get_field' ) ) {
			$widget_content = get_field( 'dashboard_content', 'options' );
		}
		echo $widget_content;
	}

	// Remove <head> links
	public function remove_head_links() {
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
}
