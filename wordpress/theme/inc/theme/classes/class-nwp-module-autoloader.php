<?php
// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Module Autoloader
 *
 * @package annotext
 */
class NWP_ModuleAutoLoader {
	/** @var bool DEBUG Enable debug */
	const DEBUG = false;
	/** @var string $autoload_extension File extension */
	protected static $autoload_extension = 'php';
	/** @var object $auth Auth object */
	protected static $autoload_path = __DIR__;

	/**
	 * Autoload function for registration with spl_autoload_register
	 * Looks recursively through project directory and loads class files based on
	 * filename match.
	 *
	 * @uses FilesystemIterator::__construct()
	 * @return mixed None or $error
	 */
	public static function loader() {
		$autoload_path      = static::$autoload_path;
		$autoload_extension = static::$autoload_extension;

		$files = new \FilesystemIterator( $autoload_path, \FilesystemIterator::SKIP_DOTS );
		try {
			foreach ( $files as $file ) {
				if ( $file->isFile() && $file->getExtension() == $autoload_extension ) {
					include $file->getRealPath();
				}
			}
		} catch ( Exception $error ) {
			return $error;
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
