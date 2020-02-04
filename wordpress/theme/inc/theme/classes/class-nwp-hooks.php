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
		$setup = $registry->get( 'NWP_Setup' );

		$menus = $registry->get( 'NWP_Menus' );
		add_action( 'init', array( $menus, 'nwp_register_menus' ) );
		add_filter( 'nav_menu_css_class', array( $menus, 'current_type_nav_class' ), 10, 2 );

		$images = $registry->get( 'NWP_Images' );
		add_action( 'after_setup_theme', array( $images, 'nwp_images' ) );
	}
}
