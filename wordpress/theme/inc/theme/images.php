<?php
//
// Name: Images
// Author: Graffino (http://www.graffino.com)
//


/**
 * Register post thumbnails
 */

add_theme_support( 'post-thumbnails' );

// Default
set_post_thumbnail_size( 160, 112, true );

// Post
add_image_size( 'post-regular', 720, 320, false );

