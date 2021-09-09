<?php
require_once( __DIR__ . '/../composer/vendor/autoload.php' );
$dotenv = Dotenv\Dotenv::createImmutable( dirname( __DIR__, 1 ) );
$dotenv->load();

/* WP Super Cache */
define( 'WP_CACHE', true );
define( 'WPCACHEHOME', __DIR__ . '/wp-content/plugins/wp-super-cache/' );


/* WP Sentry */
if ( isset( $_ENV['WP_SENTRY_ENVIRONMENT'] ) && 'staging' === $_ENV['WP_SENTRY_ENVIRONMENT'] ) {
	define( 'WP_SENTRY_PHP_DSN', $_ENV['WP_SENTRY_PHP_DSN'] );
	define( 'WP_SENTRY_SEND_DEFAULT_PII', (bool) $_ENV['WP_SENTRY_SEND_DEFAULT_PII'] );
	define( 'WP_SENTRY_VERSION', $_ENV['WP_SENTRY_VERSION'] );
	define( 'WP_SENTRY_ENV', $_ENV['APP_ENV'] );
}

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// Fix SSL Redirect Loop
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] ) {
	$_SERVER['HTTPS'] = 'on';
}

if ( isset( $_SERVER['HTTP_X_FORWARDED_HOST'] ) ) {
	$_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];
}

define( 'WP_HOME', $_ENV['THEME_URL'] );
define( 'WP_SITEURL', $_ENV['THEME_URL'] );
define( 'WP_CONTENT_URL', $_ENV['THEME_URL'] . '/wp-content' );

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', $_ENV['DB_NAME'] );

/** MySQL database username */
define( 'DB_USER', $_ENV['DB_USER'] );

/** MySQL database password */
define( 'DB_PASSWORD', $_ENV['DB_PASSWORD'] );

/** MySQL hostname */
define( 'DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'] );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY', ',5d_~G~BoiAt(c+t9jk2z|`,50#<U-)dIqAKo(N<Or,Er=`UbsJk.kTe<dY04=X%' );
define( 'SECURE_AUTH_KEY', 'S EVKqi-P^(bZj1[u .3ZFI(}p<c[}w..kF<8;3AQ;9s&8B3QsC,y|<7_e6+s5ke' );
define( 'LOGGED_IN_KEY', 'i]|~lCLN;*]kGa$1b)PBMAbU>$<lmPRUy,*uUWVPqQU_W#A-FtXu?<ftrg#9)rHw' );
define( 'NONCE_KEY', '-uS.bEBtP9k@>?Pn++!Pk#mAhH]^3~Y$K+qWvWlO+c_>^S##K4+nb$|0XOpViB+p' );
define( 'AUTH_SALT', '/B,G:2lJQo|SQB=TI$YEnbl4hci*T<bsosTeR$B)BgN%TWl_3t?SoLZWW+_+~|`p' );
define( 'SECURE_AUTH_SALT', ')nuZAr%+K1ob-EDd^CH`rUNKW|l,Cu2]bW74q,p/E#KbmvO*y(<>_sUsFR]Y8)d.' );
define( 'LOGGED_IN_SALT', 'KQ+!!,0|0XN%(*9*26k-Jk>MZ|[~35zR3+Q,,#>5.:Bod_a;HzGMKs+E8%AAE[_$' );
define( 'NONCE_SALT', '@ShGL3lc<W=QIm3}=Oh*[8_}8i;,+)S5T/V_/H08!mo=#eiGQ;!VC;|d?`VpyOyT' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', filter_var( $_ENV['DEBUG'], FILTER_VALIDATE_BOOLEAN ) );
define( 'CACHE_BUSTING', $_ENV['CACHE_BUSTING'] );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
