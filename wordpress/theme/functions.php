<?php
//
// Name: Functions file
// Author: Graffino (http://www.graffino.com)
//

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Require Autoloaders
require_once get_template_directory() . '/inc/theme/classes/class-nwp-class-autoloader.php';
require_once get_template_directory() . '/inc/theme/classes/class-nwp-module-autoloader.php';

// Autoload Classes
$class_autoload_path = __DIR__ . '/inc/theme/classes/';
NWP_ClassAutoLoader::set_path( $class_autoload_path );
spl_autoload_register( 'NWP_ClassAutoLoader::loader' );

// Autoload Modules
$module_autoloader_path = __DIR__ . '/inc/theme/';
NWP_ModuleAutoLoader::set_path( $module_autoloader_path );
NWP_ModuleAutoLoader::loader();
