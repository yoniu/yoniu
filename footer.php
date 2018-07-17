<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
?>
			</div><!--end #content-->
		</div><!--end #wrap-->
	</div><!--end #container-->
		<div id="footerbar">
			<div class="footerbar container">
				©&nbsp;2018&nbsp;&nbsp;<a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a>
				&nbsp;·&nbsp;<?php _e('由 <a href="http://www.typecho.org">Typecho</a> 强力驱动'); ?>
				</br><?php $this->footer(); ?>
				&nbsp;&nbsp;Design by <a href="https://blog.200011.net" target="_blank" rel="nofollow">往记</a><!-- 版权已经添加nofollow不会影响seo，尊重设计者请保留 -->
			</div><!--end #footerbar-->
		</div><!--end #footerbar-->
		<p id="back-to-top"><a href="javascript:;"><span class="glyphicon glyphicon-circle-arrow-up"></span></a></p>
	</body>
	<script>themeurl="<?php $this->options ->themeUrl(); ?>";</script>
	<script src="<?php $this->options->themeUrl('js/loader.js'); ?>"></script>
</html>