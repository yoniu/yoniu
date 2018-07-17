<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
?>
<?php $this->need('header.php'); ?>

<div class="row">
<div class="col-sm-8 blog-main">
	<ol class="breadcrumb">
	<?php if($this->is('index')):?><!-- 页面首页时 -->
	<li><a href="<?php $this->options->siteUrl(); ?>" title="<?php $this->options->title(); ?>">首页</a></li>
	<?php elseif ($this->is('post')): ?><!-- 页面为文章单页时 -->
		<li><a href="<?php $this->options->siteUrl(); ?>" title="<?php $this->options->title(); ?>">首页</a></li><li><?php $this->category(); ?><li><?php $this->title(); ?></li>
	<?php else: ?><!-- 页面为其他页时 -->
		<li><a href="<?php $this->options->siteUrl(); ?>" title="<?php $this->options->title(); ?>">首页</a></li><li><?php $this->archiveTitle(' &raquo; ','',''); ?></li>
	<?php endif; ?>
	</ol>
	<div class="article-page">
		<div class="article-title"><?php $this->title() ?></div>
		<div class="article-contents">
			<?php $this->content(); ?>
		</div>
	</div>
	<?php $this->need('comments.php'); ?>
</div><!--end #contentleft-->

<?php $this->need('sidebar.php'); ?>
<?php $this->need('footer.php'); ?>
