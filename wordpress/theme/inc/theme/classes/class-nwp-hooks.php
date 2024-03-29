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
		add_action( 'init', array( $menus, 'nwp_register_menus' ) );
		add_filter( 'nav_menu_css_class', array( $menus, 'current_type_nav_class' ), 10, 2 );

		/**
		 * Images
		 */
		$images = $registry->get( 'NWP_Images' );
		add_action( 'after_setup_theme', array( $images, 'nwp_images' ) );
		add_filter( 'max_srcset_image_width', array( $images, 'acf_max_srcset_image_width' ), 10, 2 );
		add_filter( 'jpeg_quality', array( $images, 'jpeg_compression' ), 10, 2 );
		add_filter( ' wp_editor_set_quality', array( $images, 'jpeg_compression' ), 10, 2 );
		add_filter( 'wp_image_editors', array( $images, 'switch_processing_engine' ), 10, 2 );
		/**
		 * Restrictions
		 */
		$restrictions = $registry->get( 'NWP_Restrictions' );
		// Lockdown mode
		add_action( 'send_headers', array( $restrictions, 'lockdown' ) );
		// Unset admin role
		add_filter( 'editable_roles', array( $restrictions, 'remove_higher_levels' ) );
		// Disable user color selection
		add_action( 'init', array( $restrictions, 'admin_del_options' ) );
		// Remove profile details & fixes
		add_action( 'admin_head-user-edit.php', array( $restrictions, 'remove_user_details' ) );
		add_action( 'admin_head-profile.php', array( $restrictions, 'remove_user_details' ) );
		add_action( 'admin_head-user-new.php', array( $restrictions, 'remove_user_details' ) );
		// Remove menus according to simple admin
		add_action( 'admin_menu', array( $restrictions, 'remove_menus' ), 999 );
		// Remove acf according to simple admin
		add_action( 'acf/settings/show_admin', array( $restrictions, 'remove_acf' ), 999 );
		// Remove menu bar links according to simple admin
		add_action( 'admin_bar_menu', array( $restrictions, 'remove_default_links' ), 500 );
		// Remove favorites menu according to simple admin
		add_filter( 'favorite_actions', array( $restrictions, 'custom_favorites' ) );
		// Disable dashboard widgets
		add_action( 'admin_init', array( $restrictions, 'disable_dashboard_widgets' ) );
		// Add Maintenance Dashboard Widget
		add_action( 'wp_dashboard_setup', array( $restrictions, 'wp_support_dashboard' ) );
		// Remove <head> links
		add_action( 'init', array( $restrictions, 'remove_head_links' ) );

		/**
		 * Utilities
		 */
		$utilities = $registry->get( 'NWP_Utilities' );
		add_action( 'wp_enqueue_scripts', array( $utilities, 'enqueue_theme_assets' ) );
		add_action( 'upload_mimes', array( $utilities, 'my_custom_upload_mimes' ) );
		add_filter( 'pre_get_posts', array( $utilities, 'search_filter' ) );
		add_action( 'template_redirect', array( $utilities, 'change_search_url' ) );

		/**
		 * ACF
		 */
		$acf = $registry->get( 'NWP_ACF' );
		add_action( 'acf/init', array( $acf, 'register_option_pages' ) );
		add_action( 'acf/init', array( $acf, 'simple_admin' ) );
		add_action( 'acf/init', array( $acf, 'register_default_acf_fields' ) );
		add_filter( 'acf/load_value/type=textarea', array( $acf, 'text_field_shortcode' ), 10, 3 );
		add_filter( 'acf/load_value/type=text', array( $acf, 'text_field_shortcode' ), 10, 3 );

		/**
		 * Shortcodes
		 */
		$shortcodes = $registry->get( 'NWP_Shortcodes' );
		// Icon Shortcode
		add_shortcode( 'icon', array( $shortcodes, 'icon_shortcode' ) );
		// Strong text Shortcode
		add_shortcode( 'bold', array( $shortcodes, 'strong_text_shortcode' ) );
		// Emphasized text Shortcode
		add_shortcode( 'italic', array( $shortcodes, 'emphasized_text_shortcode' ) );
		// Newline Shortcode
		add_shortcode( 'newline', array( $shortcodes, 'newline_shortcode' ) );

		/**
		 * Forms
		 */
		$forms = $registry->get( 'NWP_Forms' );
		// Check for post
		add_action( 'init', array( $forms, 'check_for_post' ) );

		/**
		 * Admin
		 */
		$admin = $registry->get( 'NWP_Admin' );
		// Load custom admin styles & scripts
		add_action( 'login_init', array( $admin, 'login_load' ) );
		// Load custom admin styles & scripts
		add_action( 'admin_init', array( $admin, 'admin_load' ) );
		// Insert into admin header
		add_action( 'admin_head', array( $admin, 'insert_into_admin_header' ) );
		// Add custom syle for edit button
		add_action( 'wp_head', array( $admin, 'custom_edit_style' ) );
		// Change Login Header URL
		add_filter( 'login_headerurl', array( $admin, 'custom_login_url' ) );
		// De-register print styles
		add_action( 'wp_print_styles', array( $admin, 'my_deregister_styles' ), 100 );
		add_action( 'get_header', array( $admin, 'remove_admin_bar_bump' ) );
	}
}
