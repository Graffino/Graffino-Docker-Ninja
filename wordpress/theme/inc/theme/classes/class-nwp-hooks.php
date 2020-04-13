<?php
// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Hooks
 */
class NWP_Hooks {
	public function __construct() {
		global $registry;
		/**
		 * Setup
		 */
		$setup = $registry->get( 'NWP_Setup' );

		/**
		 * Menus
		 */
		$menus = $registry->get( 'NWP_Menus' );
		add_action( 'init', [ $menus, 'nwp_register_menus' ] );
		add_filter( 'nav_menu_css_class', [ $menus, 'current_type_nav_class' ], 10, 2 );

		/**
		 * Images
		 */
		$images = $registry->get( 'NWP_Images' );
		add_action( 'after_setup_theme', [ $images, 'nwp_images' ] );

		/**
		 * Restrictions
		 */
		$restrictions = $registry->get( 'NWP_Restrictions' );
		// Configure simple admin
		global $simple_admin, $simple_plugins, $simple_updates, $simple_settings, $simple_acf;
		if ( function_exists( 'get_field' ) ) {
			$simple_admin    = get_field( 'simple_admin', 'options' );
			$simple_plugins  = get_field( 'simple_plugins', 'options' );
			$simple_updates  = get_field( 'simple_updates', 'options' );
			$simple_settings = get_field( 'simple_settings', 'options' );
			$simple_acf      = get_field( 'simple_acf', 'options' );
		}
		// Lockdown mode
		add_action( 'send_headers', [ $restrictions, 'lockdown' ] );
		// Unset admin role
		add_filter( 'editable_roles', [ $restrictions, 'remove_higher_levels' ] );
		// Disable user color selection
		add_action( 'init', [ $restrictions, 'admin_del_options' ] );
		// Remove profile details & fixes
		add_action( 'admin_head-user-edit.php', [ $restrictions, 'remove_user_details' ] );
		add_action( 'admin_head-profile.php', [ $restrictions, 'remove_user_details' ] );
		add_action( 'admin_head-user-new.php', [ $restrictions, 'remove_user_details' ] );
		// Remove menus according to simple admin
		add_action( 'admin_menu', [ $restrictions, 'remove_menus' ], 999 );
		// Remove acf according to simple admin
		add_action( 'acf/settings/show_admin', [ $restrictions, 'remove_acf' ], 999 );
		// Remove menu bar links according to simple admin
		add_action( 'admin_bar_menu', [ $restrictions, 'remove_default_links' ], 500 );
		// Remove favorites menu according to simple admin
		add_filter( 'favorite_actions', [ $restrictions, 'custom_favorites' ] );
		// Disable dashboard widgets
		add_action( 'admin_init', [ $restrictions, 'disable_dashboard_widgets' ] );
		// Add Maintenance Dashboard Widget
		add_action( 'wp_dashboard_setup', [ $restrictions, 'wp_support_dashboard' ] );
		// Remove <head> links
		add_action( 'init', [ $restrictions, 'remove_head_links' ] );

		/**
		 * Utilities
		 */
		$utilities = $registry->get( 'NWP_Utilities' );
		add_action( 'wp_enqueue_scripts', [ $utilities, 'enqueue_theme_assets' ] );

		/**
		 * ACF
		 */
		$acf = $registry->get( 'NWP_ACF' );
		// Register option pages
		if ( function_exists( 'acf_add_options_page' ) ) {
			acf_add_options_page();
			acf_add_options_sub_page( 'Global Widgets' );
			acf_add_options_sub_page( 'Social & Contact' );
			acf_add_options_sub_page( 'Page Links' );
			acf_add_options_sub_page( 'API Settings' );
			acf_add_options_sub_page( 'Admin Settings' );
		}

		if ( function_exists( 'register_options_page' ) ) {
			register_options_page( 'Global Widgets' );
			register_options_page( 'Social & Contact' );
			register_options_page( 'Page Links' );
			register_options_page( 'API Settings' );
			register_options_page( 'Admin Settings' );
		}
		add_filter( 'acf/load_value/type=textarea', [ $acf, 'text_field_shortcode' ], 10, 3 );
		add_filter( 'acf/load_value/type=text', [ $acf, 'text_field_shortcode' ], 10, 3 );

		/**
		 * Shortcodes
		 */
		$shortcodes = $registry->get( 'NWP_Shortcodes' );
		// Icon Shortcode
		add_shortcode( 'icon', [ $shortcodes, 'icon_shortcode' ] );
		// Strong text Shortcode
		add_shortcode( 'bold', [ $shortcodes, 'strong_text_shortcode' ] );
		// Emphasized text Shortcode
		add_shortcode( 'italic', [ $shortcodes, 'emphasized_text_shortcode' ] );
		// Newline Shortcode
		add_shortcode( 'newline', [ $shortcodes, 'newline_shortcode' ] );

		/**
		 * Forms
		 */
		$forms = $registry->get( 'NWP_Forms' );
		// Check for post
		add_action( 'init', [ $forms, 'check_for_post' ] );

		/**
		 * Admin
		 */
		$admin = $registry->get( 'NWP_Admin' );
		// Load custom admin styles & scripts
		add_action( 'login_init', [ $admin, 'login_load' ] );
		// Insert into admin header
		add_action( 'admin_head', [ $admin, 'insert_into_admin_header' ] );
		// Add custom syle for edit button
		add_action( 'wp_head', [ $admin, 'custom_edit_style' ] );
		// Change Login Header URL
		add_filter( 'login_headerurl', [ $admin, 'custom_login_url' ] );
		// De-register print styles
		add_action( 'wp_print_styles', [ $admin, 'my_deregister_styles' ], 100 );
	}
}
