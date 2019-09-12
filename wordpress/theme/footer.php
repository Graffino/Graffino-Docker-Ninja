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
					&copy; <?php echo date( 'Y' ); ?>
				</span>
			</div>
		</div><!-- .container -->
	</footer>
	<!-- Javascript -->
	<script src="<?php bloginfo( 'template_directory' ); ?>/js/<?php asset_output( 'main', 'js' ); ?>" async></script>
	<!-- /Javascript -->

	<?php wp_footer(); ?>

	<?php if ( is_debug() ) : ?>
	<!-- Development Hot Reload -->
	<script id="__bs_script__">//<![CDATA[
		document.write("<script async src='//HOST:8888/browser-sync/browser-sync-client.js?v=2.18.8'><\/script>".replace("HOST", location.hostname));
	</script>
	<!-- /Development Hot Reload -->
		<?php echo '<!-- ' . basename( get_page_template() ) . ' -->'; ?>
	<?php endif; ?>
	</body>
</html>
