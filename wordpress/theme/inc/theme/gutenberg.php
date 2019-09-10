<?php
//
// Name: Gutenberg Options
// Author: Graffino (http://www.graffino.com)
//


/**
 * Disable Gutenberg
 */

// Disable for posts
add_filter( 'use_block_editor_for_post', '__return_false', 10 );

// Disable for post types
add_filter( 'use_block_editor_for_post_type', '__return_false', 10 );
