<?php
//
// Name: Functions file
// Author: Graffino (http://www.graffino.com)
//

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Globalize variables for WP-CLI
global $registry;

// Require class autoloader
require_once get_template_directory() . '/inc/theme/classes/class-nwp-class-autoloader.php';

// Require file autoloader
require_once get_template_directory() . '/inc/theme/classes/class-nwp-module-autoloader.php';

// Autoload Classes
$class_autoload_path = __DIR__ . '/inc/theme/classes/';
NWP_Class_AutoLoader::set_path( $class_autoload_path );
spl_autoload_register( 'NWP_ClassAutoLoader::loader' );

// Initialize registry for app configuration
$registry = new NWP_Registry();

// Autoload Modules
$module_autoloader_path = __DIR__ . '/inc/theme/';
NWP_Module_AutoLoader::set_path( $module_autoloader_path );
NWP_Module_AutoLoader::loader();

// GWP_Registry is being used in config autoloader and
// must be reset after loading the config
unset( $registry );
$registry = new NWP_Registry();

//Load hooks
$hooks = new NWP_Hooks;
