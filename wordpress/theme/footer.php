<?php
//
// Name: Footer Template
// Author: Graffino (http://www.graffino.com)
//
?>
	</main>
	<footer class="section footer">
		<div class="container">
			<div class="footer__copyright">
				<span class="text -size-fine">
					&copy; <?php echo gmdate( 'Y' ); ?>
				</span>
			</div>
		</div><!-- .container -->
	</footer>
	<?php wp_footer(); ?>

	<?php
	global $registry;
	$utilities = $registry->get( 'NWP_utilities' );
	if ( $utilities->is_debug() ) :
		?>
		<?php echo '<!-- Template name: ' . basename( get_page_template() ) . ' -->'; ?>
	<?php endif; ?>
	</body>
</html>
