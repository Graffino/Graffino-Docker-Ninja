<?php

/**
 * Pagination
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_Pagination {
	public function __construct() {
	}

	public function custom_pagination( $numpages = '', $pagerange = '', $paged = '' ) {

		if ( empty( $pagerange ) ) {
			$pagerange = 2;
		}
		global $paged;
		if ( empty( $paged ) ) {
			$paged = 1;
		}
		if ( '' === $numpages ) {
			global $wp_query;
			$numpages = $wp_query->max_num_pages;
			if ( ! $numpages ) {
				$numpages = 1;
			}
		}

		$pagination_args = array(
			'base'         => get_pagenum_link( 1 ) . '%_%',
			'format'       => 'page/%#%',
			'total'        => $numpages,
			'current'      => $paged,
			'show_all'     => false,
			'end_size'     => 1,
			'mid_size'     => $pagerange,
			'prev_next'    => false,
			'prev_text'    => __( '«' ),
			'next_text'    => __( '»' ),
			'type'         => 'array',
			'add_args'     => false,
			'add_fragment' => '',
		);

		$paginate_links = paginate_links( $pagination_args );

		if ( is_array( $paginate_links ) ) {
			echo '<nav class="pagination">';
			echo '<ul class="pagination__list list">';
			foreach ( $paginate_links as $page ) {
				echo "<li class='pagination__item'>$page</li>";
			}
			echo '</ul>';
			echo '</nav>';
		}
	}
}
