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
	}
}
