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

// Global variables
$graffinowp_dir_path  = get_template_directory();

// Require Autoloaders
require_once $graffinowp_dir_path . '/inc/theme/classes/class-nwp-class-autoloader.php';
require_once $graffinowp_dir_path . '/inc/theme/classes/class-nwp-module-autoloader.php';

// Autoload Classes
$class_autoload_path = __DIR__ . '/inc/theme/classes/';
NWP_ClassAutoLoader::set_path( $class_autoload_path );
spl_autoload_register( 'NWP_ClassAutoLoader::loader' );

// Initialize registry for app configuration
$registry = new NWP_Registry();

// Autoload Modules
$module_autoloader_path = __DIR__ . '/inc/theme/';
NWP_ModuleAutoLoader::set_path( $module_autoloader_path );
NWP_ModuleAutoLoader::loader();

// GWP_Registry is being used in config autoloader and
// must be reset after loading the config
unset($registry);
$registry = new NWP_Registry();

//Load hooks
$hooks = new NWP_Hooks;
