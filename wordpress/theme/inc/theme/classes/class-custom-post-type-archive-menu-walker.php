<?php
// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Custom post type archive menu walker
 */
class Custom_Post_Type_Archive_Menu_Walker {
	public static function init() {
		// Set-up Action and Filter Hooks
		add_action( 'admin_head-nav-menus.php', array( __CLASS__, 'inject_cpt_archives_menu_meta_box' ) );
		add_filter( 'wp_get_nav_menu_items', array( __CLASS__, 'cpt_archive_menu_filter' ), 10, 3 );
	}

	// Inject cpt archives meta box
	public static function inject_cpt_archives_menu_meta_box() {
		add_meta_box( 'add-cpt', __( 'Custom Posts Archives', 'default' ), array( __CLASS__, 'wp_nav_menu_cpt_archives_meta_box' ), 'nav-menus', 'side', 'default' );
	}

	// Render custom post type archives meta box
	public static function wp_nav_menu_cpt_archives_meta_box() {
		global $nav_menu_selected_id;
		// Get custom post types with archive support
		$post_types = get_post_types( array(
			'show_in_nav_menus' => true,
			'has_archive'       => true,
		), 'object' );
		// Hydrate the necessary object properties for the walker
		foreach ( $post_types as &$post_type ) {
			$post_type->classes          = array();
			$post_type->type             = $post_type->name;
			$post_type->object_id        = $post_type->name;
			$post_type->title            = $post_type->labels->name . ' ' . __( 'Archive', 'default' );
			$post_type->object           = 'cpt-archive';
			$post_type->menu_item_parent = 0;
			$post_type->url              = 0;
			$post_type->target           = 0;
			$post_type->attr_title       = 0;
			$post_type->xfn              = 0;
			$post_type->db_id            = 0;
		}
		$walker = new Main_Menu_Walker( array() );
		?>
		<div id="cpt-archive" class="posttypediv">
			<div id="tabs-panel-cpt-archive" class="tabs-panel tabs-panel-active">
				<ul id="ctp-archive-checklist" class="categorychecklist form-no-clear">
					<?php echo walk_nav_menu_tree( array_map( 'wp_setup_nav_menu_item', $post_types ), 0, (object) array( 'walker' => $walker ) ); ?>
				</ul>
			</div><!-- /.tabs-panel -->
		</div>
		<p class="button-controls">
			<span class="add-to-menu">
				<input type="submit"<?php disabled( $nav_menu_selected_id, 0 ); ?> class="button-secondary submit-add-to-menu" value="<?php esc_attr_e( 'Add to Menu' ); ?>" name="add-ctp-archive-menu-item" id="submit-cpt-archive">
			</span>
		</p>
		<?php
	}
	// Take care of the urls
	public static function cpt_archive_menu_filter( $items, $menu, $args ) {
		// Alter the URL for cpt-archive objects
		foreach ( $items as &$item ) {
			if ( 'cpt-archive' != $item->object ) {
				continue;
			}

			$item->url = get_post_type_archive_link( $item->type );

			// Set current
			if ( get_query_var( 'post_type' ) == $item->type ) {
				$item->classes[] = 'current-item';
				$item->current   = true;
			}
		}
		return $items;
	}
}
