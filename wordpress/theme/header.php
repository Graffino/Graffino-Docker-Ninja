<?php
//
// Name: Header Template
// Author: Graffino (http://www.graffino.com)
//
?>
<!DOCTYPE html>
<html class="no-js no-fonts">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Accept-CH" content="DPR,Width,Viewport-Width">

	<!-- Icon Names -->
	<meta name="apple-mobile-web-app-title" content="<?php bloginfo( 'name' ); ?>">
	<meta name="application-name" content="<?php bloginfo( 'name' ); ?>">
	<!-- /Icon Names -->

	<!-- Windows Phone Tile -->
	<meta name="msapplication-TileColor" content="#2A459E">
	<meta name="msapplication-TileImage" content="<?php bloginfo( 'template_directory' ); ?>/touch-icon-transparent.png">
	<!-- /Windows Phone Tile -->

	<title>
	<?php
	// Page title | Site name | Site description
	wp_title( '|', true, true );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		echo " | $site_description";
	}
	?>
	</title>

	<!-- Author Information -->
	<link type="text/plain" rel="author" href="<?php bloginfo( 'template_directory' ); ?>/humans.txt">
	<!-- /Author Information -->

	<!-- Touch Icons -->
	<link rel="mask-icon" href="<?php bloginfo( 'template_directory' ); ?>/pin-icon.svg" color="#2A459E">
	<link rel="shortcut icon" href="<?php bloginfo( 'template_directory' ); ?>/favicon.ico">
	<link rel="icon" type="image/png" href="<?php bloginfo( 'template_directory' ); ?>/touch-icon.png">
	<link rel="apple-touch-icon" href="<?php bloginfo( 'template_directory' ); ?>/touch-icon.png">
	<!-- /Touch Icons -->

	<!-- Prefetch DNS for external resources -->
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
	<!-- /Prefetch DNS -->

	<!-- Preconnect for external resources -->
	<link rel="preconnect" href="//fonts.googleapis.com">
	<!-- /Preconnect -->

	<!-- Load CSS -->
	<link rel="stylesheet" href="<?php bloginfo( 'template_directory' ); ?>/css/<?php asset_output( 'main', 'css' ); ?>">
	<!-- /Load CSS -->

	<!-- Template URL variable -->
	<script type="text/javascript">
		const templateUrl = '<?php echo get_bloginfo( 'template_url' ); ?>';
	</script>
	<!-- /Template URL variable -->

	<!-- Header Scripts -->
	<?php wp_head(); ?>
	<!-- End Header Scripts -->

	<!-- !Google Analytics -->
	<?php the_field( 'google_analytics', 'options' ); ?>
	<!-- End Google Analytics -->
</head>
<body class="home" <?php body_class(); ?>>
	<header class="header js-header is-visible">
		<div class="container js-header-inside">
			<!-- Header Logo -->
			<div class="header__logo logo">
			<a href="<?php echo site_url(); ?>" class="logo__anchor">
				<img class="logo__image js-logo" src="<?php bloginfo( 'template_directory' ); ?>/images/svgs/logo.svg" alt="Logo of <?php bloginfo( 'name' ); ?>" width="200" height="30">
			</a>
			<?php edit_admin_link(); ?>
			</div>
			<!-- /Header Logo -->

			<!-- Header Navigation -->
			<div class="header__nav">
			<ul class="nav__items">
				<?php
				wp_nav_menu( array(
					'theme_location' => 'primary-right',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'walker'         => new Main_Menu_Walker,
					'block'          => 'nav',
				) );
				?>
			</ul>
			<?php edit_menu_link( 'primary-right' ); ?>
			</div>
			<!-- /Header Navigation -->
		</div><!-- .container -->
	</header>
	<main class="main">
