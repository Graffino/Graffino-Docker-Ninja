<?php
// If file is accessed directly, exit
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Class Hooks
 */
class NWP_Hooks
{
    public function __construct()
    {
		global $registry;
		$example = $registry->get('NWP_Example');
    }
}
