<?php

/**
 * ACF class
 *
 */

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class NWP_ACF {
	public function __construct() {
		$this->register_default_acf_fields();
	}

	/**
	 * Use shortcode inside ACF text area
	 *
	 * @param [type] $value
	 * @param [type] $post_id
	 * @param [type] $field
	 * @return void
	 */
	public function text_field_shortcode( $value, $post_id, $field ) {
		if ( is_admin() ) {
			return $value;
		}

		return do_shortcode( $value );
	}

	/**
	 * Register default fields
	 *
	 * @return void
	 */
	public function register_default_acf_fields() {
		if ( function_exists( 'acf_add_local_field_group' ) ) :
			acf_add_local_field_group(
				array(
					'key'                   => 'group_55a3c89e46591',
					'title'                 => '[Options] Admin Settings',
					'fields'                => array(
						array(
							'key'               => 'field_55a3c8a4b9438',
							'label'             => 'Simple Admin',
							'name'              => 'simple_admin',
							'type'              => 'true_false',
							'instructions'      => 'The interface will be stripped down to a minimum when this option is enabled.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_55a3c8d2b9439',
							'label'             => 'Simple Plugins',
							'name'              => 'simple_plugins',
							'type'              => 'true_false',
							'instructions'      => 'Plugins section will be hidden if this option is enabled regardless of the Simple Admin setting.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_55a3c93cb943a',
							'label'             => 'Simple Updates',
							'name'              => 'simple_updates',
							'type'              => 'true_false',
							'instructions'      => 'Updates section will be hidden and updates will be disabled if this option is enabled regardless of the Simple Admin setting.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_55a3c95ab943b',
							'label'             => 'Simple Settings',
							'name'              => 'simple_settings',
							'type'              => 'true_false',
							'instructions'      => 'Settings section will be hidden if this option is enabled regardless of the Simple Admin setting.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_55a3c96eb943c',
							'label'             => 'Simple ACF',
							'name'              => 'simple_acf',
							'type'              => 'true_false',
							'instructions'      => 'ACF settings section will be hidden if this option is enabled regardless of the Simple Admin setting.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_55a3c98bb943d',
							'label'             => 'Simple Lockdown',
							'name'              => 'simple_lockdown',
							'type'              => 'true_false',
							'instructions'      => 'The site will be visible only to admins when this option is enabled.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 1,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
					),
					'location'              => array(
						array(
							array(
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'acf-options-admin-settings',
							),
						),
					),
					'menu_order'            => 10,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
				)
			);

			acf_add_local_field_group(
				array(
					'key'                   => 'group_55a3cd4ba77b1',
					'title'                 => '[Options] Widget - Support',
					'fields'                => array(
						array(
							'key'               => 'field_55a3cd87aa206',
							'label'             => 'Dashboard Title',
							'name'              => 'dashboard_title',
							'type'              => 'text',
							'instructions'      => 'Support dashboard title.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
							'maxlength'         => '',
							'readonly'          => 0,
							'disabled'          => 0,
						),
						array(
							'key'               => 'field_55a3cdadaa207',
							'label'             => 'Dashboard Content',
							'name'              => 'dashboard_content',
							'type'              => 'wysiwyg',
							'instructions'      => 'Support dashboard content.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'tabs'              => 'visual',
							'toolbar'           => 'basic',
							'media_upload'      => 1,
							'delay'             => 0,
						),
					),
					'location'              => array(
						array(
							array(
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'acf-options-admin-settings',
							),
						),
					),
					'menu_order'            => 11,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
				)
			);

			acf_add_local_field_group(
				array(
					'key'                   => 'group_5e4d0c93db430',
					'title'                 => '[Options] Social & contact',
					'fields'                => array(
						array(
							'key'               => 'field_5e4d0ca57c8c0',
							'label'             => 'Mail',
							'name'              => 'mail',
							'type'              => 'text',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
							'maxlength'         => '',
						),
						array(
							'key'               => 'field_5e4d0cad7c8c1',
							'label'             => 'Phone Number',
							'name'              => 'phone_number',
							'type'              => 'text',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
							'maxlength'         => '',
						),
						array(
							'key'               => 'field_5e71fe27b9b2c',
							'label'             => 'Name',
							'name'              => 'name',
							'type'              => 'text',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
							'maxlength'         => '',
						),
					),
					'location'              => array(
						array(
							array(
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'acf-options-social-contact',
							),
						),
					),
					'menu_order'            => 0,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
				)
			);

			acf_add_local_field_group(
				array(
					'key'                   => 'group_5f153d3b8a8d4',
					'title'                 => '[Options] Page Links',
					'fields'                => array(
						array(
							'key'               => 'field_5f153d4076d9d',
							'label'             => 'Posts Page',
							'name'              => 'posts_page',
							'type'              => 'post_object',
							'instructions'      => 'Link to the posts page.',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'post_type'         => array(
								0 => 'page',
							),
							'taxonomy'          => '',
							'allow_null'        => 0,
							'multiple'          => 0,
							'return_format'     => 'id',
							'ui'                => 1,
						),
					),
					'location'              => array(
						array(
							array(
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'acf-options-page-links',
							),
						),
					),
					'menu_order'            => 0,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
				)
			);

			acf_add_local_field_group(
				array(
					'key'                   => 'group_5e591df8698ea',
					'title'                 => '[Options] API Settings',
					'fields'                => array(
						array(
							'key'               => 'field_5e591e04b8c3b',
							'label'             => 'MailChimp',
							'name'              => 'mailchimp',
							'type'              => 'repeater',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'collapsed'         => '',
							'min'               => 0,
							'max'               => 0,
							'layout'            => 'table',
							'button_label'      => '',
							'sub_fields'        => array(
								array(
									'key'               => 'field_5e591e36b8c3c',
									'label'             => 'Api Key',
									'name'              => 'api_key',
									'type'              => 'text',
									'instructions'      => '',
									'required'          => 0,
									'conditional_logic' => 0,
									'wrapper'           => array(
										'width' => '',
										'class' => '',
										'id'    => '',
									),
									'default_value'     => '',
									'placeholder'       => '',
									'prepend'           => '',
									'append'            => '',
									'maxlength'         => '',
								),
								array(
									'key'               => 'field_5e591e43b8c3d',
									'label'             => 'List Id',
									'name'              => 'list_id',
									'type'              => 'text',
									'instructions'      => '',
									'required'          => 0,
									'conditional_logic' => 0,
									'wrapper'           => array(
										'width' => '',
										'class' => '',
										'id'    => '',
									),
									'default_value'     => '',
									'placeholder'       => '',
									'prepend'           => '',
									'append'            => '',
									'maxlength'         => '',
								),
							),
						),
						array(
							'key'               => 'field_55a3c9f1eecdb',
							'label'             => 'Google Analytics',
							'name'              => 'google_analytics',
							'type'              => 'textarea',
							'instructions'      => 'Enter the GA snipped here.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => '',
							'maxlength'         => '',
							'rows'              => 5,
							'new_lines'         => '',
							'readonly'          => 0,
							'disabled'          => 0,
						),
						array(
							'key'               => 'field_5ef9b462c99f2',
							'label'             => 'Hotjar Script',
							'name'              => 'hotjar',
							'type'              => 'textarea',
							'instructions'      => 'Scripts related to Hotjar.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => '',
							'maxlength'         => '',
							'rows'              => '',
							'new_lines'         => '',
						),
						array(
							'key'               => 'field_5ef9efdb97270',
							'label'             => 'Hotjar Enable/Disable',
							'name'              => 'hotjar_state',
							'type'              => 'true_false',
							'instructions'      => 'Check if you want to enable Hotjar.',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => '',
							'default_value'     => 0,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
					),
					'location'              => array(
						array(
							array(
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'acf-options-api-settings',
							),
						),
					),
					'menu_order'            => 0,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
				)
			);

			endif;
	}

	/**
	 * Init gutenberg field
	 *
	 * @return void
	 */
	public function init_gutenberg_field() {
		if ( function_exists( 'acf_register_block' ) ) {
			acf_register_block(
				array(
					'name'            => 'expand',
					'title'           => __( 'Expand' ),
					'description'     => __( 'A custom expand block' ),
					'render_callback' => array( $this, 'acf_gutenberg_block_render_callback' ),
					'category'        => 'custom-blocks',
					'icon'            => 'media-text',
					'keywords'        => array( 'expand' ),
				)
			);
		}
	}

	/**
	 * Render callback
	 *
	 * @param [type] $block
	 * @return void
	 */
	public function acf_gutenberg_block_render_callback( $block ) {
		// Convert name ("acf/name") into path friendly slug ("name")
		$slug = str_replace( 'acf/', '', $block['name'] );
		if ( file_exists( get_theme_file_path( "/blocks/content-{$slug}.php" ) ) ) {
			include( get_theme_file_path( "/blocks/content-{$slug}.php" ) );
		}
	}

	/**
	 * Categories
	 *
	 * @param [type] $categories
	 * @param [type] $post
	 * @return void
	 */
	function init_gutenberg_categories( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'custom-blocks',
					'title' => __( 'Custom Blocks', 'custom-blocks' ),
				),
			),
			$categories
		);
	}
}
