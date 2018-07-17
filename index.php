<?php
/**
 * 这是 Yoniu 主题的typecho版本，支持文章无限加载，顶部图片、背景图片支持自定义设置（请到前台的模板设置修改）
 * 
 * @package Yoniu
 * @author 小智
 * @version 1.2
 * @link https://www.yoniu.xyz
 */

if (!defined('__TYPECHO_ROOT_DIR__')) exit;
 $this->need('header.php');
 ?>

<div class="row">
<div class="col-sm-8 blog-main">
<ol class="breadcrumb">
	<?php if($this->is('index')):?><!-- 页面首页时 -->
	<li><a href="<?php $this->options->siteUrl(); ?>" title="<?php $this->options->title(); ?>">首页</a></li>
	<?php elseif ($this->is('post')): ?><!-- 页面为文章单页时 -->
		<li><a href="<?php $this->options->siteUrl(); ?>" title="<?php $this->options->title(); ?>">首页</a></li><li><?php $this->category(); ?><li><?php $this->title(); ?></li>
	<?php else: ?><!-- 页面为其他页时230 -->
		<li><a href="<?php $this->options->siteUrl(); ?>" title="<?php $this->options->title(); ?>">首页</a></li><li><?php $this->archiveTitle(' &raquo; ','',''); ?></li>
	<?php endif; ?>
</ol>
<div id="blog-200011-net">
<?php if ($this->have()): ?>
<?php
while($this->next()):
$content_img = GetThumFromContent($this);
 ?>
	<div class="list-article">
		<?php if($content_img):?>
			<a href="<?php $this->permalink() ?>">
				<div class="article-imgA">
					<img src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== data-src="<?php echo $content_img; ?>" class="img-responsive article-img b-lazy">
				</div>
			</a>
			<div style="clear:both;"></div>
		<?php endif; ?>
		<div class="article-content">
			<div class="article-title"><a href="<?php $this->permalink() ?>"><?php $this->title() ?></a></div>
			<div class="article-info">
				<div class="article-author"><a href="<?php $this->author->permalink(); ?>"><?php $this->author(); ?></a></div>
				<div class="article-others">发布于</div>
				<div class="article-time"><?php $this->date(); ?></div>
			</div>
			<div class="article-contents">
				<?php echo extractHtmlData($this->content,100); ?>
			</div>
		</div>
	</div>
<?php endwhile; ?>
<?php else: ?>
	<div class="list-article">
		<div class="article-content">
			<div class="article-title"><a href="#"><?php _e('没有找到内容'); ?></a></div>
			<div class="article-contents">
				抱歉，没有符合您查询条件的结果。
			</div>
		</div>
	</div>
<?php endif; ?>
</div>
<div id="pagenavi" class="pagenavi">
<?php $this->pageLink('加载更多','next'); ?>
</div>
<div class="bouncing-loader"><div></div><div></div><div></div></div>
</div><!-- end #contentleft-->
<?php $this->need('sidebar.php'); ?>
<?php $this->need('footer.php'); ?>
