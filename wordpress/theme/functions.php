<?php
//
// Name: Functions file
// Author: Graffino (http://www.graffino.com)
//

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Require Autoloader
require_once get_template_directory() . '/inc/theme/classes/class-autoloader.php';

// Autoload Classes
$class_autoload_path = __DIR__ . '/inc/theme/classes/';
AutoLoader::set_path( $class_autoload_path );
spl_autoload_register( 'Autoloader::loader' );

// Autoload Modules
$modules = new \FilesystemIterator( __DIR__ . '/inc/theme', \FilesystemIterator::SKIP_DOTS );
try {
	foreach ( $modules as $module ) {
		! $modules->isDir() and include $module->getRealPath();
	}
} catch ( Exception $error ) {
	return $error;
}

