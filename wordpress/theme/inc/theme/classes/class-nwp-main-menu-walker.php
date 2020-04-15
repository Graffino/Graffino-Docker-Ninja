<?php
// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main menu walker
 */
class NWP_Main_Menu_Walker extends Walker_Nav_Menu {
	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		$block   = isset( $args->block ) ? $args->block : explode( ' ', $args->menu_class );
		$block   = is_array( $block ) ? $block[0] : $block;
		$indent  = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class= \"submenu\">\n";
	}

	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		$indent  = str_repeat( "\t", $depth );
		$output .= "$indent</ul>\n";
	}

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		if ( is_object( $args ) ) {
			$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
			$this->prepare_el_classes( $item, $args, $depth );
			$classes = empty( $item->classes ) ? array() : (array) $item->classes;

			// Filter Classes
			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
			$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

			$output .= $indent . '<li' . $class_names . '>';

			// Filter Attributes
			$atts           = array();
			$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
			$atts['target'] = ! empty( $item->target ) ? $item->target : '';
			$atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
			$atts['href']   = ! empty( $item->url ) ? $item->url : '';

			$atts       = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );
			$attributes = '';
			foreach ( $atts as $attr => $value ) {
				if ( ! empty( $value ) ) {
					$value       = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
					$attributes .= ' ' . $attr . '="' . $value . '"';
				}
			}
			$item_output  = $args->before;
			$item_output .= '<a' . $attributes . ' class="nav__link" rel="prefetch">';
			$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
			$item_output .= '</a>';
			$item_output .= $args->after;

			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}

	public function end_el( &$output, $item, $depth = 0, $args = array() ) {
		$output .= "</li>\n";
	}

	public function prepare_el_classes( &$item, $args = array(), $depth = 0 ) {
		$block   = isset( $args->block ) ? $args->block : explode( ' ', $args->menu_class );
		$block   = is_array( $block ) ? $block[0] : $block;
		$classes = array( $block . '__item' );

		if ( $item->current ) {
			$classes[] = 'is-current';
		}

		if ( $item->current_item_ancestor ) {
			$classes[] = 'is-current-ancestor';
		}

		if ( $item->current_item_parent ) {
			$classes[] = 'is-current-parent';
		}

		if ( in_array( 'current-item', (array) $item->classes ) ) {
			$classes[] = 'is-current';
		}

		if ( in_array( 'menu-item-has-children', (array) $item->classes ) ) {
			$classes[] = 'is-parent';
		}

		if ( in_array( 'menu', (array) $item->classes ) ) {
			$classes[] = $block . 'submenu';
		}

		if ( $depth ) {
			$classes[] = 'is-child';
		}

		$item->classes = $classes;
	}
}
