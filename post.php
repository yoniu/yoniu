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
		<div class="article-info">
			<div class="article-author"><a href="<?php $this->author->permalink(); ?>"><?php $this->author(); ?></a></div>
			<div class="article-others">发布于</div>
			<div class="article-time"><?php $this->date(); ?></div>
			<div class="article-sort">分类：<?php $this->category(','); ?></a></div>
		</div>
		<div class="article-contents">
			<?php $this->content(); ?>
		</div>
		<?php if($this->tags): ?>
		<div class="article-tags">
		<?php 
		$tag_arr=$this->tags;
		foreach ($tag_arr as $i => $value) {
		?>
			<a id="a-tags" href="<?php echo $tag_arr[$i]['permalink']; ?>"><?php echo $tag_arr[$i]['name']; ?></a>
		<?php
		}
		?>
		</div>
		<?php endif; ?>
	</div>
	<div class="nextlog">
	<nav>
		<ul class="pager">
			<li class="previous"><?php $this->theNext('%s','<a href="#">没有了</a>'); ?></li>
			<li class="next"><?php $this->thePrev('%s','<a href="#">没有了</a>'); ?></li>
		</ul>
	</nav>
	</div>
	<?php $this->need('comments.php'); ?>
</div><!--end #contentleft-->

<?php $this->need('sidebar.php'); ?>
<?php $this->need('footer.php'); ?>
