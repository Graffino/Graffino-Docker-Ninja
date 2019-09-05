<?php
require_once(__DIR__ . '/../vendor/autoload.php');
(new \Dotenv\Dotenv(__DIR__.'/../'))->load();

define( 'WP_HOME', getenv('THEME_URL') );
define( 'WP_SITEURL', getenv('THEME_URL') );
define( 'WP_CONTENT_URL', getenv('THEME_URL') . '/wp-content' );
