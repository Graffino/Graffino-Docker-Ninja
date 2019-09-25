<?php
// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Class Autoloader
 */
class NWP_ClassAutoLoader {
	/** @var bool DEBUG Enable debug */
	const DEBUG = false;
	/** @var string $autoload_extension File extension */
	protected static $autoload_extension = '.php';
	/** @var object $auth Auth object */
	protected static $autoload_path = __DIR__;
	/** @var object $file_iterator A placeholder to hold the file iterator so that directory traversal is only performed once. */
	protected static $file_iterator = null;

	/**
	 * Autoload function for registration with spl_autoload_register
	 * Looks recursively through project directory and loads class files based on
	 * filename match.
	 *
	 * @uses RecursiveDirectoryIterator::__construct()
	 * @param string $class_name
	 */
	public static function loader( $class_name ) {
		if ( is_null( static::$file_iterator ) ) {
			static::$file_iterator = new RecursiveIteratorIterator(
				new RecursiveDirectoryIterator(
					static::$autoload_path,
					RecursiveDirectoryIterator::SKIP_DOTS
				),
				RecursiveIteratorIterator::SELF_FIRST,
				RecursiveIteratorIterator::CATCH_GET_CHILD
			);
		}
		// Re-format class name to match file name
		$class_name = str_replace( '_', '-', $class_name );
		// Construct the file name
		$filename = 'class-' . $class_name . static::$autoload_extension;
		foreach ( static::$file_iterator as $file ) {
			if ( strtolower( $file->getFilename() ) === strtolower( $filename ) ) {
				if ( $file->isReadable() ) {
					include_once $file->getPathname();
				}
				break;
			}
		}
	}

	/**
	 * Sets the $autoload_extension property
	 *
	 * @param string $autoload_extension The file extension used for class files.  Default is "php".
	 */
	public static function set_extension( $autoload_extension ) {
		static::$autoload_extension = $autoload_extension;
	}

	/**
	 * Sets the $autoload_$path property
	 *
	 * @param string $autoload_$path The path representing the top level where recursion should begin. Defaults to the current directory.
	 */
	public static function set_path( $path ) {
		static::$autoload_path = $path;
	}
}
