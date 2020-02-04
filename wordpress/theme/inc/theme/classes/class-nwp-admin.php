<?php

/**
 * Admin class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Admin {
	public function __construct() {
	}

	// Load custom admin styles & scripts
	public function admin_load() {
		wp_enqueue_style( 'customAdminStyle', get_bloginfo( 'template_url' ) . '/inc/admin/login.css' );
	}

	// Insert into admin header
	public function insert_into_admin_header() {
		$url  = get_bloginfo( 'template_directory' );
		$name = get_bloginfo( 'name' );

		$meta = '
		<link rel="shortcut icon" href="' . $url . '/images/favicon.ico">';
		echo $meta;
	}

	// Insert into admin footer
	public function insert_into_admin_footer() {
		//
	}

	// Add custom style for login page
	public function custom_login_style() {
		echo '<link rel="stylesheet" href="' . get_bloginfo( 'template_url' ) . '/inc/admin/login.css' . '">';
	}

	// Add custom syle for edit button
	public function custom_edit_style() {
		if ( is_user_logged_in() ) {
			echo '<link rel="stylesheet" href="' . get_bloginfo( 'template_url' ) . '/inc/admin/buttons.css' . '">';
		}
	}

	// Change Login Header URL
	public function custom_login_url() {
		return site_url();
	}

	// De-register print styles
	public function my_deregister_styles() {
		wp_deregister_style( 'wp-admin' );
	}

	// Post Admin Links
	public function edit_content_link( $id = null ) {
		global $post;
		if ( current_user_can( 'level_10' ) ) {

			if ( ! empty( $id ) ) {
				$link = get_edit_post_link( $id );
			} else {
				$link = get_edit_post_link( $post->ID );
			}

			echo '<div class="nwp-admin"><div class="nwp-admin__icon -edit"><a href="' . $link . '"></a></div></div>';
		}
	}

	// Category Admin Links
	public function edit_taxonomy_category_link( $id = null ) {
		$taxonomy_id = get_queried_object()->term_id;

		if ( current_user_can( 'level_10' ) ) {

			if ( ! empty( $id ) ) {
				$link = get_edit_tag_link( $id, 'category' );
			} else {
				$link = get_edit_tag_link( $taxonomy_id, 'category' );
			}

			echo '<div class="nwp-admin__icon"><div class="nwp-admin__icon -edit"><a href="' . $link . '"></a></div></div>';
		}
	}

	// Tag Admin Links
	public function edit_taxonomy_tag_link( $id = null ) {
		$taxonomy_id = get_queried_object()->term_id;

		if ( current_user_can( 'level_10' ) ) {

			if ( ! empty( $id ) ) {
				$link = get_edit_tag_link( $id, 'post_tag' );
			} else {
				$link = get_edit_tag_link( $taxonomy_id, 'post_tag' );
			}

			echo '<div class="nwp-admin"><div class="nwp-admin__icon -edit"><a href="' . $link . '"></a></div></div>';
		}
	}

	// Menu Admin Links
	public function edit_menu_link( $theme_location = 'nav-main', $echo = true ) {
		global $registry;
		$menus = $registry->get( 'NWP_Menus' );
		$id    = $menus->get_menu_id( $theme_location );

		if ( current_user_can( 'level_10' ) ) {
			$link = '<div class="nwp-admin is-menu"><div class="nwp-admin__icon -menu"><a class="post-edit-link" href="' . site_url() . '/wp-admin/nav-menus.php?action=edit&menu=' . $id . '" title="Edit Menu"></a></div></div>';
		} else {
			$link = null;
		}
		if ( $echo ) {
			echo $link;
		} else {
			return $link;
		}
	}

	// Admin edit links
	public function edit_admin_link( $echo = true ) {
		if ( current_user_can( 'level_10' ) ) {
			$link = '<div class="nwp-admin is-admin"><div class="nwp-admin__icon -admin-panel"><a class="post-edit-link" href="' . site_url() . '/wp-admin/" title="Edit Admin"></a></div></div>';
		} else {
			$link = null;
		}
		if ( $echo ) {
			echo $link;
		} else {
			return $link;
		}
	}

	// Admin option edit links
	public function edit_option_link( $slug, $echo = true ) {
		if ( current_user_can( 'level_10' ) ) {
			$link = '<div class="nwp-admin is-option"><div class="nwp-admin__icon -edit"><a class="post-edit-link" href="' . site_url() . '/wp-admin/admin.php?page=' . $slug . '" title="Edit Admin"></a></div></div>';
		} else {
			$link = null;
		}
		if ( $echo ) {
			echo $link;
		} else {
			return $link;
		}
	}
}
