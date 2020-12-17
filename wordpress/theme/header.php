<?php
//
// Name: Header Template
//
?>
<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>" class="no-js" data-component="mobile-detect">

<head>
	<title>
		<?php
		// Page title | Site name | Site description
		wp_title( '|', true, 'right' );
		bloginfo( 'name' );
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			echo " | $site_description";
		}
		?>
	</title>
	<meta name="description" content="<?php bloginfo( 'description', 'display' ); ?>">

	<!-- // Configuration meta -->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Accept-CH" content="DPR,Width,Viewport-Width">

	<!-- // Application title - iOS / macOS -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-title" content="<?php bloginfo( 'name' ); ?>">

	<!-- // Facebook Meta -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="<?php echo site_url(); ?>">
	<meta property="og:title" content="<?php bloginfo( 'name' ); ?>">
	<meta property="og:locale" content="<?php bloginfo( 'name' ); ?>">
	<meta property="og:description" content="<?php echo $site_description; ?>">
	<meta property="og:image" content="<?php bloginfo( 'template_url' ); ?>/social.jpg">
	<meta property="og:image:alt" content="<?php echo $site_description; ?>">

	<!-- // Twitter Meta -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="<?php bloginfo( 'name' ); ?>">
	<meta name="twitter:description" content="<?php echo $site_description; ?>">
	<meta name="twitter:image" content="<?php bloginfo( 'template_url' ); ?>/social.jpg">
	<meta name="twitter:image:alt" content="<?php echo $site_description; ?>">

	<!-- // Favicon -->
	<link rel="icon" href="<?php bloginfo( 'template_url' ); ?>/favicon.ico">
	<!-- Apple Pin Icon -->
	<link rel="mask-icon" href="<?php bloginfo( 'template_url' ); ?>/pin_icon.svg" color="#000000">
	<!-- Apple Touch Icon -->
	<link rel="apple-touch-icon" href="<?php bloginfo( 'template_url' ); ?>/touch-icon.png">
	<!-- Apple Startup Image -->
	<link rel="apple-touch-startup-image" href="<?php bloginfo( 'template_url' ); ?>/touch-startup-image.png">

	<!-- // Manifest file - Android -->
	<link rel="manifest" href="<?php bloginfo( 'template_url' ); ?>/site.webmanifest">
	<!-- // Manifest file - Windows -->
	<link rel="msapplication-config" href="<?php bloginfo( 'template_url' ); ?>/browserconfig.xml">

	<!-- // Humans file -->
	<link type="text/plain" rel="author" href="<?php bloginfo( 'template_url' ); ?>/humans.txt">

	<!-- Header Scripts -->
	<?php wp_head(); ?>
	<!-- End Header Scripts -->

	<!-- !Google Analytics -->
	<?php the_field( 'google_analytics', 'options' ); ?>
	<!-- End Google Analytics -->
</head>
<body class="home <?php body_class(); ?>" data-component="browser-update">
	<?php NWP_Images::inject_sprite(); ?>
	<?php NWP_Admin::edit_admin_link(); ?>
	<header class="header js-header is-visible">
		<div class="container js-header-inside">
			<!-- Header Logo -->
			<div class="header__logo logo">
			<a href="<?php echo site_url(); ?>" class="logo__anchor">
				<img class="logo__image js-logo" src="<?php bloginfo( 'template_directory' ); ?>/images/placeholder.svg" alt="Logo of <?php bloginfo( 'name' ); ?>">
			</a>
			</div>
			<!-- /Header Logo -->

			<!-- Header Navigation -->
			<div class="header__nav">
			<ul class="nav__items">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary-right',
						'container'      => false,
						'items_wrap'     => '%3$s',
						'walker'         => new NWP_Main_Menu_Walker,
						'block'          => 'nav',
					)
				);
				?>
			</ul>
			<?php NWP_Admin::edit_menu_link( 'primary-right' ); ?>
			</div>
			<!-- /Header Navigation -->
		</div><!-- .container -->
	</header>
	<main class="main">
