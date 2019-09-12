<?php
//
// Name: Remove Admin Bar
// Author: Graffino (http://www.graffino.com)
//

function remove_admin_bar() {
	return false;
}

add_filter( 'show_admin_bar', 'remove_admin_bar' );
