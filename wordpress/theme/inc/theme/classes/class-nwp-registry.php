<?php
// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registry class (common wrapper) for different class instances
 *
 * @since 2.0.0
 * @package annotext
 */
class NWP_Registry {
	/** @var array $_objects Class objects */
	protected $_objects = array();

	/**
	 * Method to add object to registry via reference
	 *
	 * @since 2.0.0
	 * @param string  $name   Name identifier for the new registered object (used with getter method)
	 * @param object  $object Instance of an object you want to register
	 * @return bool           Set result
	 */
	function set( $name, &$object ) {
		// Return false if $name is already in the array
		if ( array_key_exists( $name, $this->_objects ) ) {
			return false;
		}
		// Add the object to the array via reference
		$this->_objects[ $name ] = &$object;
		// Return true
		return true;
	}

	/**
	 * Object getter method from registry
	 *
	 */
	function &get( $name ) {

		// Return false if $name is not in the array
		if (
			! array_key_exists( $name, $this->_objects )
		) {
			$new_instance = new $name();
			$this->set( $name, $new_instance );
		}

		// Return the instance object
		return $this->_objects[ $name ];
	}
}
