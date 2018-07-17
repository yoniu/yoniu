<?php
/*
Design by 小智（https://www.yoniu.xyz）
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
?>
<div class="col-sm-4 blog-sidebar hidden-xs">
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowRecentSearch', $this->options->sidebarBlock)): ?>
	<li>
	<h3><span><?php _e('搜索'); ?></span></h3>
	<ul id="record">
	<form class="search-form" method="get" role="search">
		<input id="keyword" class="form-control search" type="text"  name="s" placeholder="Search" required=""/>
		<input class="btn" type="submit" value="搜索">
	</form>
	</ul>
	</li>
    <?php endif; ?>
	
    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowRecentPosts', $this->options->sidebarBlock)): ?>
	<li>
	<h3><span><?php _e('最新文章'); ?></span></h3>
	<ul id="newcomment">
	<?php $this->widget('Widget_Contents_Post_Recent','pageSize=5')->to($newcontents); ?>
	<?php
	$mht=0;
	while($newcontents->next()):
	$mht=$mht+1;
	$content_img = GetThumFromContent($newcontents);
	$content = extractHtmlData($newcontents->content,35);
?>
		<div class="media" id="<?php if($mht==1) echo 'first'; ?>">
			<?php if($content_img) { ?>
			<div class="media-left">
				<a href="<?php $newcontents->permalink();?>" title="<?php echo $newcontents->title;?>" /><img src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== data-src="<?php echo $content_img; ?>" class="b-lazy" width="100px" height="80px" alt="blogger" /></a>
			</div>
			<?php } ?>
			<div class="media-body">
				<h4 class="media-heading"><a href="<?php $newcontents->permalink();?>" title="<?php echo $newcontents->title;?>" /><?php echo $newcontents->title;?></a></h4>
				<?php echo $content;?>
			</div>
		</div>
	<?php endwhile; ?>
	</ul>
	</li>
    <?php endif; ?>

    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowRecentComments', $this->options->sidebarBlock)): ?>
	<li>
	<h3><span><?php _e('最近回复'); ?></span></h3>
	<ul id="newcomment">
	<?php $this->widget('Widget_Comments_Recent')->to($comments); ?>
	<?php
	$mht=0;
	while($comments->next()):
	$mht=$mht+1;
	?>
	<div class="media" id="<?php if($mht==1) echo 'first'; ?>">
		<div class="media-left media-middle">
			<?php $comments->gravatar(48); ?>
		</div>
		<div class="media-body">
			<h5 class="media-heading"><?php $comments->author(false); ?></h5>
			<a href="<?php $comments->permalink(); ?>"><?php $comments->excerpt(35, '...'); ?></a>
		</div>
	</div>
	<?php endwhile; ?>
	</ul>
	</li>
    <?php endif; ?>

    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowCategory', $this->options->sidebarBlock)): ?>
	<li>
	<h3><span><?php _e('分类'); ?></span></h3>
	<div id="sort" class="row">
	<?php $this->widget('Widget_Metas_Category_List')->to($category); ?>
	<?php while ($category->next()): ?>
	<div class="col-md-6">
	<a href="<?php $category->permalink(); ?>"><?php $category->name(); ?></a>
	</div>
	<?php endwhile; ?>
	</div>
	</li>
    <?php endif; ?>

    <?php if (!empty($this->options->sidebarBlock) && in_array('ShowArchive', $this->options->sidebarBlock)): ?>
	<li>
	<h3><span><?php _e('归档'); ?></span></h3>
	<ul id="record" class="row">
	<?php $this->widget('Widget_Contents_Post_Date', 'type=month&format=F Y')
	->parse('<li class="col-md-6"><a href="{permalink}">{date}</a></li>'); ?>
	</ul>
	</li>
    <?php endif; ?>

</div><!-- end #sidebar -->
